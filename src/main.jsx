import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Load Google Client ID from environment variables (secure method)
const GOOGLE_CLIENT_ID = "364706830328-nvs9o91ohp7h9trn9a60rtijbihnaioj.apps.googleusercontent.com";

if (!GOOGLE_CLIENT_ID) {
  console.warn("⚠️ Missing GOOGLE_CLIENT_ID! Google OAuth may not work.");
}

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
);
