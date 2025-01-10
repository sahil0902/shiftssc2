import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/FadeIn"

const features = [
  { icon: Calendar, title: "Easy Scheduling" },
  { icon: Users, title: "Team Management" },
  { icon: Clock, title: "Real-time Updates" }
]

export function Hero() {
  return (
    <div className="relative isolate pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </motion.div>

      <div className="container py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <FadeIn>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Simplify Your Workforce Management
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Effortlessly manage shifts, streamline scheduling, and boost
              productivity with our intuitive shift management platform.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="transition-all hover:scale-105">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="transition-all hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={0.6 + index * 0.2}>
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="rounded-2xl bg-primary/10 p-4"
                  >
                    <feature.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="mt-4 text-sm font-semibold">
                    {feature.title}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
