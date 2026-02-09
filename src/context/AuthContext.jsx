import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);

          const normalizedUser = {
            ...parsedUser,
            role: parsedUser.role?.toUpperCase(),
          };

          setUser(normalizedUser);
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading auth:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  const login = (userData, authToken) => {
    const normalizedUser = {
      ...userData,
      role: userData.role?.toUpperCase(),
    };

    setUser(normalizedUser);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
