
export enum UserRole {
  ADMIN = 'Admin',
  DOCTOR = 'Doctor',
  NURSE = 'Nurse',
  PHARMACIST = 'Pharmacist',
  RECEPTIONIST = 'Receptionist',
  SUPER_ADMIN = 'SuperAdmin'
}

export interface ActionPermission {
  list: boolean;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
  print: boolean;
}

export type ModulePermissions = Record<string, ActionPermission>;

export interface SavedQuery {
  id: string;
  title: string;
  sql: string;
  isLocked: boolean;
  password?: string;
  category: 'Report' | 'Utility' | 'Module-Logic';
  createdAt: string;
}

export interface DynamicModuleConfig {
  moduleId: string;
  screenName: string;
  baseSql: string;
  layoutType: 'Grid' | 'Form' | 'Split';
  customButtons: { label: string; actionSql: string; icon: string }[];
}

export interface VisitLog {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
}

export interface PreviousVisionHistory {
  re: { sph: string; cyl: string; axis: string; va: string; };
  le: { sph: string; cyl: string; axis: string; va: string; };
  notes: string;
}

export interface Vitals {
  bp: string;
  pulse: string;
  temp: string;
  weight: string;
  vaRight: string;
  vaLeft: string;
  spo2?: string;
  rbs?: string;
}

export interface Patient {
  id: string;
  branchId: string;
  name: string;
  age: number;
  ageMonths?: number;
  dob?: string;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  altContact?: string;
  email?: string;
  lastVisit: string;
  diagnosis: string;
  status: 'OPD' | 'IPD' | 'Discharged';
  assignedDoctor?: string;
  assignedRoom?: string;

  // Regional & Admin Fields
  paymentCategory: 'Pay' | 'Free';
  speciality: string;
  patientType: string;
  allocation: string;
  mrLocation: string;
  nextOfKin: string;
  village: string;
  postOffice: string;
  postCode: string;
  upazilla: string;
  district: string;
  state: string;
  country: string;
  remarks: string;
  registrationFee: number;

  previousHistory?: string;
  previousVisionHistory?: PreviousVisionHistory;
  currentVitals?: Vitals;
  prescriptionNotes?: string;
  visitHistory?: VisitLog[];
  allergies?: string;
  currentMedications?: string;
  familyHistory?: string;
  documents?: { name: string; date: string; type: string }[];
  campaignId?: string;
}

export interface RoomMaster {
  id: string;
  roomNumber: string;
  name: string;
  type: 'OPD' | 'Lab' | 'Diagnosis';
  currentLoad: number;
}

export interface WardMaster {
  id: string;
  name: string;
  floorId: string;
  description: string;
}

export interface FloorMaster {
  id: string;
  name: string;
  level: number;
}

/* Added missing properties used throughout the app for Bed interface and made wardId optional for mock compatibility */
export interface Bed {
  id: string;
  branchId: string;
  number: string;
  wardId?: string;
  category?: string; // e.g. General, Semi-Private, Private, ICU
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
  patientId?: string;
  admissionId?: string;
  ward?: string;
  floor?: string;
  patientName?: string;
  admissionDate?: string;
}

export interface BedCategory {
  id: string;
  name: string;
  dailyRent: number;
  description?: string;
}

export interface Admission {
  id: string;
  branchId: string;
  patientId: string;
  patientName: string;
  bedId: string;
  bedNumber: string;
  bedCategory?: string;
  doctorId: string;
  doctorName: string;
  admissionDate: string;
  expectedDischargeDate?: string;
  actualDischargeDate?: string;
  surgeryName?: string;
  advancePaid: number;
  status: 'Active' | 'Discharged' | 'Transferred';
  notes?: string;
  billItems: InvoiceItem[];

  // Additional Registration Fields
  relativeName?: string;
  relativeContact?: string;
  caseType?: 'Normal' | 'MLC' | 'Free';
  admittedFrom?: 'OPD' | 'Emergency' | 'Direct';
  referredBy?: string;
}

export interface BillingItem {
  id: string;
  name: string;
  department: 'OPD' | 'IPD' | 'Pharmacy' | 'Lab' | 'Surgery' | 'General';
  price: number;
  code?: string;
}

export interface Shop {
  id: string;
  branchId: string;
  name: string;
  type: 'Pharmacy' | 'Vision';
  location: string;
  contact: string;
}

export interface ItemGroup { id: string; name: string; }
export interface ItemSubGroup { id: string; groupId: string; name: string; }
export interface ItemCategory { id: string; name: string; }
export interface ItemSubCategory { id: string; categoryId: string; name: string; }
export interface ItemUnit { id: string; name: string; abbreviation: string; }

export interface ItemBatch {
  id: string;
  batchNo: string;
  mfgDate: string;
  expiryDate: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
  mrp: number;
}

export interface InventoryItem {
  id: string;
  branchId: string;
  name: string;
  groupId: string;
  subGroupId?: string;
  categoryId: string;
  subCategoryId?: string;
  baseUnitId: string;
  altUnitId?: string;
  conversionFactor?: number;
  batches: ItemBatch[];
  totalStock: number;
  reorderLevel: number;
  shopId: string;
  description?: string;
}

export interface Appointment {
  id: string;
  branchId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  time: string;
  date: string;
  type: 'Consultation' | 'Surgery' | 'Follow-up' | 'Emergency';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface LabTestDefinition {
  id: string;
  name: string;
  code: string;
  price: number;
  referenceRange: string;
  department: string;
  assignedRoom?: string;
}

export interface LabTest {
  id: string;
  branchId: string;
  patientId: string;
  patientName: string;
  testName: string;
  date: string;
  status: 'Pending' | 'Sample Collected' | 'Processing' | 'Completed' | 'Delivered';
  result?: string;
  price?: number;
  roomLocation?: string;
  sampleCollectedAt?: string;
  processedAt?: string;
  deliveredAt?: string;
  technicianName?: string;
  referenceRange?: string;
  deliveryTiming?: string; // Estimated time for report
  invoiceId?: string;
  paymentStatus?: 'Paid' | 'Pending' | 'Partial' | 'Overdue';
}

export interface Employee {
  id: string;
  branchId: string;
  name: string;
  role: string;
  department: string;
  contact: string;
  shift: 'Morning' | 'Evening' | 'Night' | 'Off';
  status: 'Active' | 'Leave' | 'Terminated';
  customPermissions?: ModulePermissions;
  salaryStructure: SalaryStructure;
  joiningDate: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'Present' | 'Late' | 'Absent' | 'On Leave';
  machineId: string;
  location: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Casual' | 'Sick' | 'Annual' | 'Maternity' | 'Other';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
}

export interface SalaryStructure {
  basic: number;
  houseRent: number;
  medical: number;
  transport: number;
  otherAllowances: number;
  deductions: {
    pf: number;
    insurance: number;
    tax: number;
  };
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string; // YYYY-MM
  year: number;
  basicPaid: number;
  allowancesPaid: number;
  deductionsTotal: number;
  netSalary: number;
  paymentStatus: 'Paid' | 'Pending';
  paymentDate?: string;
}

export interface BiometricMachine {
  id: string;
  name: string;
  ip: string;
  location: string;
  status: 'Online' | 'Offline';
}

export interface FinanceRecord {
  id: string;
  branchId: string;
  date: string;
  description: string;
  category: 'Income' | 'Expense';
  amount: number;
  method: 'Cash' | 'Card' | 'Insurance' | 'Bank Transfer';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  itemsSupplied: string[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  price: number;
}

export interface Invoice {
  id: string;
  branchId: string;
  patientId: string;
  patientName: string;
  patientContact: string;
  date: string;
  appointmentId?: string;
  department: 'OPD' | 'IPD' | 'Pharmacy' | 'Lab' | 'Surgery';
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  currency: 'BDT' | 'USD';
  paymentMethod: 'Cash' | 'Card' | 'Insurance' | 'Online';
  paymentGateway?: 'SSL Commerz' | 'bKash' | 'Nagad' | 'Rocket' | 'Visa/MasterCard';
  transactionId?: string;
  paymentStatus: 'Paid' | 'Pending' | 'Partial' | 'Overdue';
  workflowStatus: 'Completed' | 'Sample Pending' | 'Report Pending' | 'Discharge Ready' | 'In Process';
  reportDeliverySlot?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface Campaign {
  id: string;
  branchId: string;
  name: string;
  location: string;
  date: string;
  status: 'Planned' | 'Active' | 'Completed';
  targetPatients: number;
  screenedPatients: number;
}

export interface Surgery {
  id: string;
  branchId: string;
  patientId: string; // Added for linkage
  patientName: string;
  procedure: string;
  surgeon: string;
  theater: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'In Progress' | 'Recovery' | 'Completed';
}

export interface Ambulance {
  id: string;
  branchId: string;
  vehicleNumber: string;
  driverName: string;
  contact: string;
  status: 'Available' | 'On Trip' | 'Maintenance';
  location: string;
}

export interface PrescribedMedicine {
  name: string;
  dosage: string;
  duration: string;
  instruction: string;
}

export interface RefractionValues {
  sph: string;
  cyl: string;
  axis: string;
  va?: string;
}

export interface GlassPrescription {
  ar?: {
    re: RefractionValues;
    le: RefractionValues;
  };
  acc: {
    re: {
      dv: RefractionValues;
      add: { sph: string; va: string };
    };
    le: {
      dv: RefractionValues;
      add: { sph: string; va: string };
    };
  };
  pd?: {
    dist: string;
    near: string;
  };
  lensTypes?: string[];
  refractionist?: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  branchId: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medicines: PrescribedMedicine[];
  notes: string;
  vitals?: { bp: string; pulse: string; temp: string; weight: string };
  vision?: { re: string; le: string };
  glassPrescription?: GlassPrescription;
}

export interface LabEquipment {
  id: string;
  name: string;
  model: string;
  purchaseDate: string;
  value: number;
  status: 'Operational' | 'Maintenance' | 'Out of Order';
  nextService: string;
}

export interface PurchaseOrderItem {
  itemName: string;
  qty: number;
  price: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  date: string;
  status: 'Draft' | 'Ordered' | 'Received';
  items: PurchaseOrderItem[];
  total: number;
}

export interface DatabaseInstance {
  id: string;
  name: string;
  host: string;
  instance: string;
  port: string;
  authMode: 'SQL' | 'Windows';
  username?: string;
  password?: string;
  status: 'Connected' | 'Error' | 'Idle';
  lastSync: string;
}

export interface Company {
  id: string;
  name: string;
  registrationNumber?: string;
  taxId?: string;
  address: string;
  contact: string;
  email: string;
  website?: string;
  logo?: string;
  dbConfig?: DatabaseInstance;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface Branch {
  id: string;
  companyId: string;
  name: string;
  code: string;
  location: string;
  address: string;
  contact: string;
  email: string;
  managerName?: string;
  status: 'Active' | 'Inactive';
  settings?: {
    currency: string;
    timezone: string;
    dateFormat: string;
  };
  createdAt: string;
}

export interface FeatureControl {
  id: string;
  name: string;
  isEnabled: boolean;
  description?: string;
}

export interface SubModuleControl {
  id: string;
  name: string;
  isEnabled: boolean;
  features: FeatureControl[];
}

export interface ModuleControl {
  id: string;
  name: string;
  isEnabled: boolean;
  subModules: SubModuleControl[];
}

export interface SystemSettings {
  id: string;
  companyId: string;
  modules: ModuleControl[];
  advancedConfig: Record<string, any>;
  updatedAt: string;
}

export interface UserDatabaseMapping {
  userId: string;
  dbId: string;
  permissions: {
    read: boolean;
    write: boolean;
    admin: boolean;
  };
}
