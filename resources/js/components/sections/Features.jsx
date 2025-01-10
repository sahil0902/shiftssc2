import {
    Calendar,
    Bell,
    UserCheck,
    BarChart3,
    Link as LinkIcon,
  } from "lucide-react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { motion } from "framer-motion";
  import { ScaleIn } from "@/components/animations/ScaleIn";
  
  const features = [
    {
      name: "Easy Shift Creation",
      description:
        "Create and assign shifts with just a few clicks. Our intuitive interface makes scheduling effortless.",
      icon: Calendar,
    },
    {
      name: "Real-Time Updates",
      description:
        "Stay informed with instant notifications about shift changes and updates. (Coming Soon)",
      icon: Bell,
    },
    {
      name: "Employee Availability",
      description:
        "Easily manage and track employee availability to create optimal schedules.",
      icon: UserCheck,
    },
    {
      name: "Reporting & Analytics",
      description:
        "Make data-driven decisions with comprehensive shift reports and analytics.",
      icon: BarChart3,
    },
    {
      name: "Integration",
      description:
        "Seamlessly integrate with your existing HR and payroll systems.",
      icon: LinkIcon,
    },
  ];
  