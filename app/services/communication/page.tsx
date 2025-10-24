"use client"

import { ArrowLeft, Bell, Mail, Megaphone, MessageCircle, Newspaper, Radio } from "lucide-react"
import Link from "next/link"

export default function CommunicationServicesPage() {
  const features = [
    { icon: Bell, title: "Notifications", description: "Receive important university announcements" },
    { icon: Mail, title: "Email Services", description: "Official university email account" },
    { icon: Megaphone, title: "Announcements", description: "Latest news and updates from university" },
    { icon: MessageCircle, title: "Messaging", description: "Direct messaging with faculty and staff" },
    { icon: Newspaper, title: "Newsletter", description: "Subscribe to university newsletters" },
    { icon: Radio, title: "Campus Radio", description: "Listen to campus radio broadcasts" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold font-sans mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-sans">Communication Services</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 font-sans">
            Announcements, notifications, and messaging
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-sans">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-sans">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
