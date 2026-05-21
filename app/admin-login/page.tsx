"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Spinner } from "@/components/ui/spinner"

type LoginStep = "credentials" | "two-factor"

interface FormErrors {
  email?: string | null
  password?: string | null
  otp?: string | null
}

export default function AdminLoginPage() {
  const [step, setStep] = useState<LoginStep>("credentials")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateEmail = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) return "Email is required"
    if (!emailRegex.test(value)) return "Enter a valid email address"
    return null
  }

  const validatePassword = (value: string): string | null => {
    if (!value) return "Password is required"
    if (value.length < 8) return "Password must be at least 8 characters"
    return null
  }

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError })
      return
    }

    setErrors({})
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep("two-factor")
  }

  const handleTwoFactorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      setErrors({ otp: "Enter complete 6-digit code" })
      return
    }

    setErrors({})
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errors.email) {
      const error = validateEmail(e.target.value)
      setErrors((prev) => ({ ...prev, email: error }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (errors.password) {
      const error = validatePassword(e.target.value)
      setErrors((prev) => ({ ...prev, password: error }))
    }
  }

  return (
    <div className="min-h-dvh bg-[#0f172a] text-[#f1f5f9] flex flex-col">
      <SiteNav currentPath="/admin-login" variant="dark" />
      <div className="flex flex-1 min-h-0">
      {/* Left Panel - Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3b82f6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Stadium<span className="text-[#3b82f6]">Ops</span>
            </span>
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3 text-[#3b82f6]">
            <Shield className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Operations Control Center
            </span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight text-balance">
            Command your stadium with precision
          </h1>
          <p className="text-lg text-[#94a3b8] max-w-md leading-relaxed">
            Real-time crowd analytics, staff coordination, and emergency response
            systems at your fingertips.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-sm text-[#64748b]">Active Venues</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">99.9%</div>
            <div className="text-sm text-[#64748b]">System Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-sm text-[#64748b]">Support Team</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden px-6 py-5 flex items-center justify-between border-b border-[#1e293b]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3b82f6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Stadium<span className="text-[#3b82f6]">Ops</span>
            </span>
          </Link>
        </header>

        {/* Form Container */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Admin Portal Badge */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] border border-[#334155] rounded-full">
                <Shield className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider">
                  Admin Portal
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                {step === "credentials" ? "Sign in to your account" : "Two-Factor Authentication"}
              </h2>
              <p className="text-[#64748b]">
                {step === "credentials"
                  ? "Access the operations dashboard"
                  : "Enter the verification code from your authenticator app"}
              </p>
            </div>

            {/* Credentials Form */}
            {step === "credentials" && (
              <form onSubmit={handleCredentialsSubmit} className="space-y-6">
                <FieldGroup className="space-y-5">
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel
                      htmlFor="admin-email"
                      className="text-sm font-medium text-[#94a3b8]"
                    >
                      Email Address
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@stadiumops.com"
                        value={email}
                        onChange={handleEmailChange}
                        className="h-12 pl-12 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#475569] focus-visible:border-[#3b82f6] focus-visible:ring-[#3b82f6]/20"
                        aria-invalid={!!errors.email}
                      />
                    </div>
                    {errors.email && (
                      <FieldError className="flex items-center gap-1.5 text-[#f87171]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </FieldError>
                    )}
                  </Field>

                  <Field data-invalid={!!errors.password}>
                    <FieldLabel
                      htmlFor="admin-password"
                      className="text-sm font-medium text-[#94a3b8]"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="h-12 pl-12 pr-12 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#475569] focus-visible:border-[#3b82f6] focus-visible:ring-[#3b82f6]/20"
                        aria-invalid={!!errors.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94a3b8] transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <FieldError className="flex items-center gap-1.5 text-[#f87171]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.password}
                      </FieldError>
                    )}
                  </Field>
                </FieldGroup>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-[#3b82f6] hover:text-[#60a5fa] font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-lg"
                >
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" />
                      Verifying credentials...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Two-Factor Form */}
            {step === "two-factor" && (
              <form onSubmit={handleTwoFactorSubmit} className="space-y-6">
                <FieldGroup>
                  <Field data-invalid={!!errors.otp} className="flex flex-col items-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      className="justify-center"
                    >
                      <InputOTPGroup className="gap-3">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-12 h-14 text-xl font-mono font-semibold rounded-lg border-[#334155] bg-[#1e293b] text-white data-[active=true]:border-[#3b82f6] data-[active=true]:ring-[#3b82f6]/20"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    {errors.otp && (
                      <FieldError className="flex items-center gap-1.5 text-[#f87171] mt-3">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.otp}
                      </FieldError>
                    )}
                  </Field>
                </FieldGroup>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-lg"
                >
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Sign In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <div className="text-center space-y-3">
                  <button
                    type="button"
                    className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors"
                  >
                    {"Didn't receive a code? Resend"}
                  </button>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setStep("credentials")
                        setOtp("")
                        setErrors({})
                      }}
                      className="text-sm text-[#3b82f6] hover:text-[#60a5fa] font-medium transition-colors"
                    >
                      Back to login
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Security Notice */}
            <div className="mt-10 p-4 bg-[#1e293b]/50 border border-[#334155] rounded-lg">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#3b82f6] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#94a3b8]">
                    Secure Connection
                  </p>
                  <p className="text-xs text-[#64748b] mt-1">
                    This session is encrypted with TLS 1.3. All login attempts are
                    logged and monitored for security purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-[#1e293b]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#475569]">
            <p>&copy; {new Date().getFullYear()} StadiumOps. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button className="hover:text-[#94a3b8] transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-[#94a3b8] transition-colors">
                Terms of Service
              </button>
              <button className="hover:text-[#94a3b8] transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </footer>
      </div>
      </div>
    </div>
  )
}
