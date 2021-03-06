import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import chatReducer from "./src/store/reducers/chat.reducer";
import userReducer from "./src/store/reducers/user.reducer";
import Navigation from './components/Navigation';
import { QueryClient, QueryClientProvider } from "react-query";

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>


// Creating the redux store.
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Thunk: if you want to call async call actions without messing with redux
// redux dispatch is not asynchronous

const queryClient = new QueryClient()

export default function App(probs: any) {
  return (

    // Provider makes data accessible to the entire component tree / app

    // QueryProvider makes reactQuery data accessible to the entire component tree / app

    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <Navigation/>
      </QueryClientProvider>
    </Provider>
  );
}