import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import PolicyAnalysis from './pages/PolicyAnalysis';
import SentimentAnalysis from './pages/SentimentAnalysis';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Forecasting from './pages/Forecasting';
import UploadData from './pages/UploadData';
import Profile from './pages/Profile';
import Documentation from './pages/Documentation';
import About from './pages/About';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Login />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAdmin) return <div className="p-8 text-center text-red-400">Access Denied: Admins Only</div>;
  return <>{children}</>;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/analysis" element={<ProtectedRoute><PolicyAnalysis /></ProtectedRoute>} />
          <Route path="/sentiment" element={<ProtectedRoute><SentimentAnalysis /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/forecasting" element={<ProtectedRoute><Forecasting /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/documentation" element={<ProtectedRoute><Documentation /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><UploadData /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-brand-accent/35 selection:text-white relative overflow-x-hidden" id="app-root">
        
        {/* Background Mesh Glows for Frosted Glass Theme */}
        <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-[#3B82F6] opacity-20 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[400px] h-[400px] bg-[#6366F1] opacity-15 blur-[100px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-[40%] left-[10%] w-[300px] h-[300px] bg-[#22D3EE] opacity-10 blur-[80px] rounded-full pointer-events-none z-0" />

        {/* Navigation Bar */}
        <Navbar />

        {/* Global Content Grid Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-between relative z-10" id="main-content">
          <AnimatedRoutes />
        </main>

        {/* Dynamic Footer */}
        <Footer />
        
      </div>
    </Router>
    </AuthProvider>
  );
}
