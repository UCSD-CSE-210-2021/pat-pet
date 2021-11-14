import React, { createContext, useContext, useState, useEffect } from "react";
import { sendPostRequest } from "../../utils/request";
const StoreContext = createContext([{}, () => {}]);

export function WithStore({ children }) {
  const [store, setStore] = useState({
    loading: true,
    userid: "",
    numusers: 0,
    curuser: 0,
  });

  const fetchRemoteConfig = async () => {
    const users = await sendPostRequest(`users`, {}, "init");

    setStore(curStore => ({
      ...curStore,
      users: users,
      username: users[curStore.curuser].name,
      userid: users[curStore.curuser].id,
      numusers: users.length,
      curuser: 0, // (curStore.curuser + 1) % curStore.numusers
      loading: false,
      isSidebarExtended: true
    }));
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
