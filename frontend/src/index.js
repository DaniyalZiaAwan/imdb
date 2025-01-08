import { React } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import App from "./app";
import store from './redux/store'; // Import the store
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
