// Native authentication system
export interface User {
  email: string;
  isAuthenticated: boolean;
}

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@manforza.com';
const ADMIN_PASSWORD = 'TIAGOPRO';

export const authService = {
  // Login function
  login: async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Store session in localStorage
      localStorage.setItem('auth_session', JSON.stringify({
        email: ADMIN_EMAIL,
        isAuthenticated: true,
        timestamp: Date.now()
      }));
      
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('auth_session');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    try {
      const session = localStorage.getItem('auth_session');
      if (!session) return false;
      
      const parsed = JSON.parse(session);
      
      // Check if session is valid (not expired - 24 hours)
      const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;
      
      if (isExpired) {
        localStorage.removeItem('auth_session');
        return false;
      }
      
      return parsed.isAuthenticated === true;
    } catch {
      return false;
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    try {
      const session = localStorage.getItem('auth_session');
      if (!session) return null;
      
      const parsed = JSON.parse(session);
      
      if (authService.isAuthenticated()) {
        return {
          email: parsed.email,
          isAuthenticated: true
        };
      }
      
      return null;
    } catch {
      return null;
    }
  }
};