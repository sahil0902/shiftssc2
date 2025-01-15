
// Importing the Link component from Inertia.js for navigation
import { Link } from "@inertiajs/react"

// Footer component definition
export function Footer() {
  return (
    // Main footer element with background and border
    <footer className="bg-background border-t">
      <div className="container py-8 md:py-12">
        {/* Grid layout for footer sections */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Us section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              ShiftsSync is your comprehensive solution for employee shift management,
              making scheduling and coordination effortless.
            </p>
            {/* Link to the About Us page */}
            <Link
              href={route('about')}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Learn More →
            </Link>
          </div>
          {/* Quick Links section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                {/* Link to the Dashboard */}
                <Link
                  href={route('dashboard')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                {/* Link to the Shifts page */}
                <Link
                  href={route('shifts.index')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Shifts
                </Link>
              </li>
              <li>
                {/* Link to the About Us page */}
                <Link
                  href={route('about')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Support section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                {/* Link to the Help Center */}
                <Link
                  href={route('help')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Help Center
                </Link>
              </li>
              <li>
                {/* Link to the Contact Us page */}
                <Link
                  href={route('contact')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                {/* Link to the FAQ page */}
                <Link
                  href={route('faq')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          {/* Legal section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                {/* Link to the Privacy Policy */}
                <Link
                  href={route('privacy')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                {/* Link to the Terms of Service */}
                <Link
                  href={route('terms')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer copyright section */}
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShiftsSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 