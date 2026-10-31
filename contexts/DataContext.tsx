
import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Patient, Appointment, InventoryItem, Bed, LabTest, Surgery, Employee,
  Ambulance, FinanceRecord, Supplier, Invoice, InvoiceItem, LabTestDefinition, PurchaseOrder,
  Prescription, UserRole, ModulePermissions, ActionPermission, BillingItem,
  WardMaster, FloorMaster, RoomMaster, DatabaseInstance, UserDatabaseMapping,
  SavedQuery, DynamicModuleConfig, Campaign, Admission, VisitLog, BedCategory,
  Shop, ItemGroup, ItemCategory, ItemUnit, AttendanceRecord, LeaveRequest, PayrollRecord, BiometricMachine,
  Company, Branch
} from '../types';
import {
  MOCK_PATIENTS, MOCK_APPOINTMENTS, MOCK_INVENTORY, MOCK_BEDS,
  MOCK_LAB_TESTS, MOCK_SURGERIES, MOCK_EMPLOYEES,
  MOCK_AMBULANCES, MOCK_FINANCE, MOCK_SUPPLIERS, MOCK_INVOICES, MOCK_PRESCRIPTIONS,
  INITIAL_ROLE_PERMISSIONS, MOCK_CAMPAIGNS,
  MOCK_SHOPS, MOCK_ITEM_GROUPS, MOCK_ITEM_CATEGORIES, MOCK_ITEM_UNITS,
  MOCK_ATTENDANCE, MOCK_LEAVES, MOCK_BIOMETRIC, MOCK_PAYROLL,
  MOCK_COMPANIES, MOCK_BRANCHES
} from '../constants';
import { useAuth } from './AuthContext';

interface DataContextType {
  patients: Patient[];
  appointments: Appointment[];
  inventory: InventoryItem[];
  beds: Bed[];
  wards: WardMaster[];
  floors: FloorMaster[];
  rooms: RoomMaster[];
  labTests: LabTest[];
  labTestDefinitions: LabTestDefinition[];
  employees: Employee[];
  finance: FinanceRecord[];
  suppliers: Supplier[];
  invoices: Invoice[];
  prescriptions: Prescription[];
  billingItems: BillingItem[];
  surgeries: Surgery[];
  ambulances: Ambulance[];
  campaigns: Campaign[];
  purchaseOrders: PurchaseOrder[];
  admissions: Admission[];
  databases: DatabaseInstance[];
  userDbMappings: UserDatabaseMapping[];
  savedQueries: SavedQuery[];
  dynamicModules: DynamicModuleConfig[];
  rolesPermissions: Record<string, ModulePermissions>;
  bedCategories: BedCategory[];
  availableRoles: string[];
  shops: Shop[];
  itemGroups: ItemGroup[];
  itemCategories: ItemCategory[];
  itemUnits: ItemUnit[];
  attendance: AttendanceRecord[];
  leaves: LeaveRequest[];
  payroll: PayrollRecord[];
  biometricMachines: BiometricMachine[];
  companies: Company[];
  branches: Branch[];
  currency: 'BDT' | 'USD';
  toggleCurrency: () => void;
  formatCurrency: (amount: number) => string;

  // Actions
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  addBed: (bed: Bed) => void;
  updateBed: (id: string, updates: Partial<Bed>) => void;
  deleteBed: (id: string) => void;
  addWard: (ward: WardMaster) => void;
  updateWard: (id: string, updates: Partial<WardMaster>) => void;
  deleteWard: (id: string) => void;
  addFloor: (floor: FloorMaster) => void;
  updateFloor: (id: string, updates: Partial<FloorMaster>) => void;
  deleteFloor: (id: string) => void;
  addRoom: (room: RoomMaster) => void;
  updateRoom: (id: string, updates: Partial<RoomMaster>) => void;
  deleteRoom: (id: string) => void;
  addLabTest: (test: LabTest) => void;
  updateLabTest: (id: string, updates: Partial<LabTest>) => void;
  addLabTestDefinition: (def: LabTestDefinition) => void;
  updateLabTestDefinition: (id: string, updates: Partial<LabTestDefinition>) => void;
  addTransaction: (record: FinanceRecord) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  addPrescription: (rx: Prescription) => void;
  addBillingItem: (item: BillingItem) => void;
  updateBillingItem: (id: string, updates: Partial<BillingItem>) => void;
  deleteBillingItem: (id: string) => void;
  addEmployee: (emp: Employee) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addRole: (roleName: string) => void;
  deleteRole: (roleName: string) => void;
  updateRolePermissions: (roleName: string, permissions: ModulePermissions) => void;
  updateEmployeeCustomPermissions: (empId: string, permissions: ModulePermissions | undefined) => void;
  addSurgery: (surgery: Surgery) => void;
  updateSurgery: (id: string, updates: Partial<Surgery>) => void;
  deleteSurgery: (id: string) => void;
  addAmbulance: (ambulance: Ambulance) => void;
  updateAmbulance: (id: string, updates: Partial<Ambulance>) => void;
  deleteAmbulance: (id: string) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  updateInventory: (id: string, updates: Partial<InventoryItem>) => void;
  addAttendance: (record: AttendanceRecord) => void;
  updateLeave: (id: string, updates: Partial<LeaveRequest>) => void;
  addLeave: (request: LeaveRequest) => void;
  addPayroll: (record: PayrollRecord) => void;
  updatePayroll: (id: string, updates: Partial<PayrollRecord>) => void;
  deletePayroll: (id: string) => void;
  testBiometricMachine: (id: string) => Promise<boolean>;
  addInventoryItem: (item: InventoryItem) => void;
  addSupplier: (supplier: Supplier) => void;
  addPurchaseOrder: (po: PurchaseOrder) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  addAdmission: (admission: Admission) => void;
  updateAdmission: (id: string, updates: Partial<Admission>) => void;
  deleteAdmission: (id: string) => void;
  addAdmissionItem: (admissionId: string, item: InvoiceItem) => void;
  addDatabase: (db: DatabaseInstance) => void;
  updateDatabase: (id: string, updates: Partial<DatabaseInstance>) => void;
  deleteDatabase: (id: string) => void;
  updateUserDbMapping: (mapping: UserDatabaseMapping) => void;
  saveSqlQuery: (query: SavedQuery) => void;
  deleteSqlQuery: (id: string) => void;
  updateDynamicModule: (config: DynamicModuleConfig) => void;
  addBedCategory: (category: BedCategory) => void;
  updateBedCategory: (id: string, updates: Partial<BedCategory>) => void;
  deleteBedCategory: (id: string) => void;

  addCompany: (company: Company) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  addBranch: (branch: Branch) => void;
  updateBranch: (id: string, updates: Partial<Branch>) => void;
  deleteBranch: (id: string) => void;

  addShop: (shop: Shop) => void;
  updateShop: (id: string, updates: Partial<Shop>) => void;
  deleteShop: (id: string) => void;
  addItemGroup: (group: ItemGroup) => void;
  updateItemGroup: (id: string, updates: Partial<ItemGroup>) => void;
  deleteItemGroup: (id: string) => void;
  addItemCategory: (category: ItemCategory) => void;
  updateItemCategory: (id: string, updates: Partial<ItemCategory>) => void;
  deleteItemCategory: (id: string) => void;
  addItemUnit: (unit: ItemUnit) => void;
  updateItemUnit: (id: string, updates: Partial<ItemUnit>) => void;
  deleteItemUnit: (id: string) => void;

  // Helpers
  getRecommendedOPDRoom: (type: 'OPD' | 'Lab' | 'Diagnosis') => RoomMaster | undefined;
  hasPermission: (module: string, action: keyof ActionPermission) => boolean;
}

const INITIAL_BILLING_ITEMS: BillingItem[] = [
  { id: 'S001', name: 'OPD Consultation (General)', department: 'OPD', price: 500 },
  { id: 'S002', name: 'Specialist Consultation', department: 'OPD', price: 1000 },
  { id: 'S003', name: 'Cataract Surgery Package', department: 'Surgery', price: 25000 },
  { id: 'S004', name: 'Lasik Correction (Both Eyes)', department: 'Surgery', price: 15000 },
  { id: 'S005', name: 'General Ward Bed Charge (per day)', department: 'IPD', price: 800 },
  { id: 'S006', name: 'Private Room Charge (per day)', department: 'IPD', price: 2000 },
  { id: 'S007', name: 'Visual Field Test', department: 'Lab', price: 600 },
  { id: 'S008', name: 'OCT Scan', department: 'Lab', price: 1200 },
  { id: 'S010', name: 'Registration Fee', department: 'OPD', price: 200 },
  { id: 'IPD001', name: 'Nursing Charge (Daily)', department: 'IPD', price: 500 },
  { id: 'IPD002', name: 'Admission Charge', department: 'IPD', price: 1500 },
  { id: 'IPD003', name: 'Service Charge', department: 'IPD', price: 500 },
  { id: 'IPD004', name: 'Oxygen Charge (Per Hour)', department: 'IPD', price: 200 },
];

const INITIAL_BED_CATEGORIES: BedCategory[] = [
  { id: 'CAT001', name: 'General Ward', dailyRent: 800, description: 'Standard shared ward' },
  { id: 'CAT002', name: 'Semi-Private', dailyRent: 1500, description: 'Shared with one other' },
  { id: 'CAT003', name: 'Private Cabin', dailyRent: 3000, description: 'Individual clinical room' },
  { id: 'CAT004', name: 'ICU / CCU', dailyRent: 7500, description: 'Critical care unit' },
];

const INITIAL_FLOORS: FloorMaster[] = [
  { id: 'F0', name: 'Ground Floor', level: 0 },
  { id: 'F1', name: 'First Floor', level: 1 },
];

const INITIAL_WARDS: WardMaster[] = [
  { id: 'W1', name: 'General Male', floorId: 'F0', description: 'Ground floor male general ward' },
  { id: 'W2', name: 'General Female', floorId: 'F0', description: 'Ground floor female general ward' },
  { id: 'W3', name: 'Private Ward', floorId: 'F1', description: 'First floor private cabins' },
];

const INITIAL_ROOMS: RoomMaster[] = [
  { id: 'R101', roomNumber: '101', name: 'OPD Room 1', type: 'OPD', currentLoad: 0 },
  { id: 'R102', roomNumber: '102', name: 'OPD Room 2', type: 'OPD', currentLoad: 0 },
  { id: 'L101', roomNumber: 'L01', name: 'Lab Unit A', type: 'Lab', currentLoad: 0 },
  { id: 'D101', roomNumber: 'D01', name: 'Diagnosis Cabin', type: 'Diagnosis', currentLoad: 0 },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, currentUser, activeBranchId } = useAuth();
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [beds, setBeds] = useState<Bed[]>(MOCK_BEDS);
  const [labTests, setLabTests] = useState<LabTest[]>(MOCK_LAB_TESTS);
  const [labTestDefinitions, setLabTestDefinitions] = useState<LabTestDefinition[]>([
    { id: 'LD001', name: 'HbA1c', code: 'HBA1C', price: 450, referenceRange: '4.0-5.6%', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD002', name: 'Complete Blood Count', code: 'CBC', price: 300, referenceRange: 'Multiple', department: 'Hematology', assignedRoom: 'L01' },
    { id: 'LD003', name: 'Lipid Profile', code: 'LP', price: 800, referenceRange: 'Multiple', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD004', name: 'Thyroid Panel (T3, T4, TSH)', code: 'THY', price: 1200, referenceRange: 'Multiple', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD005', name: 'Liver Function Test', code: 'LFT', price: 750, referenceRange: 'Multiple', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD006', name: 'Renal Function Test', code: 'RFT', price: 700, referenceRange: 'Multiple', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD007', name: 'Urine Routine Examination', code: 'URE', price: 150, referenceRange: 'Normal', department: 'Clinical Pathology', assignedRoom: 'L01' },
    { id: 'LD008', name: 'Blood Group & Rh Type', code: 'BG', price: 100, referenceRange: 'O+/A+/etc', department: 'Hematology', assignedRoom: 'L01' },
    { id: 'LD009', name: 'Serum Ferritin', code: 'SF', price: 500, referenceRange: '30-400 ng/mL', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD010', name: 'C-Reactive Protein', code: 'CRP', price: 300, referenceRange: '< 3.0 mg/L', department: 'Immunology', assignedRoom: 'L01' },
    { id: 'LD011', name: 'Chest X-Ray PA View', code: 'CXR', price: 1000, referenceRange: 'Normal', department: 'Radiology', assignedRoom: 'D01' },
    { id: 'LD012', name: 'ECG 12 Lead', code: 'ECG', price: 450, referenceRange: 'Sinus Rhythm', department: 'Cardiology', assignedRoom: 'D01' },
    { id: 'LD013', name: 'Dengue NS1 Antigen', code: 'DNS1', price: 900, referenceRange: 'Negative', department: 'Serology', assignedRoom: 'L01' },
    { id: 'LD014', name: 'Vitamin D (25-OH)', code: 'VITD', price: 1500, referenceRange: '30-100 ng/mL', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD015', name: 'Fasting Blood Sugar', code: 'FBS', price: 80, referenceRange: '70-100 mg/dL', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD016', name: 'Post Prandial Blood Sugar', code: 'PPBS', price: 80, referenceRange: '< 140 mg/dL', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD017', name: 'HBA1C (Gold Standard)', code: 'HBA1CG', price: 800, referenceRange: '4-6%', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD018', name: 'Serum Electrolytes', code: 'SE', price: 550, referenceRange: 'Multiple', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD019', name: 'Hepatitis B (HBsAg)', code: 'HBSAG', price: 350, referenceRange: 'Non-reactive', department: 'Serology', assignedRoom: 'L01' },
    { id: 'LD020', name: 'HIV I & II Screening', code: 'HIV', price: 500, referenceRange: 'Non-reactive', department: 'Serology', assignedRoom: 'L01' },
    { id: 'LD021', name: 'Uric Acid', code: 'UA', price: 250, referenceRange: '3.5-7.2 mg/dL', department: 'Biochemistry', assignedRoom: 'L01' },
    { id: 'LD022', name: 'Calcium (Serum)', code: 'CA', price: 200, referenceRange: '8.5-10.5 mg/dL', department: 'Biochemistry', assignedRoom: 'L01' },
  ]);
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [finance, setFinance] = useState<FinanceRecord[]>(MOCK_FINANCE);
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);
  const [billingItems, setBillingItems] = useState<BillingItem[]>(INITIAL_BILLING_ITEMS);
  const [surgeries, setSurgeries] = useState<Surgery[]>(MOCK_SURGERIES);
  const [ambulances, setAmbulances] = useState<Ambulance[]>(MOCK_AMBULANCES);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);

  // Filtering Logic
  const filteredPatients = React.useMemo(() => activeBranchId === 'consolidated' ? patients : patients.filter(x => x.branchId === activeBranchId), [patients, activeBranchId]);
  const filteredAppointments = React.useMemo(() => activeBranchId === 'consolidated' ? appointments : appointments.filter(x => x.branchId === activeBranchId), [appointments, activeBranchId]);
  const filteredInventory = React.useMemo(() => activeBranchId === 'consolidated' ? inventory : inventory.filter(x => x.branchId === activeBranchId), [inventory, activeBranchId]);
  const filteredBeds = React.useMemo(() => activeBranchId === 'consolidated' ? beds : beds.filter(x => x.branchId === activeBranchId), [beds, activeBranchId]);
  const filteredLabTests = React.useMemo(() => activeBranchId === 'consolidated' ? labTests : labTests.filter(x => x.branchId === activeBranchId), [labTests, activeBranchId]);
  const filteredEmployees = React.useMemo(() => activeBranchId === 'consolidated' ? employees : employees.filter(x => x.branchId === activeBranchId), [employees, activeBranchId]);
  const filteredFinance = React.useMemo(() => activeBranchId === 'consolidated' ? finance : finance.filter(x => x.branchId === activeBranchId), [finance, activeBranchId]);
  const filteredInvoices = React.useMemo(() => activeBranchId === 'consolidated' ? invoices : invoices.filter(x => x.branchId === activeBranchId), [invoices, activeBranchId]);
  const filteredPrescriptions = React.useMemo(() => activeBranchId === 'consolidated' ? prescriptions : prescriptions.filter(x => x.branchId === activeBranchId), [prescriptions, activeBranchId]);
  const filteredSurgeries = React.useMemo(() => activeBranchId === 'consolidated' ? surgeries : surgeries.filter(x => x.branchId === activeBranchId), [surgeries, activeBranchId]);
  const filteredAmbulances = React.useMemo(() => activeBranchId === 'consolidated' ? ambulances : ambulances.filter(x => x.branchId === activeBranchId), [ambulances, activeBranchId]);
  const filteredCampaigns = React.useMemo(() => activeBranchId === 'consolidated' ? campaigns : campaigns.filter(x => x.branchId === activeBranchId), [campaigns, activeBranchId]);
  const filteredAdmissions = React.useMemo(() => activeBranchId === 'consolidated' ? admissions : admissions.filter(x => x.branchId === activeBranchId), [admissions, activeBranchId]);
  const filteredPurchaseOrders = React.useMemo(() => activeBranchId === 'consolidated' ? purchaseOrders : purchaseOrders.filter(x => x.branchId === activeBranchId), [purchaseOrders, activeBranchId]);

  const [databases, setDatabases] = useState<DatabaseInstance[]>([]);
  const [userDbMappings, setUserDbMappings] = useState<UserDatabaseMapping[]>([]);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [dynamicModules, setDynamicModules] = useState<DynamicModuleConfig[]>([]);
  const [rolesPermissions, setRolesPermissions] = useState<Record<string, ModulePermissions>>(INITIAL_ROLE_PERMISSIONS);
  const [bedCategories, setBedCategories] = useState<BedCategory[]>(INITIAL_BED_CATEGORIES);
  const [availableRoles, setAvailableRoles] = useState<string[]>(Object.values(UserRole));
  const [shops, setShops] = useState<Shop[]>(MOCK_SHOPS);
  const [itemGroups, setItemGroups] = useState<ItemGroup[]>(MOCK_ITEM_GROUPS);
  const [itemCategories, setItemCategories] = useState<ItemCategory[]>(MOCK_ITEM_CATEGORIES);
  const [itemUnits, setItemUnits] = useState<ItemUnit[]>(MOCK_ITEM_UNITS);
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(MOCK_LEAVES);
  const [payroll, setPayroll] = useState<PayrollRecord[]>(MOCK_PAYROLL);
  const [biometricMachines, setBiometricMachines] = useState<BiometricMachine[]>(MOCK_BIOMETRIC);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [branches, setBranches] = useState<Branch[]>(MOCK_BRANCHES);

  const [rooms, setRooms] = useState<RoomMaster[]>(INITIAL_ROOMS);
  const [wards, setWards] = useState<WardMaster[]>(INITIAL_WARDS);
  const [floors, setFloors] = useState<FloorMaster[]>(INITIAL_FLOORS);

  const toggleCurrency = () => setCurrency(prev => prev === 'BDT' ? 'USD' : 'BDT');
  const formatCurrency = (amount: number) => currency === 'BDT' ? `৳${amount.toLocaleString('en-BD')}` : `$${amount.toLocaleString('en-US')}`;

  const hasPermission = useCallback((module: string, action: keyof ActionPermission): boolean => {
    if (role === UserRole.SUPER_ADMIN) return true;

    // If currentUser is just the role name, we can't easily find a specific employee
    // unless we assume the employee name matches the role for the sake of this demo
    // or we just rely on role-based permissions.
    const user = employees.find(e => e.name === currentUser || e.role === role);
    const perms = user?.customPermissions || rolesPermissions[role] || {};
    const modulePerms = perms[module];
    return !!modulePerms?.[action];
  }, [role, currentUser, employees, rolesPermissions]);

  const addPatient = (p: Patient) => setPatients(prev => [p, ...prev]);
  const updatePatient = (id: string, updates: Partial<Patient>) => setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  const deletePatient = (id: string) => setPatients(prev => prev.filter(p => p.id !== id));

  const addBed = (b: Bed) => setBeds(prev => [...prev, b]);
  const updateBed = (id: string, updates: Partial<Bed>) => setBeds(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  const deleteBed = (id: string) => setBeds(prev => prev.filter(b => b.id !== id));

  const addWard = (w: WardMaster) => setWards(prev => [...prev, w]);
  const updateWard = (id: string, updates: Partial<WardMaster>) => setWards(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  const deleteWard = (id: string) => setWards(prev => prev.filter(w => w.id !== id));

  const addFloor = (f: FloorMaster) => setFloors(prev => [...prev, f]);
  const updateFloor = (id: string, updates: Partial<FloorMaster>) => setFloors(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  const deleteFloor = (id: string) => setFloors(prev => prev.filter(f => f.id !== id));

  const addRoom = (r: RoomMaster) => setRooms(prev => [...prev, r]);
  const updateRoom = (id: string, updates: Partial<RoomMaster>) => setRooms(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  const deleteRoom = (id: string) => setRooms(prev => prev.filter(r => r.id !== id));

  const addLabTest = (t: LabTest) => {
    setLabTests(prev => [t, ...prev]);
    // Automation: If patient is IPD, add test to their running bill
    const admission = admissions.find(a => a.patientId === t.patientId && a.status === 'Active');
    if (admission && t.price) {
      addAdmissionItem(admission.id, { id: t.id, description: `Lab Test: ${t.testName}`, qty: 1, price: t.price });
    }
  };
  const updateLabTest = (id: string, updates: Partial<LabTest>) => setLabTests(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  const addLabTestDefinition = (d: LabTestDefinition) => setLabTestDefinitions(prev => [...prev, d]);
  const updateLabTestDefinition = (id: string, updates: Partial<LabTestDefinition>) => setLabTestDefinitions(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));

  const addTransaction = (r: FinanceRecord) => setFinance(prev => [r, ...prev]);
  const addInvoice = (i: Invoice) => setInvoices(prev => [i, ...prev]);
  const updateInvoice = (id: string, u: Partial<Invoice>) => setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, ...u } : inv));
  const deleteInvoice = (id: string) => setInvoices(prev => prev.filter(i => i.id !== id));

  const addPrescription = (r: Prescription) => setPrescriptions(prev => [r, ...prev]);
  const addBillingItem = (i: BillingItem) => setBillingItems(prev => [...prev, i]);
  const updateBillingItem = (id: string, u: Partial<BillingItem>) => setBillingItems(prev => prev.map(item => item.id === id ? { ...item, ...u } : item));
  const deleteBillingItem = (id: string) => setBillingItems(prev => prev.filter(item => item.id !== id));

  const addEmployee = (e: Employee) => setEmployees(prev => [e, ...prev]);
  const updateEmployee = (id: string, u: Partial<Employee>) => setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...u } : e));
  const deleteEmployee = (id: string) => setEmployees(prev => prev.filter(e => e.id !== id));

  const addRole = (n: string) => setAvailableRoles(prev => [...prev, n]);
  const deleteRole = (n: string) => setAvailableRoles(prev => prev.filter(r => r !== n));
  const updateRolePermissions = (n: string, p: ModulePermissions) => setRolesPermissions(prev => ({ ...prev, [n]: p }));
  const updateEmployeeCustomPermissions = (id: string, p: ModulePermissions | undefined) => setEmployees(prev => prev.map(e => e.id === id ? { ...e, customPermissions: p } : e));

  const addSurgery = (s: Surgery) => setSurgeries(prev => [...prev, s]);
  const updateSurgery = (id: string, u: Partial<Surgery>) => {
    setSurgeries(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, ...u };
        // Automation: If surgery marked as Completed, update patient visit history
        if (u.status === 'Completed' && s.status !== 'Completed') {
          const patient = patients.find(p => p.id === s.patientId);
          if (patient) {
            const log: VisitLog = {
              id: `SV-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              doctorName: s.surgeon,
              diagnosis: patient.diagnosis || 'Surgical Procedure',
              treatment: `Surgery: ${s.procedure}`,
              notes: 'Patient successfully underwent surgical procedure.'
            };
            updatePatient(patient.id, {
              visitHistory: [log, ...(patient.visitHistory || [])],
              lastVisit: log.date,
              status: 'Discharged'
            });
          }
        }
        return updated;
      }
      return s;
    }));
  };
  const deleteSurgery = (id: string) => setSurgeries(prev => prev.filter(s => s.id !== id));

  const addAmbulance = (a: Ambulance) => setAmbulances(prev => [...prev, a]);
  const updateAmbulance = (id: string, u: Partial<Ambulance>) => setAmbulances(prev => prev.map(a => a.id === id ? { ...a, ...u } : a));
  const deleteAmbulance = (id: string) => setAmbulances(prev => prev.filter(a => a.id !== id));

  const addCampaign = (c: Campaign) => setCampaigns(prev => [...prev, c]);
  const updateCampaign = (id: string, u: Partial<Campaign>) => setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...u } : c));
  const deleteCampaign = (id: string) => setCampaigns(prev => prev.filter(c => c.id !== id));

  const updateInventory = (id: string, u: Partial<InventoryItem>) => setInventory(prev => prev.map(i => i.id === id ? { ...i, ...u } : i));
  const addInventoryItem = (i: InventoryItem) => setInventory(prev => [...prev, i]);
  const addSupplier = (s: Supplier) => setSuppliers(prev => [...prev, s]);
  const addPurchaseOrder = (p: PurchaseOrder) => setPurchaseOrders(prev => [...prev, p]);

  const addAppointment = (a: Appointment) => setAppointments(prev => [...prev, a]);

  /**
   * Updated to automatically link completed appointments to Patient's visitHistory
   */
  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        const updated = { ...a, ...updates };

        // If status changes to Completed, add to patient's visit history
        if (updates.status === 'Completed' && a.status !== 'Completed') {
          const patient = patients.find(p => p.id === a.patientId);
          if (patient) {
            const log: VisitLog = {
              id: `V-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              doctorName: a.doctorName,
              diagnosis: patient.diagnosis || 'General Consultation',
              treatment: a.type,
              notes: a.notes || 'Auto-generated from completed appointment.'
            };
            updatePatient(patient.id, {
              visitHistory: [log, ...(patient.visitHistory || [])],
              lastVisit: log.date
            });
          }
        }
        return updated;
      }
      return a;
    }));
  };

  const addAdmission = (a: Admission) => setAdmissions(prev => [{ ...a, billItems: a.billItems || [] }, ...prev]);
  const updateAdmission = (id: string, u: Partial<Admission>) => {
    setAdmissions(prev => prev.map(a => {
      if (a.id === id) {
        const updated = { ...a, ...u };
        if (u.status === 'Discharged' && a.status !== 'Discharged') {
          updatePatient(a.patientId, { status: 'Discharged' });
        }
        return updated;
      }
      return a;
    }));
  };
  const deleteAdmission = (id: string) => setAdmissions(prev => prev.filter(a => a.id !== id));
  const addAdmissionItem = (admissionId: string, item: InvoiceItem) => {
    setAdmissions(prev => prev.map(a => {
      if (a.id === admissionId) {
        const existing = a.billItems.find(i => i.id === item.id);
        if (existing) {
          return { ...a, billItems: a.billItems.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i) };
        }
        return { ...a, billItems: [...a.billItems, item] };
      }
      return a;
    }));
  };

  const addDatabase = (d: DatabaseInstance) => setDatabases(prev => [...prev, d]);
  const updateDatabase = (id: string, u: Partial<DatabaseInstance>) => setDatabases(prev => prev.map(d => d.id === id ? { ...d, ...u } : d));
  const deleteDatabase = (id: string) => setDatabases(prev => prev.filter(d => d.id !== id));
  const updateUserDbMapping = (m: UserDatabaseMapping) => setUserDbMappings(prev => [...prev.filter(x => x.userId !== m.userId || x.dbId !== m.dbId), m]);
  const saveSqlQuery = (q: SavedQuery) => setSavedQueries(prev => [...prev.filter(x => x.id !== q.id), q]);
  const deleteSqlQuery = (id: string) => setSavedQueries(prev => prev.filter(q => q.id !== id));
  const updateDynamicModule = (c: DynamicModuleConfig) => setDynamicModules(prev => [...prev.filter(x => x.moduleId !== c.moduleId), c]);

  const addBedCategory = (c: BedCategory) => setBedCategories(prev => [...prev, c]);
  const updateBedCategory = (id: string, u: Partial<BedCategory>) => setBedCategories(prev => prev.map(c => c.id === id ? { ...c, ...u } : c));
  const deleteBedCategory = (id: string) => setBedCategories(prev => prev.filter(c => c.id !== id));

  const addCompany = (c: Company) => setCompanies(prev => [...prev, c]);
  const updateCompany = (id: string, u: Partial<Company>) => setCompanies(prev => prev.map(c => c.id === id ? { ...c, ...u } : c));
  const deleteCompany = (id: string) => setCompanies(prev => prev.filter(c => c.id !== id));

  const addBranch = (b: Branch) => setBranches(prev => [...prev, b]);
  const updateBranch = (id: string, u: Partial<Branch>) => setBranches(prev => prev.map(b => b.id === id ? { ...b, ...u } : b));
  const deleteBranch = (id: string) => setBranches(prev => prev.filter(b => b.id !== id));

  const addShop = (s: Shop) => setShops(prev => [...prev, s]);
  const updateShop = (id: string, u: Partial<Shop>) => setShops(prev => prev.map(s => s.id === id ? { ...s, ...u } : s));
  const deleteShop = (id: string) => setShops(prev => prev.filter(s => s.id !== id));

  const addItemGroup = (g: ItemGroup) => setItemGroups(prev => [...prev, g]);
  const updateItemGroup = (id: string, u: Partial<ItemGroup>) => setItemGroups(prev => prev.map(g => g.id === id ? { ...g, ...u } : g));
  const deleteItemGroup = (id: string) => setItemGroups(prev => prev.filter(g => g.id !== id));

  const addItemCategory = (c: ItemCategory) => setItemCategories(prev => [...prev, c]);
  const updateItemCategory = (id: string, u: Partial<ItemCategory>) => setItemCategories(prev => prev.map(c => c.id === id ? { ...c, ...u } : c));
  const deleteItemCategory = (id: string) => setItemCategories(prev => prev.filter(c => c.id !== id));

  const addItemUnit = (u: ItemUnit) => setItemUnits(prev => [...prev, u]);
  const updateItemUnit = (id: string, updates: Partial<ItemUnit>) => setItemUnits(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  const deleteItemUnit = (id: string) => setItemUnits(prev => prev.filter(u => u.id !== id));

  const addAttendance = (r: AttendanceRecord) => setAttendance(prev => [r, ...prev]);
  const updateLeave = (id: string, u: Partial<LeaveRequest>) => setLeaves(prev => prev.map(l => l.id === id ? { ...l, ...u } : l));
  const addLeave = (r: LeaveRequest) => setLeaves(prev => [r, ...prev]);
  const addPayroll = (r: PayrollRecord) => setPayroll(prev => [r, ...prev]);
  const updatePayroll = (id: string, u: Partial<PayrollRecord>) => setPayroll(prev => prev.map(p => p.id === id ? { ...p, ...u } : p));
  const deletePayroll = (id: string) => setPayroll(prev => prev.filter(p => p.id !== id));
  const testBiometricMachine = async (id: string) => {
    // Simulate API call to machine
    await new Promise(resolve => setTimeout(resolve, 1500));
    const m = biometricMachines.find(x => x.id === id);
    if (!m) return false;
    updateRoom(id, { currentLoad: 0 }); // Just to trigger a state update in some related entity if needed, or just return true
    return true;
  };

  const getRecommendedOPDRoom = (type: 'OPD' | 'Lab' | 'Diagnosis') => {
    const typeRooms = rooms.filter(r => r.type === type);
    if (typeRooms.length === 0) return undefined;
    return typeRooms.reduce((prev, curr) => prev.currentLoad < curr.currentLoad ? prev : curr);
  };

  // Fixed: Removed erroneous AuthContext.Provider wrapper that was re-providing Auth data incorrectly
  return (
    <DataContext.Provider value={{
      patients: filteredPatients, appointments: filteredAppointments, inventory: filteredInventory, beds: filteredBeds,
      wards, floors, rooms, labTests: filteredLabTests, labTestDefinitions, employees: filteredEmployees, finance: filteredFinance,
      suppliers, invoices: filteredInvoices, prescriptions: filteredPrescriptions, billingItems,
      surgeries: filteredSurgeries, ambulances: filteredAmbulances, campaigns: filteredCampaigns,
      purchaseOrders: filteredPurchaseOrders, admissions: filteredAdmissions, databases, userDbMappings, savedQueries, dynamicModules,
      rolesPermissions, bedCategories, availableRoles,
      shops, itemGroups, itemCategories, itemUnits, attendance, leaves, payroll, biometricMachines, companies, branches,
      currency, toggleCurrency, formatCurrency,
      addPatient, updatePatient, deletePatient, addBed, updateBed, deleteBed, addWard, updateWard, deleteWard, addFloor, updateFloor, deleteFloor, addRoom, updateRoom, deleteRoom,
      addLabTest, updateLabTest, addLabTestDefinition, updateLabTestDefinition, addTransaction, addInvoice, updateInvoice, deleteInvoice, addPrescription, addBillingItem, updateBillingItem, deleteBillingItem,
      addEmployee, updateEmployee, deleteEmployee, addRole, deleteRole, updateRolePermissions, updateEmployeeCustomPermissions,
      addSurgery, updateSurgery, deleteSurgery, addAmbulance, updateAmbulance, deleteAmbulance, addCampaign, updateCampaign, deleteCampaign, updateInventory, addInventoryItem, addSupplier, addPurchaseOrder, addAppointment, updateAppointment,
      addAdmission, updateAdmission, deleteAdmission, addAdmissionItem,
      addDatabase, updateDatabase, deleteDatabase, updateUserDbMapping, saveSqlQuery, deleteSqlQuery, updateDynamicModule,
      addBedCategory, updateBedCategory, deleteBedCategory,
      addShop, updateShop, deleteShop, addItemGroup, updateItemGroup, deleteItemGroup,
      addItemCategory, updateItemCategory, deleteItemCategory, addItemUnit, updateItemUnit, deleteItemUnit,
      addAttendance, updateLeave, addLeave, addPayroll, updatePayroll, deletePayroll, testBiometricMachine,
      addCompany, updateCompany, deleteCompany, addBranch, updateBranch, deleteBranch,
      getRecommendedOPDRoom, hasPermission
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
