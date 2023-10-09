import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { DarkModeProvider } from "./contexts/DarkModeContext";
import DefaultStyle from "./styles/DefaultStyle";

// ---- with splitting

import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Booking from "./pages/Booking";
import Account from "./pages/Account";
import ProtectedRoute from "./ui/ProtectedRoute";
import Checkin from "./pages/Checkin";

// ---- without splitting

// const AppLayout = lazy(() => import("./ui/AppLayout"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Cabins = lazy(() => import("./pages/Cabins"));
// const NewUsers = lazy(() => import("./pages/Users"));
// const Settings = lazy(() => import("./pages/Settings"));
// const Login = lazy(() => import("./pages/Login"));
// const PageNotFound = lazy(() => import("./pages/PageNotFound"));
// const Account = lazy(() => import("./pages/Account"));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: 0,
    },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <DefaultStyle />

        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<NewUsers />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            style: {
              backgroundColor: "var(--color-grey-50)",
              color: "var(--color-grey-700)",
            },

            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
