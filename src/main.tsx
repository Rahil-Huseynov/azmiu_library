import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Redux Provider
import { store } from "./redux/store"; // Store'u içe aktar
import { AuthProvider } from "./context/AuthContext";
import "./i18n/config.ts";
import App from "./App.tsx";
import { SidebarProvider } from "./context/SidebarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}> {/* Redux Provider ile store'u sarmalıyoruz */}
    <AuthProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </AuthProvider>
  </Provider>
);
