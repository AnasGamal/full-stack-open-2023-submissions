import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from "./contexts/NotificationContext";
import { UserProvider } from "./contexts/UserContext";
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
<QueryClientProvider client={queryClient}>
    <UserProvider>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </UserProvider>
</QueryClientProvider>
);
