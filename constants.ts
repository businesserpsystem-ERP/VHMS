
import { ChartDataPoint, InventoryItem, Patient, Appointment, UserRole, Bed, LabTest, Campaign, Surgery, Employee, Ambulance, FinanceRecord, Supplier, Invoice, Prescription, ActionPermission, ModulePermissions, Shop, SalaryStructure, AttendanceRecord, LeaveRequest, BiometricMachine, PayrollRecord, Company, Branch } from './types';
import {
  LayoutDashboard, Users, Bed as BedIcon, Calendar, Stethoscope,
  TestTube, Pill, ShoppingCart, UserCog, FileText,
  Ambulance as AmbulanceIcon, Eye, TrendingUp, Activity, Scissors, Briefcase, DollarSign, ShieldCheck, UserPlus, List, Receipt, FilePlus, Glasses, Package, Landmark, ClipboardList, Info, Sparkles, Download, Database, BookOpen, Coins, RefreshCw
} from 'lucide-react';

export const APP_NAME = "Visionary Care HMS";

export const ORG_DETAILS = {
  name: "Visionary Care Eye Hospital",
  address: "123 Healthcare Plaza, Medical District, City - 560001",
  contact: "+880 1234 567890",
  email: "info@visionarycare.com",
  website: "www.visionarycare.com",
  logo: "https://picsum.photos/seed/visionary/200/200"
};

const DEFAULT_ACTIONS: ActionPermission = { list: true, view: true, add: false, edit: false, delete: false, export: false, print: false };
const FULL_ACTIONS: ActionPermission = { list: true, view: true, add: true, edit: true, delete: true, export: true, print: true };
const READ_ONLY: ActionPermission = { list: true, view: true, add: false, edit: false, delete: false, export: false, print: true };

// --- Mock Data Initialization ---
const generatePatients = (): Patient[] => {
  const diagnoses = ['Cataract', 'Glaucoma', 'Myopia', 'Hyperopia', 'Astigmatism', 'Diabetic Retinopathy', 'Conjunctivitis'];
  const doctors = ['Dr. Emily Chen', 'Dr. A. Sharma', 'Dr. B. Reynolds', 'Dr. C. Lee', 'Dr. Sarah Khan'];
  const patients: Patient[] = [];

  patients.push({
    id: 'P001', branchId: 'BR001', name: 'John Doe', age: 45, gender: 'Male', contact: '555-0101', lastVisit: '2023-10-25', diagnosis: 'Cataract Left Eye', status: 'IPD', assignedDoctor: 'Dr. Emily Chen', previousHistory: 'Hypertension',
    previousVisionHistory: { re: { sph: '-0.50', cyl: '-0.25', axis: '90', va: '6/6' }, le: { sph: '+1.00', cyl: '', axis: '', va: '6/18' }, notes: 'Blurry vision LE.' },
    visitHistory: [{ id: 'V001', date: '2023-10-25', doctorName: 'Dr. Emily Chen', diagnosis: 'Cataract', treatment: 'Surgery Scheduled' }],
    paymentCategory: 'Pay',
    speciality: 'EYE',
    patientType: 'Old',
    allocation: 'Room 101',
    mrLocation: 'Shelf A1',
    nextOfKin: 'Jane Doe',
    village: 'Medical District',
    postOffice: 'City Main',
    postCode: '560001',
    upazilla: 'Central',
    district: 'City',
    state: 'State 1',
    country: 'Country',
    remarks: 'Pre-op workup done',
    registrationFee: 100
  });

  for (let i = 2; i <= 50; i++) {
    const status = i % 10 === 0 ? 'IPD' : (i % 5 === 0 ? 'Discharged' : 'OPD');
    patients.push({
      id: `P${i.toString().padStart(3, '0')}`,
      branchId: 'BR001',
      name: `Patient ${i}`,
      age: Math.floor(Math.random() * 60) + 10,
      gender: i % 2 === 0 ? 'Female' : 'Male',
      contact: `555-0${100 + i}`,
      lastVisit: new Date(Date.now() - Math.floor(Math.random() * 5000000000)).toISOString().split('T')[0],
      diagnosis: diagnoses[Math.floor(Math.random() * diagnoses.length)],
      status: status as any,
      assignedDoctor: doctors[Math.floor(Math.random() * doctors.length)],
      visitHistory: [],
      paymentCategory: 'Pay',
      speciality: 'EYE',
      patientType: 'New',
      allocation: 'General OPD',
      mrLocation: 'Reception',
      nextOfKin: 'Relative',
      village: 'Village',
      postOffice: 'PO',
      postCode: '1000',
      upazilla: 'Upazilla',
      district: 'District',
      state: 'State',
      country: 'Country',
      remarks: '',
      registrationFee: 50
    });
  }
  return patients;
};

export const MOCK_PATIENTS = generatePatients();
export const MOCK_SHOPS: Shop[] = [
  { id: 'SH001', branchId: 'BR001', name: 'Main Pharmacy', type: 'Pharmacy', location: 'Ground Floor, Block A', contact: '017110001' },
  { id: 'SH002', branchId: 'BR001', name: 'Vision Center', type: 'Vision', location: 'First Floor, Block B', contact: '017110002' },
];

export const MOCK_ITEM_GROUPS = [
  { id: 'G001', name: 'Antibiotics' },
  { id: 'G002', name: 'Ophthalmic Solutions' },
  { id: 'G003', name: 'Spectacle Frames' },
  { id: 'G004', name: 'Contact Lenses' },
  { id: 'G005', name: 'Analgesics' },
  { id: 'G006', name: 'Antivirals' },
  { id: 'G007', name: 'Cardiology Meds' },
  { id: 'G008', name: 'Dermatology' },
  { id: 'G009', name: 'Lens Cleaners' },
  { id: 'G010', name: 'Surgical Supplies' },
  { id: 'G011', name: 'Eye Patches' },
  { id: 'G012', name: 'Sunglasses' },
  { id: 'G013', name: 'Reading Glasses' },
  { id: 'G014', name: 'Pediatric Care' },
  { id: 'G015', name: 'Diabetes Care' },
  { id: 'G016', name: 'Sterile Gauze' },
  { id: 'G017', name: 'Syringes' },
  { id: 'G018', name: 'Antacids' },
  { id: 'G019', name: 'Multivitamins' },
  { id: 'G020', name: 'Inhalers' },
  { id: 'G021', name: 'Lubricant Drops' },
];

export const MOCK_ITEM_CATEGORIES = [
  { id: 'C001', name: 'Healthcare' },
  { id: 'C002', name: 'Retail' },
  { id: 'C003', name: 'Emergency' },
  { id: 'C004', name: 'Premium' },
  { id: 'C005', name: 'General' },
  { id: 'C006', name: 'Critical Care' },
  { id: 'C007', name: 'Outdoor' },
  { id: 'C008', name: 'Pediatric' },
  { id: 'C009', name: 'Diagnostics' },
  { id: 'C010', name: 'Surgical' },
  { id: 'C011', name: 'Disposables' },
  { id: 'C012', name: 'Equipment' },
  { id: 'C013', name: 'Accessories' },
  { id: 'C014', name: 'Cosmetic' },
  { id: 'C015', name: 'Organic' },
  { id: 'C016', name: 'Generic' },
  { id: 'C017', name: 'Imported' },
  { id: 'C018', name: 'Specialist' },
  { id: 'C019', name: 'Laboratory' },
  { id: 'C020', name: 'Wellness' },
];

export const MOCK_ITEM_UNITS = [
  { id: 'U001', name: 'Tablet', abbreviation: 'Tab' },
  { id: 'U002', name: 'Bottle', abbreviation: 'Btl' },
  { id: 'U003', name: 'Piece', abbreviation: 'Pc' },
  { id: 'U004', name: 'Box', abbreviation: 'Box' },
  { id: 'U005', name: 'Vial', abbreviation: 'Vl' },
  { id: 'U006', name: 'Strip', abbreviation: 'Stp' },
  { id: 'U007', name: 'Capsule', abbreviation: 'Cap' },
  { id: 'U008', name: 'Syrup', abbreviation: 'Syr' },
  { id: 'U009', name: 'Ointment', abbreviation: 'Oint' },
  { id: 'U010', name: 'Injection', abbreviation: 'Inj' },
  { id: 'U011', name: 'Ampoule', abbreviation: 'Amp' },
  { id: 'U012', name: 'Packet', abbreviation: 'Pkt' },
  { id: 'U013', name: 'Gram', abbreviation: 'Gm' },
  { id: 'U014', name: 'Milliliter', abbreviation: 'Ml' },
  { id: 'U015', name: 'Pair', abbreviation: 'Pr' },
  { id: 'U016', name: 'Sachet', abbreviation: 'Sach' },
  { id: 'U017', name: 'Roll', abbreviation: 'Roll' },
  { id: 'U018', name: 'Set', abbreviation: 'Set' },
  { id: 'U019', name: 'Tube', abbreviation: 'Tube' },
  { id: 'U020', name: 'Kit', abbreviation: 'Kit' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'INV001',
    branchId: 'BR001',
    name: 'Timolol 0.5% Drops',
    groupId: 'G011',
    categoryId: 'C001',
    baseUnitId: 'U002',
    totalStock: 150,
    reorderLevel: 50,
    shopId: 'SH001',
    batches: [
      { id: 'B001', batchNo: 'B2401', mfgDate: '2024-01-01', expiryDate: '2026-01-01', stock: 100, purchasePrice: 10, salePrice: 12.5, mrp: 15 },
      { id: 'B002', batchNo: 'B2402', mfgDate: '2024-02-01', expiryDate: '2025-02-01', stock: 50, purchasePrice: 10.5, salePrice: 13, mrp: 15 },
    ]
  },
  {
    id: 'INV002',
    branchId: 'BR001',
    name: 'Amoxicillin 500mg',
    groupId: 'G001',
    categoryId: 'C016',
    baseUnitId: 'U007',
    totalStock: 2000,
    reorderLevel: 500,
    shopId: 'SH001',
    batches: [
      { id: 'B003', batchNo: 'AMX-90', mfgDate: '2024-03-01', expiryDate: '2025-05-01', stock: 2000, purchasePrice: 2, salePrice: 5, mrp: 8 },
    ]
  },
  {
    id: 'INV003',
    branchId: 'BR001',
    name: 'Paracetamol 500mg',
    groupId: 'G005',
    categoryId: 'C005',
    baseUnitId: 'U001',
    totalStock: 5000,
    reorderLevel: 1000,
    shopId: 'SH001',
    batches: [
      { id: 'B004', batchNo: 'PAR-22', mfgDate: '2024-01-15', expiryDate: '2026-06-15', stock: 5000, purchasePrice: 0.5, salePrice: 2, mrp: 3 },
    ]
  },
  {
    id: 'INV020',
    branchId: 'BR001',
    name: 'RayBan Aviator Gold',
    groupId: 'G012',
    categoryId: 'C004',
    baseUnitId: 'U003',
    totalStock: 12,
    reorderLevel: 5,
    shopId: 'SH002',
    batches: [
      { id: 'B005', batchNo: 'RB-992', mfgDate: '2023-01-01', expiryDate: '2030-01-01', stock: 12, purchasePrice: 80, salePrice: 120, mrp: 150 },
    ]
  },
  {
    id: 'INV021',
    branchId: 'BR001',
    name: 'Oakley Holbrook Black',
    groupId: 'G012',
    categoryId: 'C004',
    baseUnitId: 'U003',
    totalStock: 8,
    reorderLevel: 3,
    shopId: 'SH002',
    batches: [
      { id: 'B006', batchNo: 'OK-442', mfgDate: '2024-01-10', expiryDate: '2029-01-10', stock: 8, purchasePrice: 95, salePrice: 140, mrp: 180 },
    ]
  },
  {
    id: 'INV022',
    branchId: 'BR001',
    name: 'Crizal Sapphire UV Lens',
    groupId: 'G003',
    categoryId: 'C013',
    baseUnitId: 'U015',
    totalStock: 50,
    reorderLevel: 10,
    shopId: 'SH002',
    batches: [
      { id: 'B007', batchNo: 'CRZ-V1', mfgDate: '2024-01-01', expiryDate: '2028-01-01', stock: 50, purchasePrice: 40, salePrice: 85, mrp: 100 },
    ]
  },
];
export const MOCK_APPOINTMENTS = [];
// Fix: Added missing 'floor' property required by the Bed interface
export const MOCK_BEDS: Bed[] = [
  { id: 'B101', branchId: 'BR001', number: '101', ward: 'General', floor: 'Ground Floor', status: 'Occupied', patientName: 'John Doe', admissionDate: '2023-10-25' },
  { id: 'B103', branchId: 'BR001', number: '103', ward: 'General', floor: 'Ground Floor', status: 'Available' },
  { id: 'B201', branchId: 'BR001', number: '201', ward: 'Private', floor: 'First Floor', status: 'Occupied', patientName: 'Jane Smith', admissionDate: '2023-10-24' },
];
export const MOCK_LAB_TESTS: LabTest[] = [
  { id: 'LT001', branchId: 'BR001', patientId: 'P001', patientName: 'John Doe', testName: 'HbA1c', date: '2023-10-25', status: 'Completed', result: '6.5%', price: 450, technicianName: 'Alan Wake', referenceRange: '4.0-5.6%' },
  { id: 'LT002', branchId: 'BR001', patientId: 'P002', patientName: 'Patient 2', testName: 'Complete Blood Count', date: '2023-10-26', status: 'Processing', price: 300 },
  { id: 'LT003', branchId: 'BR001', patientId: 'P003', patientName: 'Patient 3', testName: 'Lipid Profile', date: '2023-10-27', status: 'Pending', price: 800 },
  { id: 'LT004', branchId: 'BR001', patientId: 'P004', patientName: 'Patient 4', testName: 'Thyroid Panel', date: '2023-10-27', status: 'Sample Collected', price: 600 },
  { id: 'LT005', branchId: 'BR001', patientId: 'P005', patientName: 'Sarah Jenkins', testName: 'Liver Function Test', date: '2023-10-28', status: 'Completed', result: 'Normal', price: 550, technicianName: 'Sarah Connor' },
  { id: 'LT006', branchId: 'BR001', patientId: 'P006', patientName: 'Patient 6', testName: 'Vitamin D', date: '2023-10-28', status: 'Processing', price: 1200 },
  { id: 'LT007', branchId: 'BR001', patientId: 'P007', patientName: 'Patient 7', testName: 'Urine Analysis', date: '2023-10-29', status: 'Pending', price: 150 },
  { id: 'LT008', branchId: 'BR001', patientId: 'P008', patientName: 'Patient 8', testName: 'Renal Function Test', date: '2023-10-29', status: 'Sample Collected', price: 700 },
  { id: 'LT009', branchId: 'BR001', patientId: 'P009', patientName: 'Patient 9', testName: 'Serum Ferritin', date: '2023-10-30', status: 'Completed', result: '85 ng/mL', price: 500, technicianName: 'Bruce Banner', referenceRange: '30-400 ng/mL' },
  { id: 'LT010', branchId: 'BR001', patientId: 'P010', patientName: 'Patient 10', testName: 'Chest X-Ray', date: '2023-10-30', status: 'Completed', result: 'Clear', price: 1000, technicianName: 'Tony Stark' },
  { id: 'LT011', branchId: 'BR001', patientId: 'P011', patientName: 'Patient 11', testName: 'ECG', date: '2023-10-31', status: 'Pending', price: 400 },
  { id: 'LT012', branchId: 'BR001', patientId: 'P012', patientName: 'Patient 12', testName: 'Stool Test', date: '2023-10-31', status: 'Sample Collected', price: 200 },
  { id: 'LT013', branchId: 'BR001', patientId: 'P013', patientName: 'Patient 13', testName: 'Blood Grouping', date: '2023-11-01', status: 'Completed', result: 'O+', price: 100, technicianName: 'Peter Parker' },
  { id: 'LT014', branchId: 'BR001', patientId: 'P014', patientName: 'Patient 14', testName: 'Dengue NS1', date: '2023-11-01', status: 'Processing', price: 900 },
  { id: 'LT015', branchId: 'BR001', patientId: 'P015', patientName: 'Patient 15', testName: 'Malaria Parasite', date: '2023-11-02', status: 'Pending', price: 350 },
  { id: 'LT016', branchId: 'BR001', patientId: 'P016', patientName: 'Patient 16', testName: 'PCR - COVID19', date: '2023-11-02', status: 'Sample Collected', price: 2500 },
  { id: 'LT017', branchId: 'BR001', patientId: 'P017', patientName: 'Patient 17', testName: 'Hepatitis B Panel', date: '2023-11-03', status: 'Processing', price: 1500 },
  { id: 'LT018', branchId: 'BR001', patientId: 'P018', patientName: 'Patient 18', testName: 'Electrolytes', date: '2023-11-03', status: 'Completed', result: 'Na: 140, K: 4.1', price: 450, technicianName: 'Steve Rogers', referenceRange: 'Na: 135-145, K: 3.5-5.0' },
  { id: 'LT019', branchId: 'BR001', patientId: 'P019', patientName: 'Patient 19', testName: 'Amylase', date: '2023-11-04', status: 'Pending', price: 600 },
  { id: 'LT020', branchId: 'BR001', patientId: 'P020', patientName: 'Patient 20', testName: 'Lipase', date: '2023-11-04', status: 'Processing', price: 650 },
  { id: 'LT021', branchId: 'BR001', patientId: 'P021', patientName: 'Patient 21', testName: 'CRP', date: '2023-11-05', status: 'Completed', result: '1.2 mg/L', price: 300, technicianName: 'Natasha Romanoff', referenceRange: '< 3.0 mg/L' },
];
export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: 'C001', branchId: 'BR001', name: 'Rural Vision Drive 2023', location: 'North District', date: '2023-11-15', status: 'Planned', targetPatients: 500, screenedPatients: 0 },
];
export const MOCK_SURGERIES: Surgery[] = [
  { id: 'SUR001', branchId: 'BR001', patientId: 'P001', patientName: 'John Doe', procedure: 'Phacoemulsification (Left)', surgeon: 'Dr. B. Reynolds', theater: 'OT-1', date: '2023-10-28', time: '09:00 AM', status: 'Scheduled' },
];
const DEFAULT_SALARY: SalaryStructure = {
  basic: 25000,
  houseRent: 10000,
  medical: 5000,
  transport: 3000,
  otherAllowances: 2000,
  deductions: { pf: 2000, insurance: 1000, tax: 500 }
};

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 'EMP001', branchId: 'BR001', name: 'Dr. Emily Chen', role: 'Chief Ophthalmologist', department: 'Clinical', contact: '555-1001', shift: 'Morning', status: 'Active', joiningDate: '2022-01-10', salaryStructure: { ...DEFAULT_SALARY, basic: 85000 } },
  { id: 'EMP002', branchId: 'BR001', name: 'Sarah Jones', role: 'Senior Nurse', department: 'Clinical', contact: '555-1002', shift: 'Morning', status: 'Active', joiningDate: '2022-03-15', salaryStructure: { ...DEFAULT_SALARY, basic: 35000 } },
  { id: 'EMP003', branchId: 'BR001', name: 'Mike Ross', role: 'Pharmacist', department: 'Pharmacy', contact: '555-1003', shift: 'Evening', status: 'Active', joiningDate: '2023-05-20', salaryStructure: { ...DEFAULT_SALARY, basic: 30000 } },
  { id: 'EMP004', branchId: 'BR001', name: 'Jane Smith', role: 'Reception Manager', department: 'Front Office', contact: '555-1004', shift: 'Morning', status: 'Active', joiningDate: '2023-02-01', salaryStructure: { ...DEFAULT_SALARY, basic: 28000 } },
  { id: 'EMP005', branchId: 'BR001', name: 'Rahim Ahmed', role: 'Accountant', department: 'Finance', contact: '01711-222333', shift: 'Morning', status: 'Active', joiningDate: '2021-11-10', salaryStructure: { ...DEFAULT_SALARY, basic: 40000 } },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'ATT001', employeeId: 'EMP001', employeeName: 'Dr. Emily Chen', date: '2026-02-25', checkIn: '08:55 AM', checkOut: '03:15 PM', status: 'Present', machineId: 'ZKT-01', location: 'Main Entrance' },
  { id: 'ATT002', employeeId: 'EMP002', employeeName: 'Sarah Jones', date: '2026-02-25', checkIn: '09:05 AM', checkOut: '03:30 PM', status: 'Late', machineId: 'ZKT-01', location: 'Main Entrance' },
  { id: 'ATT003', employeeId: 'EMP004', employeeName: 'Jane Smith', date: '2026-02-25', checkIn: '08:45 AM', checkOut: '04:00 PM', status: 'Present', machineId: 'ZKT-02', location: 'Staff Entry' },
];

export const MOCK_LEAVES: LeaveRequest[] = [
  { id: 'LV001', employeeId: 'EMP003', employeeName: 'Mike Ross', type: 'Casual', startDate: '2026-02-24', endDate: '2026-02-26', reason: 'Family Emergency', status: 'Approved', appliedDate: '2026-02-20' },
  { id: 'LV002', employeeId: 'EMP002', employeeName: 'Sarah Jones', type: 'Sick', startDate: '2026-03-01', endDate: '2026-03-03', reason: 'Medical Checkup', status: 'Pending', appliedDate: '2026-02-24' },
];

export const MOCK_BIOMETRIC: BiometricMachine[] = [
  { id: 'ZKT-01', name: 'Main Gate ZKT', ip: '192.168.1.201', location: 'Main Entrance', status: 'Online' },
  { id: 'ZKT-02', name: 'Back Gate ZKT', ip: '192.168.1.202', location: 'Staff Entry', status: 'Online' },
  { id: 'HID-01', name: 'OT Restricted Access', ip: '192.168.1.205', location: 'OT Floor', status: 'Online' },
];

export const MOCK_PAYROLL: PayrollRecord[] = [
  { id: 'PAY001', employeeId: 'EMP001', employeeName: 'Dr. Emily Chen', month: '2026-01', year: 2026, basicPaid: 85000, allowancesPaid: 20000, deductionsTotal: 3500, netSalary: 101500, paymentStatus: 'Paid', paymentDate: '2026-02-01' },
  { id: 'PAY002', employeeId: 'EMP005', employeeName: 'Rahim Ahmed', month: '2026-01', year: 2026, basicPaid: 40000, allowancesPaid: 15000, deductionsTotal: 2500, netSalary: 52500, paymentStatus: 'Paid', paymentDate: '2026-02-02' },
];
export const MOCK_AMBULANCES: Ambulance[] = [
  { id: 'AMB001', branchId: 'BR001', vehicleNumber: 'KA-01-AB-1234', driverName: 'Rajesh Kumar', contact: '555-2001', status: 'Available', location: 'Hospital Base' },
];
export const MOCK_FINANCE: FinanceRecord[] = [];
export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 'SUP001', name: 'PharmaCorp Inc', contactPerson: 'Mr. Anderson', email: 'sales@pharmacorp.com', phone: '555-9001', itemsSupplied: ['Eye Drops'] },
];
export const MOCK_INVOICES: Invoice[] = [];

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'COMP001',
    name: 'Visionary Healthcare Group',
    address: '123 Enterprise Way, Dhaka',
    contact: '+880 1711 000000',
    email: 'corp@visionary.com',
    status: 'Active',
    createdAt: new Date().toISOString()
  }
];

export const MOCK_BRANCHES: Branch[] = [
  {
    id: 'BR001',
    companyId: 'COMP001',
    name: 'Main Campus - Dhaka',
    code: 'MC-DHK',
    location: 'Dhaka',
    address: '123 Healthcare Plaza, Dhaka',
    contact: '+880 1234 567890',
    email: 'main@visionary.com',
    status: 'Active',
    createdAt: new Date().toISOString(),
    settings: {
      currency: 'BDT',
      timezone: 'UTC+6',
      dateFormat: 'DD/MM/YYYY'
    }
  },
  {
    id: 'BR002',
    companyId: 'COMP001',
    name: 'North Wing - Chittagong',
    code: 'NW-CTG',
    location: 'Chittagong',
    address: '456 Coastal St, Chittagong',
    contact: '+880 1234 567891',
    email: 'north@visionary.com',
    status: 'Active',
    createdAt: new Date().toISOString()
  },
  {
    id: 'BR003',
    companyId: 'COMP001',
    name: 'South Center - Sylhet',
    code: 'SC-SYL',
    location: 'Sylhet',
    address: '789 Highlands Rd, Sylhet',
    contact: '+880 1234 567892',
    email: 'south@visionary.com',
    status: 'Active',
    createdAt: new Date().toISOString()
  }
];

// Populate some mock prescriptions
export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX-772101',
    branchId: 'BR001',
    patientId: 'P001',
    patientName: 'John Doe',
    patientAge: 45,
    patientGender: 'Male',
    doctorName: 'Dr. Emily Chen',
    date: '2023-10-25',
    diagnosis: 'Cataract (Left Eye), Grade II',
    medicines: [
      { name: 'Moxifloxacin Eye Drops', dosage: '1 drop', duration: '7 days', instruction: '4 times a day (QID)' },
      { name: 'Prednisolone Drops', dosage: '1 drop', duration: '14 days', instruction: 'Tapering dose' }
    ],
    notes: 'Advised Phacoemulsification surgery for Left Eye. Pre-op blood tests requested.',
    vitals: { bp: '130/85', pulse: '76', temp: '98.4', weight: '72' },
    vision: { re: '6/6', le: '6/18' }
  },
  {
    id: 'RX-889022',
    branchId: 'BR001',
    patientId: 'P005',
    patientName: 'Sarah Jenkins',
    patientAge: 32,
    patientGender: 'Female',
    doctorName: 'Dr. A. Sharma',
    date: '2023-10-26',
    diagnosis: 'Allergic Conjunctivitis',
    medicines: [
      { name: 'Olopatadine 0.1%', dosage: '1 drop', duration: '10 days', instruction: 'Twice daily' },
      { name: 'Carboxymethylcellulose', dosage: '1 drop', duration: '1 month', instruction: 'As needed for dryness' }
    ],
    notes: 'Avoid dust and direct sunlight. Cold compresses advised.',
    vitals: { bp: '120/80', pulse: '72', temp: '98.6', weight: '60' },
    vision: { re: '6/6', le: '6/6' }
  }
];

// --- Categorized Menu Structure ---
export const MENU_GROUPS = [
  {
    group: "Main",
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    ]
  },
  {
    group: "Front Office",
    items: [
      { name: 'Patient List', icon: Users, path: '/patients' },
      { name: 'Patient Registration', icon: UserPlus, path: '/registration' },
      { name: 'Appointments', icon: Calendar, path: '/appointments' },
    ]
  },
  {
    group: "Clinical Services",
    items: [
      { name: 'OPD Queue', icon: Stethoscope, path: '/opd' },
      { name: 'EMR (Medical Records)', icon: ClipboardList, path: '/emr' },
      { name: 'E-Prescription', icon: FilePlus, path: '/e-prescription' },
      { name: 'IPD & Bed Mgmt', icon: BedIcon, path: '/ipd' },
      { name: 'OT & Surgeries', icon: Scissors, path: '/ot' },
      { name: 'Lab & Diagnostics', icon: TestTube, path: '/lab' },
    ]
  },
  {
    group: "Commercial & Retail",
    items: [
      { name: 'Billing & POS', icon: Receipt, path: '/billing' },
      { name: 'Pharmacy & Optical', icon: Pill, path: '/pharmacy' },
      { name: 'Financial Ledger', icon: DollarSign, path: '/finance' },
    ]
  },
  {
    group: "Management",
    items: [
      { name: 'HR & Staff', icon: Briefcase, path: '/hr' },
      { name: 'Organization & Branches', icon: Landmark, path: '/branches' },
      { name: 'Outreach Camps', icon: Users, path: '/campaigns' },
      { name: 'Ambulance Fleet', icon: AmbulanceIcon, path: '/ambulance' },
      { name: 'Database Management', icon: Database, path: '/database' },
      { name: 'Super Control Center', icon: ShieldCheck, path: '/super-control' },
      { name: 'Legacy Migration Bridge', icon: RefreshCw, path: '/migration' },
    ]
  },
  {
    group: "Analysis",
    items: [
      { name: 'Reports & Analytics', icon: FileText, path: '/reports' },
      { name: 'User Manual', icon: BookOpen, path: '/manual' },
      { name: 'System Settings', icon: ShieldCheck, path: '/settings' },
    ]
  }
];

// Feature-level permissions that aren't menu items
export const FEATURE_PERMISSIONS = [
  { name: 'AI Clinical Insights', icon: Sparkles },
  { name: 'Revenue Statistics', icon: DollarSign },
  { name: 'Medical Drawing Tool', icon: Eye },
  { name: 'Bulk Data Export', icon: Download }
];

export const MENU_ITEMS = MENU_GROUPS.flatMap(g => g.items);
export const ALL_PERMISSION_ENTITIES = [...MENU_ITEMS, ...FEATURE_PERMISSIONS];

const createAdminPermissions = (): ModulePermissions => {
  const p: ModulePermissions = {};
  ALL_PERMISSION_ENTITIES.forEach(i => p[i.name] = { ...FULL_ACTIONS });
  return p;
};

export const INITIAL_ROLE_PERMISSIONS: Record<string, ModulePermissions> = {
  [UserRole.ADMIN]: createAdminPermissions(),
  [UserRole.SUPER_ADMIN]: createAdminPermissions(),
  [UserRole.DOCTOR]: {
    'Dashboard': FULL_ACTIONS,
    'Patient List': READ_ONLY,
    'OPD Queue': FULL_ACTIONS,
    'EMR (Medical Records)': FULL_ACTIONS,
    'E-Prescription': FULL_ACTIONS,
    'OT & Surgeries': { ...DEFAULT_ACTIONS, edit: true },
    'Lab & Diagnostics': READ_ONLY,
    'AI Clinical Insights': FULL_ACTIONS,
    'Medical Drawing Tool': FULL_ACTIONS,
    'User Manual': READ_ONLY
  },
  [UserRole.NURSE]: {
    'Dashboard': READ_ONLY,
    'Patient List': READ_ONLY,
    'OPD Queue': { ...READ_ONLY, edit: true },
    'EMR (Medical Records)': { ...READ_ONLY, edit: true },
    'IPD & Bed Mgmt': { ...DEFAULT_ACTIONS, edit: true },
    'User Manual': READ_ONLY
  },
  [UserRole.PHARMACIST]: {
    'Dashboard': READ_ONLY,
    'Pharmacy & Optical': FULL_ACTIONS,
    'Billing & POS': { ...DEFAULT_ACTIONS, add: true },
    'User Manual': READ_ONLY
  },
  [UserRole.RECEPTIONIST]: {
    'Dashboard': READ_ONLY,
    'Patient List': READ_ONLY,
    'Patient Registration': FULL_ACTIONS,
    'Appointments': FULL_ACTIONS,
    'Billing & POS': { ...DEFAULT_ACTIONS, add: true, view: true },
    'User Manual': READ_ONLY
  }
};
