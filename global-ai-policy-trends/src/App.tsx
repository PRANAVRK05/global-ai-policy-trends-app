import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { ShieldAlert } from 'lucide-react';

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
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import UserRegister from './pages/UserRegister';
import AdminRegister from './pages/AdminRegister';
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
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-4">
          <ShieldAlert className="h-12 w-12 text-red-400" />
        </div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">403</h1>
        <h2 className="text-xl font-semibold text-slate-300 mb-6">Access Denied</h2>
        <p className="text-slate-400 text-center max-w-md mb-8">
          You do not have the required permissions to view this page. This area is restricted to system administrators.
        </p>
        <Link to="/" className="px-6 py-3 rounded-xl font-medium bg-brand-primary hover:bg-blue-600 text-white transition-all">
          Return to Dashboard
        </Link>
      </div>
    );
  }
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
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/user" element={<UserRegister />} />
          <Route path="/register/admin" element={<AdminRegister />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/analysis" element={<ProtectedRoute><PolicyAnalysis /></ProtectedRoute>} />
          <Route path="/sentiment" element={<ProtectedRoute><SentimentAnalysis /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/forecasting" element={<ProtectedRoute><Forecasting /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/documentation" element={<AdminRoute><Documentation /></AdminRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>} />
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
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </main>

        {/* Dynamic Footer */}
        <Footer />
        
      </div>
    </Router>
    </AuthProvider>
  );
}
