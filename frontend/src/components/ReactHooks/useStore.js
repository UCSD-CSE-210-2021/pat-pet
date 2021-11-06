import React, { createContext, useContext, useState, useEffect } from "react";
import { sendPostRequest } from "../../utils/request";
const StoreContext = createContext([{}, () => {}]);

export function WithStore({ children }) {
  const [store, setStore] = useState({
    loading: true,
    userid: "",
  });

  const fetchRemoteConfig = async () => {
    const users = await sendPostRequest(`users`, {}, "init");
    const user = users[Math.floor(Math.random()*users.length)];
    setStore({
      ...store,
      username: user.name,
      userid: user.id,
      loading: false,
      isSidebarExtended: true
    });
  };

  useEffect(() => {
    fetchRemoteConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    !store.loading 
      && 
      <StoreContext.Provider value={[store, setStore]}>
        {children}
      </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
