"use client"

import type React from "react"
import { JainLoginPro } from "@/components/ui/jain-login-pro"

export default function Home() {
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log("Sign In submitted:", data)
    alert(
      `Welcome! Sign In Submitted!\n\nEmail: ${data.email}\nRemember Me: ${data.rememberMe ? "Yes" : "No"}\n\nCheck the browser console for full details.`,
    )
  }

  const handleResetPassword = () => {
    alert("Password reset link has been sent to your email address.")
  }

  const handleCreateAccount = () => {
    alert("Please contact the admissions office to request a student account.")
  }

  return (
    <JainLoginPro onSignIn={handleSignIn} onResetPassword={handleResetPassword} onCreateAccount={handleCreateAccount} />
  )
}
