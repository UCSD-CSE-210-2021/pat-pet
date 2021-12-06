package ws

import (
	"bytes"
	"github.com/cse210/petbackend/dao"
)

type Hub struct {
	// Registered clients.
	clients map[string]*Client

	// Inbound messages from the clients.
	message chan []byte

	// Register requests from clients
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

var messageHub *Hub

func InitHub() {
	messageHub = &Hub{
		message:    make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[string]*Client),
	}
	go messageHub.run()
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client.userId] = client
		case client := <-h.unregister:
			if _, ok := h.clients[client.userId]; ok {
				h.clients[client.userId] = nil
				close(client.send)
			}
		case message := <-h.message:
			// message format: senderId receiverId content
			splits := bytes.SplitN(message, space, 3)
			senderId := string(splits[0])
			receiverId := string(splits[1])
			content := string(splits[2])
			delivered := true

			if c, ok := h.clients[receiverId]; ok && c != nil {
				c.send <- message
			} else {
				// set delivered to be false if user is not active
				delivered = false
			}
			dao.InsertNewMessage(senderId, receiverId, content, delivered)
		}
	}
}
