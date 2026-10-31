
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissionRequired: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, permissionRequired }) => {
  const { role, currentUser, isAuthenticated } = useAuth();
  const { rolesPermissions, employees } = useData();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const user = employees.find(e => e.name === currentUser);
  const permissions = user?.customPermissions || rolesPermissions[role] || {};
  
  // Check if the current user has the 'view' action enabled for this module
  const modulePerms = permissions[permissionRequired];
  const isAuthorized = modulePerms?.view || modulePerms?.list;

  if (!isAuthorized) {
    console.warn(`Access Denied: User lacks view permission for '${permissionRequired}'`);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
