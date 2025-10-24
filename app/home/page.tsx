"use client"

import { useState } from "react"
import { LogOut, Menu, X, BookOpen, Users, Briefcase, MessageSquare, Zap, Microscope, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const services = [
  {
    id: "academic",
    title: "Academic Services",
    description: "Manage courses, grades, and academic records",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    href: "/services/academic",
  },
  {
    id: "administrative",
    title: "Administrative Services",
    description: "Handle admissions, registrations, and documentation",
    icon: Briefcase,
    color: "from-purple-500 to-purple-600",
    href: "/services/administrative",
  },
  {
    id: "student-support",
    title: "Student Support Services",
    description: "Counseling, mentoring, and student welfare",
    icon: Users,
    color: "from-green-500 to-green-600",
    href: "/services/student-support",
  },
  {
    id: "communication",
    title: "Communication Services",
    description: "Announcements, notifications, and messaging",
    icon: MessageSquare,
    color: "from-orange-500 to-orange-600",
    href: "/services/communication",
  },
  {
    id: "digital-learning",
    title: "Digital Learning & IT Services",
    description: "Online learning platforms and technical support",
    icon: Zap,
    color: "from-pink-500 to-pink-600",
    href: "/services/digital-learning",
  },
  {
    id: "research",
    title: "Research & Development Services",
    description: "Research opportunities and innovation programs",
    icon: Microscope,
    color: "from-indigo-500 to-indigo-600",
    href: "/services/research",
  },
  {
    id: "security",
    title: "Security & Compliance Services",
    description: "Data security and regulatory compliance",
    icon: Shield,
    color: "from-red-500 to-red-600",
    href: "/services/security",
  },
]

export default function HomePage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-lg font-bold text-white font-sans">J</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white font-sans">Jain University</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">Student Portal</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors font-sans font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors font-sans font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-sans">
            Welcome to Your Portal
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-sans">
            Access all university services and manage your academic journey in one place
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-full p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-sans">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-sans">{service.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold font-sans group-hover:gap-3 transition-all">
                    View Service
                    <span>→</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
