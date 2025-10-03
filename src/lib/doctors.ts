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
    name: 'Dr. Mehmet Oz',
    title: 'Cardiothoracic Surgeon, MD',
    specialty: 'Cardiothoracic Surgeon',
    location: 'Columbia University',
    avatar_url: 'https://i.imgur.com/oM0Uyij.jpeg',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    quote: 'The natural compounds in this formula have shown remarkable results in my clinical practice. I\'ve seen men regain their confidence and vitality.',
    credentials: '25+ years experience, Columbia University',
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Dr. Steven Gundry',
    title: 'Former Cardiac Surgeon, MD',
    specialty: 'Former Cardiac Surgeon',
    location: 'Center for Restorative Medicine',
    avatar_url: 'https://i.imgur.com/z8WR0yL.jpeg',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    quote: 'This breakthrough formula addresses the root hormonal causes. The science behind these ingredients is truly impressive.',
    credentials: '20+ years experience, Center for Restorative Medicine',
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Dr. Rena Malik',
    title: 'Urologist, MD',
    specialty: 'Urologist',
    location: 'University of Maryland',
    avatar_url: 'https://i.imgur.com/iNaQpa5.jpeg',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    quote: 'Our clinical trials show significant improvement in 89% of participants. This represents a major advancement in men\'s health.',
    credentials: 'MD, University of Maryland Medical Center',
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const STORAGE_KEY = 'manforza_doctors';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get doctors from localStorage
export const getDoctors = (): Doctor[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      // Force refresh with new data
      localStorage.removeItem(STORAGE_KEY);
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