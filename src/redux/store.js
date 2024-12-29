import { createStore } from "redux";
import { rootReducer } from "./reducers";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("billsState");
    if (serializedState === null) {
      return undefined; 
    }
    return JSON.parse(serializedState); 
  } catch (err) {
    console.error("Could not load state from localStorage:", err);
    return undefined; 
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("billsState", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage:", err);
  }
};

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
