"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Plus, Trash2, Edit2, Save, X, LogOut, Lock } from 'lucide-react';

export default function InventoryAdmin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '', title: '', description: '', price: 0, image: '', category: 'crochet', type: 'collection'
  });

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
      if (session) fetchProducts();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProducts();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) setProducts(data);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const finalData = { ...formData, id: formData.id || `item_${Date.now()}` };
    const { error } = await supabase.from('products').upsert(finalData);
    if (error) {
      alert("Error saving: " + error.message);
    } else {
      setIsAdding(false);
      setEditingId(null);
      setFormData({ id: '', title: '', description: '', price: 0, image: '', category: 'crochet', type: 'collection' });
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
    else alert("Error deleting: " + error.message);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setFormData(product);
    setIsAdding(true);
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background/50 flex items-center justify-center p-4">
        <div className="bg-card border border-border p-8 rounded-xl shadow-xl w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-muted-foreground text-center mt-2 text-sm">Please sign in with your Supabase Admin account to manage inventory.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {authError && <div className="bg-red-500/10 text-red-500 p-3 rounded text-sm">{authError}</div>}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-background border border-border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-background border border-border rounded-lg p-2" />
            </div>
            <button type="submit" disabled={authLoading} className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-bold hover:bg-primary/90 mt-4">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Inventory Manager</h1>
            <p className="text-sm text-muted-foreground mt-1">Logged in as {session.user.email}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ id: '', title: '', description: '', price: 0, image: '', category: 'crochet', type: 'collection' }); }}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
            >
              <Plus size={20} /> Add New Item
            </button>
            <button 
              onClick={handleLogout}
              className="border border-border text-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-muted"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {isAdding && (
          <div className="bg-card border border-border p-6 rounded-xl mb-8 shadow-xl">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (₹)</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full bg-background border border-border rounded-lg p-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded-lg p-2 h-20" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input required type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-background border border-border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-background border border-border rounded-lg p-2">
                  <option value="crochet">Crochet</option>
                  <option value="henna">Henna</option>
                  <option value="amigurumi">Amigurumi</option>
                  <option value="apparel">Apparel</option>
                  <option value="homedecor">Home Decor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Display Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-background border border-border rounded-lg p-2">
                  <option value="collection">Collection (Home Page Store)</option>
                  <option value="gallery">Gallery (Portfolio Item only)</option>
                </select>
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 border border-border rounded-lg hover:bg-muted">Cancel</button>
                <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90">
                  <Save size={18} /> Save Item
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-muted/50 border-b border-border text-sm">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="p-8 text-center text-muted-foreground">Loading inventory...</td></tr>
                ) : products.map((product) => (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="p-4"><img src={product.image} className="w-12 h-12 rounded object-cover" alt="img" /></td>
                    <td className="p-4 font-medium truncate max-w-[200px]">{product.title}</td>
                    <td className="p-4 uppercase text-xs tracking-wider">{product.category}</td>
                    <td className="p-4 uppercase text-xs tracking-wider">{product.type}</td>
                    <td className="p-4 text-primary font-bold">₹{product.price}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => startEdit(product)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded mr-2"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && !loading && (
                  <tr><td colSpan="6" className="p-8 text-center text-muted-foreground">No items found. Add one above!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
