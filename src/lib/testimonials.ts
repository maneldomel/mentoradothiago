// Local testimonials management system
export interface Testimonial {
  id: string;
  name: string;
  city: string;
  state: string;
  avatar_url: string;
  youtube_url: string;
  caption: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Default testimonials data
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Richard Donovan',
    city: 'Denver',
    state: 'CO',
    avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Peaxion completely changed my life. In just 3 months I felt an incredible difference in my energy and stamina.',
    caption: 'Manforza completely changed my life. In just 3 months I felt an incredible difference in my energy and stamina.',
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Carlos Ramirez',
    city: 'San Antonio',
    state: 'TX',
    avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Amazing results! My wife noticed the difference and our relationship improved dramatically. I recommend this to every man.',
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Anthony Morelli',
    city: 'Tampa',
    state: 'FL',
    avatar_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'At 61 I thought it was too late, but Peaxion proved me wrong. I feel like I\'m 25 again!',
    caption: 'At 61 I thought it was too late, but Manforza proved me wrong. I feel like I\'m 25 again!',
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const STORAGE_KEY = 'proaxion_testimonials';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get testimonials from localStorage
export const getTestimonials = (): Testimonial[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // If no data exists, initialize with default data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTestimonials));
    return defaultTestimonials;
  } catch (error) {
    console.error('Error loading testimonials:', error);
    return defaultTestimonials;
  }
};

// Save testimonials to localStorage
const saveTestimonials = (testimonials: Testimonial[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
    // Dispatch custom event to notify components of changes
    window.dispatchEvent(new CustomEvent('testimonials-updated'));
  } catch (error) {
    console.error('Error saving testimonials:', error);
    throw new Error('Erro ao salvar depoimentos');
  }
};

// Get active testimonials sorted by display order
export const getActiveTestimonials = (): Testimonial[] => {
  return getTestimonials()
    .filter(t => t.is_active)
    .sort((a, b) => a.display_order - b.display_order);
};

// Add new testimonial
export const addTestimonial = (testimonialData: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Testimonial => {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonialData,
    id: generateId(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  testimonials.push(newTestimonial);
  saveTestimonials(testimonials);
  return newTestimonial;
};

// Update testimonial
export const updateTestimonial = (id: string, updates: Partial<Omit<Testimonial, 'id' | 'created_at'>>): Testimonial => {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  
  if (index === -1) {
    throw new Error('Depoimento não encontrado');
  }
  
  testimonials[index] = {
    ...testimonials[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  saveTestimonials(testimonials);
  return testimonials[index];
};

// Delete testimonial
export const deleteTestimonial = (id: string): void => {
  const testimonials = getTestimonials();
  const filteredTestimonials = testimonials.filter(t => t.id !== id);
  
  if (filteredTestimonials.length === testimonials.length) {
    throw new Error('Depoimento não encontrado');
  }
  
  saveTestimonials(filteredTestimonials);
};

// Toggle testimonial active status
export const toggleTestimonialActive = (id: string): Testimonial => {
  const testimonials = getTestimonials();
  const testimonial = testimonials.find(t => t.id === id);
  
  if (!testimonial) {
    throw new Error('Depoimento não encontrado');
  }
  
  return updateTestimonial(id, { is_active: !testimonial.is_active });
};