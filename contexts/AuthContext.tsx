
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

interface AuthContextType {
  currentUser: string;
  role: UserRole;
  isAuthenticated: boolean;
  activeBranchId: string; // Use 'consolidated' for all branches
  activeCompanyId: string;
  login: (username: string, role: UserRole, branchId?: string, companyId?: string) => void;
  switchRole: (role: UserRole) => void;
  setBranch: (branchId: string) => void;
  setCompany: (companyId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('auth_role');
    return (saved as UserRole) || UserRole.SUPER_ADMIN;
  });

  const [currentUser, setCurrentUser] = useState<string>(() => {
    return localStorage.getItem('auth_user') || '';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('is_authenticated') === 'true';
  });

  const [activeBranchId, setActiveBranchId] = useState<string>(() => {
    return localStorage.getItem('active_branch_id') || 'BR001';
  });

  const [activeCompanyId, setActiveCompanyId] = useState<string>(() => {
    return localStorage.getItem('active_company_id') || 'COMP001';
  });

  const login = (username: string, selectedRole: UserRole, branchId?: string, companyId?: string) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
    setRole(selectedRole);
    if (branchId) {
      setActiveBranchId(branchId);
      localStorage.setItem('active_branch_id', branchId);
    }
    if (companyId) {
      setActiveCompanyId(companyId);
      localStorage.setItem('active_company_id', companyId);
    }
    localStorage.setItem('is_authenticated', 'true');
    localStorage.setItem('auth_user', username);
    localStorage.setItem('auth_role', selectedRole);
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('auth_role', newRole);
  };

  const setBranch = (branchId: string) => {
    setActiveBranchId(branchId);
    localStorage.setItem('active_branch_id', branchId);
  };

  const setCompany = (companyId: string) => {
    setActiveCompanyId(companyId);
    localStorage.setItem('active_company_id', companyId);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    setRole(UserRole.RECEPTIONIST);
    localStorage.removeItem('is_authenticated');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_role');
    localStorage.removeItem('active_branch_id');
    localStorage.removeItem('active_company_id');
    window.location.href = '#/login';
  };

  return (
    <AuthContext.Provider value={{
      currentUser, role, isAuthenticated,
      activeBranchId, activeCompanyId,
      login, switchRole, setBranch, setCompany, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
