import React, { useState, useEffect } from 'react';
import { 
  Testimonial, 
  getTestimonials, 
  addTestimonial, 
  updateTestimonial, 
  deleteTestimonial, 
  toggleTestimonialActive 
} from '../lib/testimonials';
import { 
  Doctor, 
  getDoctors, 
  addDoctor, 
  updateDoctor, 
  deleteDoctor, 
  toggleDoctorActive 
} from '../lib/doctors';
import { authService } from '../lib/auth';
import { Plus, Edit2, Trash2, LogOut, Save, X, Eye, EyeOff, User, MapPin, Hash, Image, Youtube, MessageSquare, ToggleLeft, ToggleRight, ChevronDown, ChevronRight, Stethoscope, GraduationCap, Building2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'testimonials' | 'doctors'>('testimonials');
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
  const [doctorFormData, setDoctorFormData] = useState({
    name: '',
    title: '',
    specialty: '',
    location: '',
    avatar_url: '',
    youtube_url: '',
    quote: '',
    credentials: '',
    is_active: true,
    display_order: 0
  });

  useEffect(() => {
    fetchTestimonials();
    fetchDoctors();
    
    // Listen for testimonials updates
    const handleTestimonialsUpdate = () => {
      fetchTestimonials();
    };
    
    // Listen for doctors updates
    const handleDoctorsUpdate = () => {
      fetchDoctors();
    };
    
    window.addEventListener('testimonials-updated', handleTestimonialsUpdate);
    window.addEventListener('doctors-updated', handleDoctorsUpdate);
    
    return () => {
      window.removeEventListener('testimonials-updated', handleTestimonialsUpdate);
      window.removeEventListener('doctors-updated', handleDoctorsUpdate);
    };
  }, []);

  const fetchTestimonials = () => {
    try {
      const data = getTestimonials();
      setTestimonials(data.sort((a, b) => a.display_order - b.display_order));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      alert('Erro ao carregar depoimentos');
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = () => {
    try {
      const data = getDoctors();
      setDoctors(data.sort((a, b) => a.display_order - b.display_order));
    } catch (error) {
      console.error('Error fetching doctors:', error);
      alert('Erro ao carregar médicos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    authService.logout();
    window.dispatchEvent(new CustomEvent('auth-change'));
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
    setDoctorFormData({
      name: '',
      title: '',
      specialty: '',
      location: '',
      avatar_url: '',
      youtube_url: '',
      quote: '',
      credentials: '',
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
    setActiveSection('testimonials');
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setDoctorFormData({
      name: doctor.name,
      title: doctor.title,
      specialty: doctor.specialty,
      location: doctor.location,
      avatar_url: doctor.avatar_url,
      youtube_url: doctor.youtube_url,
      quote: doctor.quote,
      credentials: doctor.credentials,
      is_active: doctor.is_active,
      display_order: doctor.display_order
    });
    setEditingId(doctor.id);
    setShowAddForm(false);
    setActiveSection('doctors');
  };

  const handleSave = async () => {
    try {
      if (activeSection === 'testimonials') {
        if (editingId) {
          updateTestimonial(editingId, formData);
        } else {
          addTestimonial(formData);
        }
        fetchTestimonials();
        alert(editingId ? 'Depoimento atualizado com sucesso!' : 'Depoimento adicionado com sucesso!');
      } else {
        if (editingId) {
          updateDoctor(editingId, doctorFormData);
        } else {
          addDoctor(doctorFormData);
        }
        fetchDoctors();
        alert(editingId ? 'Médico atualizado com sucesso!' : 'Médico adicionado com sucesso!');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  const handleDelete = async (id: string) => {
    const itemType = activeSection === 'testimonials' ? 'depoimento' : 'médico';
    if (!confirm(`Tem certeza que deseja deletar este ${itemType}?`)) return;

    try {
      if (activeSection === 'testimonials') {
        deleteTestimonial(id);
        fetchTestimonials();
      } else {
        deleteDoctor(id);
        fetchDoctors();
      }
      alert(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deletado com sucesso!`);
    } catch (error) {
      console.error('Error deleting:', error);
      alert(`Erro ao deletar ${itemType}. Tente novamente.`);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      if (activeSection === 'testimonials') {
        toggleTestimonialActive(id);
        fetchTestimonials();
      } else {
        toggleDoctorActive(id);
        fetchDoctors();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Erro ao atualizar status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-magenta-50 to-magenta-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-magenta-200 border-t-magenta-600 mx-auto mb-4"></div>
          <p className="text-magenta-700 font-medium">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-magenta-50 to-magenta-100" style={{ minHeight: import.meta.env.PROD ? '100vh' : 'calc(100vh - 60px)' }}>
      {/* Mobile-First Header */}
      <div className="bg-white shadow-lg border-b-4 border-magenta-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text text-transparent">
                ADMIN PROAXION
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">Gerenciar depoimentos e médicos</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Section Toggle */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-md p-2 inline-flex">
            <button
              onClick={() => setActiveSection('testimonials')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeSection === 'testimonials'
                  ? 'bg-magenta-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-magenta-600'
              }`}
            >
              <MessageSquare className="w-4 h-4 mr-2 inline" />
              Depoimentos
            </button>
            <button
              onClick={() => setActiveSection('doctors')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeSection === 'doctors'
                  ? 'bg-magenta-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-magenta-600'
              }`}
            >
              <Stethoscope className="w-4 h-4 mr-2 inline" />
              Médicos
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {activeSection === 'testimonials' ? (
            <>
              <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-magenta-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-magenta-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-magenta-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{testimonials.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{testimonials.filter(t => t.is_active).length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-gray-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <EyeOff className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Inativos</p>
                    <p className="text-2xl font-bold text-gray-900">{testimonials.filter(t => !t.is_active).length}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{doctors.filter(d => d.is_active).length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-gray-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <EyeOff className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Inativos</p>
                    <p className="text-2xl font-bold text-gray-900">{doctors.filter(d => !d.is_active).length}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId(null);
              resetForm();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-magenta-600 to-magenta-700 hover:from-magenta-700 hover:to-magenta-800 text-white font-bold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            {activeSection === 'testimonials' ? 'Adicionar Novo Depoimento' : 'Adicionar Novo Médico'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingId) && (
          <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-magenta-600 to-magenta-700 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                  {editingId 
                    ? `✏️ Editar ${activeSection === 'testimonials' ? 'Depoimento' : 'Médico'}` 
                    : `➕ Novo ${activeSection === 'testimonials' ? 'Depoimento' : 'Médico'}`
                  }
                </h2>
                <button
                  onClick={resetForm}
                  className="text-white hover:text-magenta-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeSection === 'testimonials' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Info Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <User className="w-5 h-5 mr-2 text-magenta-600" />
                      Informações Pessoais
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-transparent transition-all"
                        placeholder="Ex: João Silva"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-transparent transition-all"
                          placeholder="São Paulo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-transparent transition-all"
                          placeholder="SP"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ordem de Exibição</label>
                      <input
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-transparent transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Media Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Image className="w-5 h-5 mr-2 text-magenta-600" />
                      Mídia e Conteúdo
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL do Avatar</label>
                      <input
                        type="url"
                        value={formData.avatar_url}
                        onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-transparent transition-all"
                        placeholder="https://exemplo.com/foto.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL do YouTube</label>
                      <input
                        type="url"
                        value={formData.youtube_url}
                        onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-transparent transition-all"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Depoimento</label>
                      <textarea
                        value={formData.caption}
                        onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-transparent transition-all resize-none"
                        placeholder="Escreva o depoimento do cliente aqui..."
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Status de Visibilidade</p>
                        <p className="text-sm text-gray-600">Ativo = visível no site</p>
                      </div>
                      <button
                        onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.is_active ? 'bg-magenta-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.is_active ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Doctor Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
                      Informações do Médico
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                      <input
                        type="text"
                        value={doctorFormData.name}
                        onChange={(e) => setDoctorFormData({ ...doctorFormData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Ex: Dr. João Silva"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                        <input
                          type="text"
                          value={doctorFormData.title}
                          onChange={(e) => setDoctorFormData({ ...doctorFormData, title: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="MD, PhD"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Especialidade</label>
                        <input
                          type="text"
                          value={doctorFormData.specialty}
                          onChange={(e) => setDoctorFormData({ ...doctorFormData, specialty: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Cardiologista"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
                      <input
                        type="text"
                        value={doctorFormData.location}
                        onChange={(e) => setDoctorFormData({ ...doctorFormData, location: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Hospital das Clínicas, São Paulo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Credenciais</label>
                      <input
                        type="text"
                        value={doctorFormData.credentials}
                        onChange={(e) => setDoctorFormData({ ...doctorFormData, credentials: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="20+ anos de experiência"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ordem de Exibição</label>
                      <input
                        type="number"
                        value={doctorFormData.display_order}
                        onChange={(e) => setDoctorFormData({ ...doctorFormData, display_order: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Doctor Media Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Image className="w-5 h-5 mr-2 text-blue-600" />
                      Mídia e Conteúdo
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL do Avatar</label>
                      <input
                        type="url"
                        value={doctorFormData.avatar_url}
                        onChange={(e) => setDoctorFormData({ ...doctorFormData, avatar_url: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="https://exemplo.com/foto.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL do YouTube</label>
                      <input
                        type="url"
                        value={doctorFormData.youtube_url}
                        onChange={(e) => setDoctorFormData({ ...doctorFormData, youtube_url: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Citação Médica</label>
                      <textarea
                        value={doctorFormData.quote}
                        onChange={(e) => setDoctorFormData({ ...doctorFormData, quote: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Escreva a opinião médica aqui..."
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Status de Visibilidade</p>
                        <p className="text-sm text-gray-600">Ativo = visível no site</p>
                      </div>
                      <button
                        onClick={() => setDoctorFormData({ ...doctorFormData, is_active: !doctorFormData.is_active })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          doctorFormData.is_active ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            doctorFormData.is_active ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-magenta-600 to-magenta-700 hover:from-magenta-700 hover:to-magenta-800 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeSection === 'testimonials' ? (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Card Header */}
                <div className="relative">
                  <div className="h-2 bg-gradient-to-r from-magenta-500 to-magenta-600"></div>
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={testimonial.avatar_url}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-magenta-200"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                          <p className="text-gray-500 text-sm flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {testimonial.city}, {testimonial.state}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Hash className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium">{testimonial.display_order}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-4">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                    "{testimonial.caption}"
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <a
                      href={testimonial.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Youtube className="w-4 h-4 mr-1" />
                      Ver Vídeo
                    </a>
                    
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      testimonial.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {testimonial.is_active ? (
                        <>
                          <Eye className="w-3 h-3 mr-1" />
                          Ativo
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 mr-1" />
                          Inativo
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleActive(testimonial.id, testimonial.is_active)}
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        testimonial.is_active
                          ? 'text-orange-700 bg-orange-100 hover:bg-orange-200'
                          : 'text-green-700 bg-green-100 hover:bg-green-200'
                      }`}
                    >
                      {testimonial.is_active ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Ocultar
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Mostrar
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="inline-flex items-center px-3 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="inline-flex items-center px-3 py-2 text-red-700 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Card Header */}
                <div className="relative">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={doctor.avatar_url}
                          alt={doctor.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{doctor.name}</h3>
                          <p className="text-gray-500 text-sm">{doctor.title}</p>
                          <p className="text-gray-400 text-xs flex items-center">
                            <Building2 className="w-3 h-3 mr-1" />
                            {doctor.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Hash className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium">{doctor.display_order}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-4">
                  <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-3">
                    "{doctor.quote}"
                  </p>
                  
                  <div className="text-xs text-gray-500 mb-4 flex items-center">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    {doctor.credentials}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <a
                      href={doctor.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Youtube className="w-4 h-4 mr-1" />
                      Ver Vídeo
                    </a>
                    
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      doctor.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {doctor.is_active ? (
                        <>
                          <Eye className="w-3 h-3 mr-1" />
                          Ativo
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 mr-1" />
                          Inativo
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleActive(doctor.id, doctor.is_active)}
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        doctor.is_active
                          ? 'text-orange-700 bg-orange-100 hover:bg-orange-200'
                          : 'text-green-700 bg-green-100 hover:bg-green-200'
                      }`}
                    >
                      {doctor.is_active ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Ocultar
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Mostrar
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditDoctor(doctor)}
                        className="inline-flex items-center px-3 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="inline-flex items-center px-3 py-2 text-red-700 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {((activeSection === 'testimonials' && testimonials.length === 0) || 
            (activeSection === 'doctors' && doctors.length === 0)) && (
            <div className="col-span-full">
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                {activeSection === 'testimonials' ? (
                  <>
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum depoimento encontrado</h3>
                    <p className="text-gray-500 mb-6">Adicione seu primeiro depoimento para começar</p>
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum médico encontrado</h3>
                    <p className="text-gray-500 mb-6">Adicione seu primeiro médico para começar</p>
                  </>
                )}
                <button
                  onClick={() => {
                    setShowAddForm(true);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-magenta-600 to-magenta-700 hover:from-magenta-700 hover:to-magenta-800 text-white font-bold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {activeSection === 'testimonials' ? 'Adicionar Primeiro Depoimento' : 'Adicionar Primeiro Médico'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;