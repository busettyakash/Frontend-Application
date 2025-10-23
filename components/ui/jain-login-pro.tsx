"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react"
import { CarouselSlides } from "./carousel-slides"

interface JainLoginProProps {
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void
  onResetPassword?: () => void
  onCreateAccount?: () => void
}

export const JainLoginPro: React.FC<JainLoginProProps> = ({ onSignIn, onResetPassword, onCreateAccount }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      onSignIn?.(event)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Left Column: Login Form */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white font-serif">J</span>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Jain University</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Student Portal</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-slate-600 dark:text-slate-400">Sign in to access your academic dashboard</p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="animate-fade-in-delay-1">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 group-focus-within:border-blue-500 dark:group-focus-within:border-blue-400">
                  <Mail className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@jainuniversity.ac.in"
                    required
                    className="flex-1 bg-transparent text-sm focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="animate-fade-in-delay-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 group-focus-within:border-blue-500 dark:group-focus-within:border-blue-400">
                  <Lock className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="flex-1 bg-transparent text-sm focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="animate-fade-in-delay-3 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Keep me signed in
                </span>
              </label>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  onResetPassword?.()
                }}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="animate-fade-in-delay-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 py-3 font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:shadow-md flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="animate-fade-in-delay-5 relative flex items-center justify-center my-8">
            <span className="w-full border-t border-slate-200 dark:border-slate-700"></span>
            <span className="px-4 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 absolute">
              New here?
            </span>
          </div>

          {/* Create Account */}
          <p className="animate-fade-in-delay-6 text-center text-sm text-slate-600 dark:text-slate-400">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                onCreateAccount?.()
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
            >
              Request Student Account
            </button>
          </p>

          {/* Footer */}
          <div className="animate-fade-in-delay-7 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400">
            <p>
              By signing in, you agree to our{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Right Column: Animated Carousel */}
      <section className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
        <CarouselSlides />
      </section>
    </div>
  )
}
