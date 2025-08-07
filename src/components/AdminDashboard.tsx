import React, { useState, useEffect } from 'react';
import { supabase, Testimonial } from '../lib/supabase';
import { Plus, Edit2, Trash2, LogOut, Save, X, Eye, EyeOff } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    avatar_url: '',
    youtube_url: '',
    caption: '',
    is_active: true,
    display_order: 0
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      city: '',
      state: '',
      avatar_url: '',
      youtube_url: '',
      caption: '',
      is_active: true,
      display_order: 0
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      city: testimonial.city,
      state: testimonial.state,
      avatar_url: testimonial.avatar_url,
      youtube_url: testimonial.youtube_url,
      caption: testimonial.caption,
      is_active: testimonial.is_active,
      display_order: testimonial.display_order
    });
    setEditingId(testimonial.id);
    setShowAddForm(false);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        // Create new testimonial
        const { error } = await supabase
          .from('testimonials')
          .insert([formData]);

        if (error) throw error;
      }

      await fetchTestimonials();
      resetForm();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Error deleting testimonial. Please try again.');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-magenta-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ minHeight: import.meta.env.PROD ? '100vh' : 'calc(100vh - 60px)' }}>
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Testimonials Admin</h1>
              <p className="text-gray-600">Manage customer testimonial videos</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId(null);
              resetForm();
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-magenta-600 hover:bg-magenta-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Testimonial
          </button>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingId) && (
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-magenta-500 focus:border-magenta-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-magenta-500 focus:border-magenta-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-magenta-500 focus:border-magenta-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-magenta-500 focus:border-magenta-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                <input
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-magenta-500 focus:border-magenta-500"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                <input
                  type="url"
                  value={formData.youtube_url}
                  onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-magenta-500 focus:border-magenta-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-magenta-500 focus:border-magenta-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded border-gray-300 text-magenta-600 focus:ring-magenta-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active (visible on website)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-magenta-600 hover:bg-magenta-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
            </div>
          </div>
        )}

        {/* Testimonials List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Current Testimonials ({testimonials.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {testimonial.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {testimonial.city}, {testimonial.state}
                        </span>
                        <span className="text-xs text-gray-400">
                          Order: {testimonial.display_order}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{testimonial.caption}</p>
                      <a
                        href={testimonial.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-magenta-600 hover:text-magenta-700 text-sm mt-2 inline-block"
                      >
                        {testimonial.youtube_url}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleActive(testimonial.id, testimonial.is_active)}
                      className={`p-2 rounded-md ${
                        testimonial.is_active
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      title={testimonial.is_active ? 'Hide testimonial' : 'Show testimonial'}
                    >
                      {testimonial.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      title="Edit testimonial"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      title="Delete testimonial"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {testimonials.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No testimonials found. Add your first testimonial above.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;