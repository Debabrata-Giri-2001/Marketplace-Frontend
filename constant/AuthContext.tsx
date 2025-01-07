import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  loginType: string | null;
  updateLoginType: (type: string) => void;
  loginEmail: any,
  setLoginEmail: any,
  loginMobile: any,
  setLoginMobile: any,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loginType, setLoginType] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState<any>(null);
  const [loginMobile, setLoginMobile] = useState<any>(null);

  const updateLoginType = (type: string) => {
    setLoginType(type);
  };



  return (
    <AuthContext.Provider value={{ loginType, updateLoginType, loginEmail, setLoginEmail, loginMobile, setLoginMobile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthProvider = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
