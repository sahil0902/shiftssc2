import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section className="bg-primary">
      <div className="container py-24 sm:py-32">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Transform Your Workforce Management?
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/90">
            Join thousands of businesses that trust ShiftMaster for their
            scheduling needs.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
