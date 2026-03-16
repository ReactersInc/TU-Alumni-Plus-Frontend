import { Toaster as Sonner } from "@/components/Sonner";
import { TooltipProvider } from "@/components/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import About from "./components/About";
import LoginAdmin from "./components/LoginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./components/Settings";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Connect from "./pages/Connect";
import Login from "./pages/Login";
import AlumniFamily from "./pages/AlumniFamily";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import Transcript from "./pages/service/Transcript";

import Achievements from "./pages/giveback/Achievements";
import Mentor from "./pages/giveback/Mentor";
import Opportunities from "./pages/giveback/Opportunities";
import Payback from "./pages/giveback/Payback";

import Upcoming from "./pages/events/Upcoming";
import Past from "./pages/events/Past";

import ForgotPasswordAdmin from "./components/ForgotPasswordAdmin";

import { AuthProvider } from "./pages/context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>

      {/* Sonner Toast Notifications */}
      <Sonner
        position="top-right"
        richColors
        expand
        closeButton
        duration={3000}
      />

      <AuthProvider>
        <BrowserRouter>

          <Routes>

            {/* Public Routes */}

            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* User Dashboard */}

            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/settings" element={<Settings />} />

            {/* Admin */}

            <Route path="/about/login" element={<LoginAdmin />} />
            <Route path="/admin/forgot-password" element={<ForgotPasswordAdmin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Main Layout Routes */}

            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/alumni-family" element={<Layout><AlumniFamily /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />

            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />

            <Route path="/connect" element={<Layout><Connect /></Layout>} />

            {/* Services */}

            <Route path="/service/transcript" element={<Layout><Transcript /></Layout>} />

            {/* Giveback */}

            <Route path="/giveback/achievements" element={<Layout><Achievements /></Layout>} />
            <Route path="/giveback/mentor" element={<Layout><Mentor /></Layout>} />
            <Route path="/giveback/opportunities" element={<Layout><Opportunities /></Layout>} />
            <Route path="/giveback/payback" element={<Layout><Payback /></Layout>} />

            {/* Events */}

            <Route path="/events/upcoming" element={<Layout><Upcoming /></Layout>} />
            <Route path="/events/past" element={<Layout><Past /></Layout>} />

            {/* Catch All */}

            <Route path="*" element={<NotFound />} />

          </Routes>

        </BrowserRouter>
      </AuthProvider>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;