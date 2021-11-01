import React, { createContext, useContext, useState, useEffect } from "react";
const StoreContext = createContext([{}, () => {}]);

export function WithStore({ children }) {
  const [store, setStore] = useState({
    loading: true
  });

  const fetchRemoteConfig = async () => {
    setStore({
      ...store,
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
