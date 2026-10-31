
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import CommandPalette from './components/CommandPalette';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Registration from './pages/Registration';
import Pharmacy from './pages/Pharmacy';
import OPD from './pages/OPD';
import IPD from './pages/IPD';
import Lab from './pages/Lab';
import Appointments from './pages/Appointments';
import Campaigns from './pages/Campaigns';
import Reports from './pages/Reports';
import OT from './pages/OT';
import HR from './pages/HR';
import Ambulance from './pages/Ambulance';
import Finance from './pages/Finance';
import Billing from './pages/Billing';
import EPrescription from './pages/EPrescription';
import EMR from './pages/EMR';
import Settings from './pages/Settings';
import DatabasePanel from './pages/DatabasePanel';
import MigrationBridge from './pages/MigrationBridge';
import UserManual from './pages/UserManual';
import Login from './pages/Login';
import PatientPortal from './pages/PatientPortal';
import BranchManagement from './pages/BranchManagement';
import SuperControl from './pages/SuperControl';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  // Sidebar state persistent across reloads
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<PatientPortal />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <TopBar sidebarOpen={sidebarOpen} onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        <CommandPalette isOpen={commandPaletteOpen} setIsOpen={setCommandPaletteOpen} />

        <div
          className={`transition-all duration-300 ease-in-out pt-20 px-6 md:px-8 lg:px-10 pb-8 min-h-screen print:ml-0 print:p-0 ${sidebarOpen ? 'ml-[280px]' : 'ml-[88px]'
            }`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/patients" element={
              <ProtectedRoute permissionRequired="Patient List">
                <Patients />
              </ProtectedRoute>
            } />
            <Route path="/registration" element={
              <ProtectedRoute permissionRequired="Patient Registration">
                <Registration />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute permissionRequired="Appointments">
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="/opd" element={
              <ProtectedRoute permissionRequired="OPD Queue">
                <OPD />
              </ProtectedRoute>
            } />
            <Route path="/emr" element={
              <ProtectedRoute permissionRequired="EMR (Medical Records)">
                <EMR />
              </ProtectedRoute>
            } />
            <Route path="/e-prescription" element={
              <ProtectedRoute permissionRequired="E-Prescription">
                <EPrescription />
              </ProtectedRoute>
            } />
            <Route path="/ipd" element={
              <ProtectedRoute permissionRequired="IPD & Bed Mgmt">
                <IPD />
              </ProtectedRoute>
            } />
            <Route path="/ot" element={
              <ProtectedRoute permissionRequired="OT & Surgeries">
                <OT />
              </ProtectedRoute>
            } />
            <Route path="/lab" element={
              <ProtectedRoute permissionRequired="Lab & Diagnostics">
                <Lab />
              </ProtectedRoute>
            } />
            <Route path="/billing" element={
              <ProtectedRoute permissionRequired="Billing & POS">
                <Billing />
              </ProtectedRoute>
            } />
            <Route path="/pharmacy" element={
              <ProtectedRoute permissionRequired="Pharmacy & Optical">
                <Pharmacy />
              </ProtectedRoute>
            } />
            <Route path="/finance" element={
              <ProtectedRoute permissionRequired="Financial Ledger">
                <Finance />
              </ProtectedRoute>
            } />
            <Route path="/hr" element={
              <ProtectedRoute permissionRequired="HR & Staff">
                <HR />
              </ProtectedRoute>
            } />
            <Route path="/campaigns" element={
              <ProtectedRoute permissionRequired="Outreach Camps">
                <Campaigns />
              </ProtectedRoute>
            } />
            <Route path="/ambulance" element={
              <ProtectedRoute permissionRequired="Ambulance Fleet">
                <Ambulance />
              </ProtectedRoute>
            } />
            <Route path="/database" element={
              <ProtectedRoute permissionRequired="Database Management">
                <DatabasePanel />
              </ProtectedRoute>
            } />
            <Route path="/branches" element={
              <ProtectedRoute permissionRequired="Database Management">
                <BranchManagement />
              </ProtectedRoute>
            } />
            <Route path="/super-control" element={
              <ProtectedRoute permissionRequired="Database Management">
                <SuperControl />
              </ProtectedRoute>
            } />
            <Route path="/migration" element={
              <ProtectedRoute permissionRequired="Database Management">
                <MigrationBridge />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute permissionRequired="Reports & Analytics">
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/manual" element={
              <ProtectedRoute permissionRequired="User Manual">
                <UserManual />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute permissionRequired="System Settings">
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/portal" element={<PatientPortal />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
