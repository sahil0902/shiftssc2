import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CalendarClock } from "lucide-react"
import { Link } from "@inertiajs/react"

const getNavigationByRole = (user) => {
  console.log('Current user:', user);
  console.log('User role:', user?.role);

  if (!user) {
    console.log('No user found, returning empty navigation');
    return [];
  }

  // Base navigation for employees
  const employeeNavigation = [
    { name: "Dashboard", href: route('dashboard') },
    { name: "Shifts", href: route('shifts.index') },
  ];

  // Additional navigation items for admin only
  if (user.role === 'admin') {
    console.log('Admin user detected, returning admin navigation');
    return [
      ...employeeNavigation,
      { name: "Departments", href: route('departments.index') },
      { name: "Employees", href: route('employees.index') },
    ];
  }

  console.log('Employee user detected, returning employee navigation');
  return employeeNavigation;
};

export default function Navbar({ user }) {
  console.log('User prop in Navbar:', user);
  const navigation = getNavigationByRole(user);
  console.log('Generated navigation:', navigation);

  // Ensure role-based access
  const isAdmin = user?.role === 'admin';
  console.log('Is admin?', isAdmin);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-6 w-6" />
          <span className="text-xl font-bold">ShiftMaster</span>
        </div>

        {/* Desktop Navigation - Only show if user is logged in */}
        {user && (
          <div className="hidden md:flex md:gap-x-8">
            {navigation.map(item => {
              // Only show admin links if user is admin
              if ((item.name === "Departments" || item.name === "Employees") && !isAdmin) {
                return null;
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}

        {/* Mobile Navigation - Only show if user is logged in */}
        {user && (
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  {navigation.map(item => {
                    // Only show admin links if user is admin
                    if ((item.name === "Departments" || item.name === "Employees") && !isAdmin) {
                      return null;
                    }
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium transition-colors hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}

        {/* User Menu */}
        {user ? (
          <div className="hidden md:flex md:items-center md:gap-4">
            <span className="text-sm text-muted-foreground">
              {user.name}
            </span>
            <Link href={route('profile.edit')} className="text-sm font-medium transition-colors hover:text-primary">
              Profile
            </Link>
            <Link
              href={route('logout')}
              method="post"
              as="button"
              className="text-sm font-medium text-destructive transition-colors hover:text-destructive/80"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex md:items-center md:gap-4">
            <Link
              href={route('login')}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Login
            </Link>
            <Link
              href={route('register')}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
} 