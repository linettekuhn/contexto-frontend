import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<App />} />
              <Route path="/auth" element={<AuthPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </HashRouter>
  </StrictMode>,
);
