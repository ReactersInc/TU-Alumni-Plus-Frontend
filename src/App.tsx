import { Toaster } from "@/components/Toaster";
import { Toaster as Sonner } from "@/components/Sonner";
import { TooltipProvider } from "@/components/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Connect from "./pages/Connect";
import Login from "./pages/Login";
import AlumniFamily from "./pages/AlumniFamily";
import Transcript from "./pages/service/Transcript";
import Achievements from "./pages/giveback/Achievements";
import Upcoming from "./pages/events/Upcoming";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./pages/context/AuthContext";
import Mentor from "./pages/giveback/Mentor";
import Opportunities from "./pages/giveback/Opportunities";
import Payback from "./pages/giveback/Payback";
import Past from "./pages/events/Past";
import About from "./components/About"
import LoginAdmin from "./components/LoginAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogPost from "./pages/BlogPost";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordAdmin from "./components/ForgotPasswordAdmin";
import TermsOfService from "./pages/TermsOfService";
import { P } from "node_modules/framer-motion/dist/types.d-DsEeKk6G";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserDashboard from "./pages/UserDashboard";
import Settings from "./components/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserDashboard/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/about/login" element={<LoginAdmin />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/forgot-password" element={<ForgotPasswordAdmin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/alumni-family" element={<Layout><AlumniFamily /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
            <Route path="/connect" element={<Layout><Connect /></Layout>} />
            <Route path="/service/transcript" element={<Layout><Transcript /></Layout>} />
            <Route path="/giveback/achievements" element={<Layout><Achievements /></Layout>} />
            <Route path="/giveback/mentor" element={<Layout><Mentor /></Layout>} />
            <Route path="/giveback/opportunities" element={<Layout><Opportunities /></Layout>} />
            <Route path="/giveback/payback" element={<Layout><Payback /></Layout>} />
            <Route path="/events/upcoming" element={<Layout><Upcoming /></Layout>} />
            <Route path="/events/past" element={<Layout><Past /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
