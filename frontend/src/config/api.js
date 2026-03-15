// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
                    (import.meta.env.MODE === 'production' 
                      ? 'https://your-backend-service.onrender.com' 
                      : 'http://localhost:5000');

export const API_BASE = API_BASE_URL;

// Helper function for API calls
export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const { method = 'GET' } = options;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    console.log(`API Request: ${method} ${url}`);
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText} for ${url}`);
      throw new Error(`API request failed: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error('API call failed:', error);
    console.log('Falling back to mock data due to API failure');
    throw error;
  }
};
