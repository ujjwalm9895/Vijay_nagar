'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/card';
import { Lock, LogOut, Plus, Edit, Trash2, Save, X, CheckCircle, Loader } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface User {
  id: string;
  email: string;
  role: string;
}

interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: string;
  link?: string;
  description?: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'publications' | 'projects' | 'experience' | 'achievements' | 'teaching'>('publications');
  
  // Data states
  const [publications, setPublications] = useState<Publication[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    // Check if admin exists, redirect to setup if not
    checkAdminAndRedirect();
    
    // Test API connection on mount (non-blocking, just for diagnostics)
    testApiConnection().catch(() => {
      // Silently handle - connection test is just for diagnostics
    });
    
    const storedToken = localStorage.getItem('admin_token');
    if (storedToken) {
      setToken(storedToken);
      verifyToken(storedToken);
    }
  }, []);

  const checkAdminAndRedirect = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/status`);
      const data = await response.json();
      
      if (!data.adminExists && data.setupRequired) {
        // No admin exists, redirect to setup
        window.location.href = '/admin/setup';
      }
    } catch (err) {
      // Silently fail - let user try to login
      console.error('Failed to check admin status:', err);
    }
  };

  const testApiConnection = async () => {
    try {
      // Test root URL first (more reliable)
      const rootUrl = API_URL.replace('/api', '');
      const healthUrl = `${rootUrl}/api/health`;
      
      console.log('🔍 Testing API connection...');
      console.log('📍 API URL:', API_URL);
      console.log('📍 Root URL:', rootUrl);
      console.log('📍 Health URL:', healthUrl);
      
      // Use longer timeout for Render free tier (services may sleep)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout
      
      try {
        const response = await fetch(healthUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ API connection successful:', data);
          return true;
        } else {
          console.warn('⚠️ API health check failed:', response.status, response.statusText);
          if (response.status === 0 || response.status === 404) {
            console.warn('💡 This might be a CORS issue. Check backend CORS configuration.');
          }
          return false;
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      const errorName = err instanceof Error ? err.name : 'Unknown';
      
      console.warn('⚠️ Cannot reach API at:', API_URL);
      console.warn('Error type:', errorName);
      console.warn('Error details:', errorMessage);
      
      // Provide helpful error message based on error type
      if (errorName === 'AbortError' || errorMessage.includes('timeout')) {
        console.warn('💡 Timeout Error - Possible causes:');
        console.warn('   1. Backend service is sleeping (Render free tier)');
        console.warn('   2. Network is slow');
        console.warn('   → Solution: Wait 15-20 seconds and try again');
        console.warn('   → Or: Visit https://vijay-nagar-backend.onrender.com/api/health in browser first to wake it up');
      } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        console.warn('💡 Network Error - Possible causes:');
        console.warn('   1. Backend service is down or sleeping');
        console.warn('   2. CORS is not configured correctly');
        console.warn('   3. Backend URL is incorrect');
        console.warn('   → Solution: Check backend is running and CORS allows localhost:3000');
        console.warn('   → Verify: Visit https://vijay-nagar-backend.onrender.com in browser');
      } else if (errorMessage.includes('CORS') || errorMessage.includes('Not allowed')) {
        console.warn('💡 CORS Error - Backend needs to allow localhost:3000');
        console.warn('   → Solution: Redeploy backend with updated CORS code');
        console.warn('   → Or: Check FRONTEND_URL in Render backend environment variables');
      } else {
        console.warn('💡 Unknown Error - Check:');
        console.warn('   1. Backend service status in Render dashboard');
        console.warn('   2. Browser console for more details');
        console.warn('   3. Network tab in DevTools');
      }
      
      return false;
    }
  };

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`,
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        setIsAuthenticated(true);
        loadData(tokenToVerify);
      } else {
        localStorage.removeItem('admin_token');
        setToken(null);
      }
    } catch (err) {
      localStorage.removeItem('admin_token');
      setToken(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        setError(errorData.error || `Server error: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();

      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', data.token);
        loadData(data.token);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Login error:', err);
      setError(
        `Network error: ${errorMessage}. ` +
        `Please check: 1) Backend is running at ${API_URL}, ` +
        `2) CORS is configured correctly, 3) Environment variable NEXT_PUBLIC_API_URL is set.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setPublications([]);
  };

  const loadData = async (tokenToUse: string) => {
    try {
      const response = await fetch(`${API_URL}/publications`, {
        headers: {
          'Authorization': `Bearer ${tokenToUse}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPublications(data);
      } else {
        console.error('Failed to load publications:', response.status, response.statusText);
        if (response.status === 401) {
          // Token expired or invalid
          handleLogout();
          setError('Session expired. Please login again.');
        }
      }
    } catch (err) {
      console.error('Failed to load data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to load publications: ${errorMessage}. Check API connection at ${API_URL}`);
    }
  };

  const handleCreate = () => {
    setEditingId('new');
    setFormData({
      title: '',
      authors: '',
      venue: '',
      year: new Date().getFullYear(),
      type: 'conference',
      link: '',
      description: '',
    });
  };

  const handleEdit = (item: Publication) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const url = editingId === 'new'
        ? `${API_URL}/publications`
        : `${API_URL}/publications/${editingId}`;
      
      const method = editingId === 'new' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadData(token);
        setEditingId(null);
        setFormData({});
        setError(''); // Clear any previous errors
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        setError(errorData.error || `Failed to save: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Save error:', err);
      setError(`Network error: ${errorMessage}. Check API connection at ${API_URL}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Are you sure you want to delete this item?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/publications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await loadData(token);
        setError(''); // Clear any previous errors
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        setError(errorData.error || `Failed to delete: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Delete error:', err);
      setError(`Network error: ${errorMessage}. Check API connection at ${API_URL}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <Card className="w-full shadow-2xl border-2 border-zinc-200 dark:border-zinc-800">
            <div className="p-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center space-y-2"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="inline-block"
                >
                  <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                    <Lock className="h-12 w-12 mx-auto text-white" />
                  </div>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Admin Login
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-zinc-600 dark:text-zinc-400"
                >
                  Access the CMS dashboard
                </motion.p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-300 text-sm space-y-2"
                    >
                      <div className="font-semibold">⚠️ Error:</div>
                      <div>{error}</div>
                      <div className="text-xs mt-2 opacity-75 border-t border-red-300 dark:border-red-700 pt-2">
                        <div>API URL: <code className="bg-red-200 dark:bg-red-800 px-1 rounded">{API_URL}</code></div>
                        <div className="mt-1">Check: 1) Backend is running, 2) CORS is configured, 3) Environment variable is set</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="admin@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter password"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </motion.button>
              </motion.form>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/20 to-purple-50/20 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-700 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CMS Admin Dashboard
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Welcome, {user?.email}</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
      >
        <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-700 overflow-x-auto">
          {(['publications', 'projects', 'experience', 'achievements', 'teaching'] as const).map((tab, index) => (
            <motion.button
              key={tab}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-300 text-sm space-y-2"
            >
              <div className="font-semibold">⚠️ Error:</div>
              <div>{error}</div>
              <div className="text-xs mt-2 opacity-75">
                API URL: <code className="bg-red-200 dark:bg-red-800 px-1 rounded">{API_URL}</code>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeTab === 'publications' && (
            <motion.div
              key="publications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex justify-between items-center"
              >
                <h2 className="text-xl font-semibold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
                  Publications
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreate}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  <Plus className="h-4 w-4" />
                  Add Publication
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {editingId && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <Card className="p-6 border-2 border-blue-200 dark:border-blue-800 shadow-xl">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        {editingId === 'new' ? 'Create Publication' : 'Edit Publication'}
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <motion.input
                            whileFocus={{ scale: 1.01, borderColor: '#3b82f6' }}
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label className="block text-sm font-medium mb-1">Authors</label>
                          <motion.input
                            whileFocus={{ scale: 1.01, borderColor: '#3b82f6' }}
                            type="text"
                            value={formData.authors || ''}
                            onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div>
                            <label className="block text-sm font-medium mb-1">Venue</label>
                            <motion.input
                              whileFocus={{ scale: 1.01, borderColor: '#3b82f6' }}
                              type="text"
                              value={formData.venue || ''}
                              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Year</label>
                            <motion.input
                              whileFocus={{ scale: 1.01, borderColor: '#3b82f6' }}
                              type="number"
                              value={formData.year || ''}
                              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <label className="block text-sm font-medium mb-1">Type</label>
                          <motion.select
                            whileFocus={{ scale: 1.01, borderColor: '#3b82f6' }}
                            value={formData.type || 'conference'}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all"
                          >
                            <option value="conference">Conference</option>
                            <option value="journal">Journal</option>
                            <option value="workshop">Workshop</option>
                            <option value="other">Other</option>
                          </motion.select>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <label className="block text-sm font-medium mb-1">Link (optional)</label>
                          <motion.input
                            whileFocus={{ scale: 1.01, borderColor: '#3b82f6' }}
                            type="url"
                            value={formData.link || ''}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <label className="block text-sm font-medium mb-1">Description (optional)</label>
                          <motion.textarea
                            whileFocus={{ scale: 1.01, borderColor: '#3b82f6' }}
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                          className="flex gap-2"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <Loader className="h-4 w-4 animate-spin" />
                            ) : (
                              <Save className="h-4 w-4" />
                            )}
                            Save
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded transition-all"
                          >
                            <X className="h-4 w-4" />
                            Cancel
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <AnimatePresence>
                  {publications.map((pub, index) => (
                    <motion.div
                      key={pub.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.95 }}
                      transition={{
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      layout
                    >
                      <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{pub.title}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                              {pub.authors} - {pub.venue} {pub.year}
                            </p>
                            {pub.description && (
                              <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">{pub.description}</p>
                            )}
                            {pub.link && (
                              <motion.a
                                whileHover={{ x: 5 }}
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm mt-2 inline-block transition-colors"
                              >
                                View Paper →
                              </motion.a>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(pub)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: -5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(pub.id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeTab !== 'publications' && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12 text-zinc-500 dark:text-zinc-400"
            >
              <motion.p
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} management coming soon...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
