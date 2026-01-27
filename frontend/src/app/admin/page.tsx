'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/card';
import { Lock, LogOut, Plus, Edit, Trash2, Save, X } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
        <Card className="w-full max-w-md">
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <Lock className="h-12 w-12 mx-auto text-zinc-600 dark:text-zinc-400" />
              <h1 className="text-2xl font-bold">Admin Login</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Access the CMS dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-300 text-sm space-y-2">
                  <div className="font-semibold">⚠️ Error:</div>
                  <div>{error}</div>
                  <div className="text-xs mt-2 opacity-75 border-t border-red-300 dark:border-red-700 pt-2">
                    <div>API URL: <code className="bg-red-200 dark:bg-red-800 px-1 rounded">{API_URL}</code></div>
                    <div className="mt-1">Check: 1) Backend is running, 2) CORS is configured, 3) Environment variable is set</div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">CMS Admin Dashboard</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Welcome, {user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-700">
          {(['publications', 'projects', 'experience', 'achievements', 'teaching'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-300 text-sm space-y-2">
            <div className="font-semibold">⚠️ Error:</div>
            <div>{error}</div>
            <div className="text-xs mt-2 opacity-75">
              API URL: <code className="bg-red-200 dark:bg-red-800 px-1 rounded">{API_URL}</code>
            </div>
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Publications</h2>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Publication
              </button>
            </div>

            {editingId && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {editingId === 'new' ? 'Create Publication' : 'Edit Publication'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Authors</label>
                    <input
                      type="text"
                      value={formData.authors || ''}
                      onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Venue</label>
                      <input
                        type="text"
                        value={formData.venue || ''}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Year</label>
                      <input
                        type="number"
                        value={formData.year || ''}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select
                      value={formData.type || 'conference'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                    >
                      <option value="conference">Conference</option>
                      <option value="journal">Journal</option>
                      <option value="workshop">Workshop</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Link (optional)</label>
                    <input
                      type="url"
                      value={formData.link || ''}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description (optional)</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-4">
              {publications.map((pub) => (
                <Card key={pub.id} className="p-6">
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
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                        >
                          View Paper →
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(pub)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pub.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab !== 'publications' && (
          <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
            <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
