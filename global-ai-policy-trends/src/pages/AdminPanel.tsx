import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Trash2, ShieldCheck, User as UserIcon, Loader2 } from 'lucide-react';
import { useAuth, User } from '../context/AuthContext';

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    try {
      // Attempt to fetch from real API, but gracefully fallback to mock data
      const res = await fetch('/api/backend/users').catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        setUsers(data.users);
      } else {
        // Mock data for offline support
        setUsers([
          { username: 'admin', role: 'admin' },
          { username: 'john.doe', role: 'user' },
          { username: 'sarah.smith', role: 'user' }
        ]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (username: string) => {
    if (username === 'admin') return alert('Cannot delete default admin');
    if (!window.confirm(`Are you sure you want to delete ${username}?`)) return;

    try {
      const res = await fetch(`/api/backend/users/${username}`, { method: 'DELETE' }).catch(() => null);
      if (res && !res.ok) throw new Error('Delete failed');
      setUsers(users.filter(u => u.username !== username));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRoleChange = async (username: string, newRole: string) => {
    if (username === 'admin') return alert('Cannot change default admin role');
    try {
      const res = await fetch(`/api/backend/users/${username}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      }).catch(() => null);
      if (res && !res.ok) throw new Error('Role update failed');
      
      // Update local state directly for mocked fallback
      setUsers(users.map(u => u.username === username ? { ...u, role: newRole as any } : u));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      <div className="absolute top-[10%] right-[20%] w-[300px] h-[300px] bg-rose-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="flex items-center gap-3 border-b border-white/5 pb-6">
        <div className="p-3 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
          <ShieldAlert className="w-6 h-6 text-brand-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Admin Operations</h1>
          <p className="text-slate-400 mt-1">Manage platform access, user roles, and system parameters.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-brand-accent" />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          {error}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <h2 className="text-lg font-semibold text-white">Registered Users</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01]">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u, i) => (
                  <motion.tr 
                    key={u.username}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                          <UserIcon className="w-4 h-4" />
                        </div>
                        <span className="text-white font-medium">{u.username}</span>
                        {u.username === currentUser?.username && (
                          <span className="ml-2 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">You</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select 
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.username, e.target.value)}
                        disabled={u.username === 'admin'}
                        className="bg-[#020617] border border-white/10 text-slate-300 text-sm rounded-lg focus:ring-brand-accent focus:border-brand-accent block p-2"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDelete(u.username)}
                        disabled={u.username === 'admin' || u.username === currentUser?.username}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
