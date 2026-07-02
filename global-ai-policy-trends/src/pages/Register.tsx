import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserPlus, User as UserIcon, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      // 1. Register User
      const regResponse = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const regData = await regResponse.json();

      if (!regResponse.ok) {
        throw new Error(regData.detail || 'Registration failed');
      }

      // 2. Auto Login after registration
      const loginResponse = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const loginData = await loginResponse.json();
      
      if (loginResponse.ok) {
        login(loginData.user, loginData.token);
        navigate('/');
      } else {
        navigate('/login');
      }

    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative">
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] radial-glow-2 opacity-15 -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 blur-[50px] -z-10" />
          
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-4 overflow-hidden p-2">
              <img src="/polaris-logo.png" alt="Polaris AI" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Join Polaris AI</h2>
            <p className="text-slate-400 text-sm">Create an account for the AI Policy Trends platform</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
                  placeholder="Create password"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden rounded-xl p-[1px] mt-6"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-brand-primary rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
              <div className="relative bg-[#020617] px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-opacity-0 group-hover:text-white">
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
                ) : (
                  <>
                    <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">Register</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-primary hover:text-white font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
