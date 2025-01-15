# ShiftSync - Page Functionality Documentation

## Table of Contents
1. [Authentication Pages](#authentication-pages)
2. [Dashboard](#dashboard)
3. [Shifts Management](#shifts-management)
4. [Employee Management](#employee-management)
5. [Department Management](#department-management)
6. [Data Flow & Connections](#data-flow--connections)

## Authentication Pages

### Login Page (`/login`)
- **Component**: `resources/js/Pages/Auth/Login.jsx`
- **Controller**: `Auth\AuthenticatedSessionController`
- **Functionality**:
  ```javascript
  // Form submission
  const { data, setData, post, processing, errors } = useForm({
      email: '',
      password: '',
      remember: false,
  });

  const submit = (e) => {
      e.preventDefault();
      post(route('login'));
  };
  ```
- **Data Flow**:
  1. User enters credentials
  2. Form submits to `/login` endpoint
  3. Controller validates credentials
  4. On success: Redirects to Dashboard
  5. On failure: Returns with errors

### Registration Page (`/register`)
- **Component**: `resources/js/Pages/Auth/Register.jsx`
- **Controller**: `Auth\RegisteredUserController`
- **Functionality**:
  ```javascript
  const { data, setData, post, processing, errors } = useForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
  });
  ```
- **Data Flow**:
  1. User fills registration form
  2. Data validated on frontend
  3. Submitted to backend
  4. User created and assigned role
  5. Redirected to Dashboard

## Dashboard

### Dashboard Page (`/dashboard`)
- **Component**: `resources/js/Pages/Dashboard.jsx`
- **Controller**: `DashboardController`
- **Data Loading**:
  ```php
  // DashboardController.php
  public function index()
  {
      $stats = [
          'total_employees' => User::role('employee')->count(),
          'open_shifts' => Shift::where('status', 'open')->count(),
          'total_departments' => Department::count(),
          'upcoming_shifts' => Shift::where('start_time', '>', now())
              ->where('start_time', '<', now()->addDay())
              ->count(),
          'recent_shifts' => Shift::with(['department'])
              ->latest()
              ->take(5)
              ->get(),
      ];

      return Inertia::render('Dashboard', [
          'stats' => $stats,
      ]);
  }
  ```
- **Component Structure**:
  ```javascript
  // Dashboard.jsx
  export default function Dashboard({ auth, stats }) {
      // Stats Cards
      const StatCard = ({ title, value, icon }) => (
          <Card>
              <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  {icon}
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
              </CardContent>
          </Card>
      );

      // Quick Actions
      const QuickActions = () => (
          <Card>
              <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                  <Link href={route('shifts.create')}>
                      <Button>Create Shift</Button>
                  </Link>
                  {/* More actions */}
              </CardContent>
          </Card>
      );
  }
  ```

## Shifts Management

### Shifts Index (`/shifts`)
- **Component**: `resources/js/Pages/Shifts/Index.jsx`
- **Controller**: `ShiftController@index`
- **Data Loading**:
  ```php
  // ShiftController.php
  public function index()
  {
      $shifts = Shift::with(['user', 'department'])
          ->latest()
          ->paginate(10);

      return Inertia::render('Shifts/Index', [
          'shifts' => $shifts,
      ]);
  }
  ```
- **DataTable Implementation**:
  ```javascript
  // Shifts/Index.jsx
  const columns = [
      {
          accessorKey: 'title',
          header: 'Title',
      },
      {
          accessorKey: 'department.name',
          header: 'Department',
      },
      {
          accessorKey: 'start_time',
          header: 'Start Time',
          cell: ({ row }) => format(new Date(row.original.start_time), 'PPp'),
      },
      // More columns
  ];

  return (
      <DataTable
          columns={columns}
          data={shifts}
          searchKey="shifts"
      />
  );
  ```

### Shift Create (`/shifts/create`)
- **Component**: `resources/js/Pages/Shifts/Create.jsx`
- **Form Handling**:
  ```javascript
  const { data, setData, post, processing, errors } = useForm({
      title: '',
      description: '',
      department_id: '',
      start_time: '',
      end_time: '',
      required_employees: 1,
  });

  const submit = (e) => {
      e.preventDefault();
      post(route('shifts.store'));
  };
  ```
- **Data Flow**:
  1. User fills form
  2. Frontend validation
  3. Data sent to backend
  4. Shift created
  5. Redirect to shifts index

### Shift Edit (`/shifts/{id}/edit`)
- **Component**: `resources/js/Pages/Shifts/Edit.jsx`
- **Data Loading & Updates**:
  ```javascript
  const { data, setData, put, processing, errors } = useForm({
      title: shift.title,
      description: shift.description,
      // ... other fields
  });

  const submit = (e) => {
      e.preventDefault();
      put(route('shifts.update', shift.id));
  };
  ```

## Employee Management

### Employees Index (`/employees`)
- **Component**: `resources/js/Pages/Employees/Index.jsx`
- **Controller**: `EmployeeController@index`
- **Data Loading**:
  ```php
  public function index()
  {
      return Inertia::render('Employees/Index', [
          'employees' => User::role('employee')
              ->with('department')
              ->latest()
              ->paginate(10),
      ]);
  }
  ```

### Employee Create (`/employees/create`)
- **Component**: `resources/js/Pages/Employees/Create.jsx`
- **Form Implementation**:
  ```javascript
  const { data, setData, post, processing, errors } = useForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      department_id: '',
  });

  // Form validation
  const validateForm = () => {
      if (!data.name || !data.email || !data.password) {
          return false;
      }
      return true;
  };

  // Submit handler
  const submit = (e) => {
      e.preventDefault();
      if (validateForm()) {
          post(route('employees.store'));
      }
  };
  ```

## Data Flow & Connections

### API Calls
1. **Axios Interceptors**:
   ```javascript
   // resources/js/lib/axios.js
   axios.interceptors.request.use((config) => {
       config.headers['X-CSRF-TOKEN'] = document.head
           .querySelector('meta[name="csrf-token"]')
           .content;
       return config;
   });
   ```

2. **Inertia Form Submissions**:
   ```javascript
   // Example form submission
   const { data, setData, post, processing } = useForm({
       // form fields
   });

   const submit = async (e) => {
       e.preventDefault();
       await post(route('route.name'), {
           preserveScroll: true,
           onSuccess: () => {
               // Handle success
           },
           onError: () => {
               // Handle error
           },
       });
   };
   ```

### State Management
1. **Local State**:
   ```javascript
   const [isLoading, setIsLoading] = useState(false);
   const [selectedItems, setSelectedItems] = useState([]);
   ```

2. **Form State**:
   ```javascript
   const { data, setData, errors } = useForm({
       // Initial form state
   });
   ```

### Component Communication
1. **Parent to Child**:
   ```javascript
   // Parent
   <DataTable
       data={tableData}
       onRowSelect={handleRowSelect}
       isLoading={isLoading}
   />

   // Child
   export function DataTable({ data, onRowSelect, isLoading }) {
       // Component logic
   }
   ```

2. **Child to Parent**:
   ```javascript
   // Child
   const handleClick = () => {
       onRowSelect(rowData);
   };

   // Parent
   const handleRowSelect = (data) => {
       setSelectedData(data);
   };
   ```

### Error Handling
1. **Form Errors**:
   ```javascript
   {errors.field && (
       <div className="text-red-500 text-sm mt-1">
           {errors.field}
       </div>
   )}
   ```

2. **API Errors**:
   ```javascript
   try {
       await post(route('route.name'));
   } catch (error) {
       if (error.response?.status === 422) {
           // Validation errors
       } else {
           // Other errors
       }
   }
   ```

### Event Handling
1. **Click Events**:
   ```javascript
   const handleClick = (e) => {
       e.preventDefault();
       // Handle click
   };

   <Button onClick={handleClick}>Action</Button>
   ```

2. **Form Events**:
   ```javascript
   const handleSubmit = async (e) => {
       e.preventDefault();
       // Handle form submission
   };

   <form onSubmit={handleSubmit}>
       // Form fields
   </form>
   ```

### Data Fetching Patterns
1. **Initial Load**:
   ```javascript
   // Controller
   public function index()
   {
       return Inertia::render('Component', [
           'initialData' => $this->getData(),
       ]);
   }

   // Component
   export default function Component({ initialData }) {
       const [data, setData] = useState(initialData);
   }
   ```

2. **Dynamic Loading**:
   ```javascript
   const fetchData = async () => {
       try {
           const response = await axios.get(route('api.data'));
           setData(response.data);
       } catch (error) {
           console.error('Error fetching data:', error);
       }
   };
   ```

### Page Transitions
1. **Loading States**:
   ```javascript
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
       const loadData = async () => {
           setIsLoading(true);
           try {
               // Fetch data
           } finally {
               setIsLoading(false);
           }
       };
       loadData();
   }, []);
   ```

2. **Progress Indicators**:
   ```javascript
   {isLoading ? (
       <LoadingSpinner />
   ) : (
       <PageContent data={data} />
   )}
   ``` 