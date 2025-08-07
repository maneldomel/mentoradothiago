// Local doctors management system
export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  location: string;
  avatar_url: string;
  youtube_url: string;
  quote: string;
  credentials: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Default doctors data
const defaultDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. James Mitchell',
    title: 'MD, Urologist',
    specialty: 'Men\'s Health Specialist',
    location: 'Johns Hopkins Hospital, Baltimore',
    avatar_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    quote: 'The natural compounds in this formula have shown remarkable results in my clinical practice. I\'ve seen men regain their confidence and vitality.',
    credentials: '25+ years experience, Harvard Medical School',
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Dr. Sarah Thompson',
    title: 'MD, Endocrinologist',
    specialty: 'Hormone Therapy Expert',
    location: 'Mayo Clinic, Rochester',
    avatar_url: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    quote: 'This breakthrough formula addresses the root hormonal causes. The science behind these ingredients is truly impressive.',
    credentials: '20+ years experience, Stanford Medical Center',
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Dr. Robert Chen',
    title: 'MD, PhD',
    specialty: 'Clinical Research Director',
    location: 'UCLA Medical Center, Los Angeles',
    avatar_url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    quote: 'Our clinical trials show significant improvement in 89% of participants. This represents a major advancement in men\'s health.',
    credentials: 'PhD in Biochemistry, 15+ years clinical research',
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const STORAGE_KEY = 'proaxion_doctors';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get doctors from localStorage
export const getDoctors = (): Doctor[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // If no data exists, initialize with default data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDoctors));
    return defaultDoctors;
  } catch (error) {
    console.error('Error loading doctors:', error);
    return defaultDoctors;
  }
};

// Save doctors to localStorage
const saveDoctors = (doctors: Doctor[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doctors));
    // Dispatch custom event to notify components of changes
    window.dispatchEvent(new CustomEvent('doctors-updated'));
  } catch (error) {
    console.error('Error saving doctors:', error);
    throw new Error('Error saving doctors');
  }
};

// Get active doctors sorted by display order
export const getActiveDoctors = (): Doctor[] => {
  return getDoctors()
    .filter(d => d.is_active)
    .sort((a, b) => a.display_order - b.display_order);
};

// Add new doctor
export const addDoctor = (doctorData: Omit<Doctor, 'id' | 'created_at' | 'updated_at'>): Doctor => {
  const doctors = getDoctors();
  const newDoctor: Doctor = {
    ...doctorData,
    id: generateId(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  doctors.push(newDoctor);
  saveDoctors(doctors);
  return newDoctor;
};

// Update doctor
export const updateDoctor = (id: string, updates: Partial<Omit<Doctor, 'id' | 'created_at'>>): Doctor => {
  const doctors = getDoctors();
  const index = doctors.findIndex(d => d.id === id);
  
  if (index === -1) {
    throw new Error('Doctor not found');
  }
  
  doctors[index] = {
    ...doctors[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  saveDoctors(doctors);
  return doctors[index];
};

// Delete doctor
export const deleteDoctor = (id: string): void => {
  const doctors = getDoctors();
  const filteredDoctors = doctors.filter(d => d.id !== id);
  
  if (filteredDoctors.length === doctors.length) {
    throw new Error('Doctor not found');
  }
  
  saveDoctors(filteredDoctors);
};

// Toggle doctor active status
export const toggleDoctorActive = (id: string): Doctor => {
  const doctors = getDoctors();
  const doctor = doctors.find(d => d.id === id);
  
  if (!doctor) {
    throw new Error('Doctor not found');
  }
  
  return updateDoctor(id, { is_active: !doctor.is_active });
};