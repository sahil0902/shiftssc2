import { Link } from "@inertiajs/react"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              ShiftsSync is your comprehensive solution for employee shift management,
              making scheduling and coordination effortless.
            </p>
            <Link
              href={route('about')}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Learn More →
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={route('dashboard')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={route('shifts.index')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Shifts
                </Link>
              </li>
              <li>
                <Link
                  href={route('about')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={route('help')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href={route('contact')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href={route('faq')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={route('privacy')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
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
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShiftsSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 