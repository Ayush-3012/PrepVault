import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster
        toastOptions={{
          style: { background: "#333", color: "#fff" },
          success: { style: { background: "#166534" } },
          error: { style: { background: "#b91c1c" } },
        }}
      />
    </Provider>
  </BrowserRouter>
);
