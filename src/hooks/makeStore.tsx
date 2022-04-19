import { createContext, useContext, useReducer } from "react";

export default function makeStore<T, A = any>(
  reducer: (state: T, action: A) => T,
  initialState: T
) {
  const dispathContext = createContext<React.Dispatch<A> | null>(null);
  const storeContext = createContext<T | null>(null);

  const StoreProvider: React.FC<{}> = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
      <dispathContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
      </dispathContext.Provider>
    );
  };

  function useDispatch() {
    return useContext(dispathContext);
  }
  function useStore() {
    return useContext(storeContext);
  }

  return [StoreProvider, useStore, useDispatch];
}
