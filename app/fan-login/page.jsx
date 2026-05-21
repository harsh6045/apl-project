"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { Smartphone, Mail, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Spinner } from "@/components/ui/spinner"

export default function FanLoginPage() {
  const [loginMethod, setLoginMethod] = useState("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validatePhone = (value) => {
    const phoneRegex = /^[6-9]\d{9}$/
    if (!value) return "Phone number is required"
    if (!phoneRegex.test(value)) return "Enter a valid 10-digit mobile number"
    return null
  }

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) return "Email is required"
    if (!emailRegex.test(value)) return "Enter a valid email address"
    return null
  }

  const validatePassword = (value) => {
    if (!value) return "Password is required"
    if (value.length < 6) return "Password must be at least 6 characters"
    return null
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    const phoneError = validatePhone(phone)
    if (phoneError) {
      setErrors({ phone: phoneError })
      return
    }
    setErrors({})
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setOtpSent(true)
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      setErrors({ otp: "Enter complete 6-digit OTP" })
      return
    }
    setErrors({})
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const handleEmailLogin = async (e) => {
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
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
    setPhone(value)
    if (errors.phone) {
      const error = validatePhone(value)
      setErrors((prev) => ({ ...prev, phone: error }))
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (errors.email) {
      const error = validateEmail(e.target.value)
      setErrors((prev) => ({ ...prev, email: error }))
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (errors.password) {
      const error = validatePassword(e.target.value)
      setErrors((prev) => ({ ...prev, password: error }))
    }
  }

  return (
    <div className="min-h-dvh bg-[#fafaf9] text-[#1c1917] flex flex-col">
      <SiteNav currentPath="/fan-login" />
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-center border-b border-[#e7e5e4]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1c1917] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Stadium<span className="text-[#d97706]">Ops</span>
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center px-6 py-10">
        <div className="w-full max-w-sm mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              Welcome to the match
            </h1>
            <p className="text-[#78716c] text-base">
              Sign in to access your tickets, concessions, and stadium services
            </p>
          </div>

          {/* Login Form */}
          <Tabs
            value={loginMethod}
            onValueChange={(value) => {
              setLoginMethod(value)
              setErrors({})
              setOtpSent(false)
            }}
            className="w-full"
          >
            <TabsList className="w-full bg-[#f5f5f4] h-12 p-1 rounded-xl mb-6">
              <TabsTrigger
                value="phone"
                className="flex-1 h-10 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1c1917] text-[#78716c]"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Phone
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="flex-1 h-10 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1c1917] text-[#78716c]"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </TabsTrigger>
            </TabsList>

            {/* Phone + OTP Login */}
            <TabsContent value="phone" className="mt-0">
              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <FieldGroup>
                    <Field data-invalid={!!errors.phone}>
                      <FieldLabel
                        htmlFor="phone"
                        className="text-sm font-medium text-[#44403c]"
                      >
                        Mobile Number
                      </FieldLabel>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78716c] text-base font-medium">
                          +91
                        </span>
                        <Input
                          id="phone"
                          type="tel"
                          inputMode="numeric"
                          placeholder="98765 43210"
                          value={phone}
                          onChange={handlePhoneChange}
                          className="h-14 pl-14 text-lg bg-white border-[#e7e5e4] focus-visible:border-[#d97706] focus-visible:ring-[#d97706]/20 placeholder:text-[#a8a29e]"
                          aria-invalid={!!errors.phone}
                        />
                      </div>
                      {errors.phone && (
                        <FieldError className="flex items-center gap-1.5 text-[#dc2626]">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.phone}
                        </FieldError>
                      )}
                    </Field>
                  </FieldGroup>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 mt-6 bg-[#d97706] hover:bg-[#b45309] text-white text-base font-semibold rounded-xl shadow-lg shadow-[#d97706]/20"
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="mr-2" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <FieldGroup>
                    <Field data-invalid={!!errors.otp}>
                      <FieldLabel className="text-sm font-medium text-[#44403c]">
                        Enter OTP
                      </FieldLabel>
                      <p className="text-sm text-[#78716c] -mt-1 mb-3">
                        Sent to +91 {phone.slice(0, 5)} {phone.slice(5)}
                      </p>
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                        className="justify-center gap-2"
                      >
                        <InputOTPGroup className="gap-2">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="w-12 h-14 text-xl font-semibold rounded-lg border-[#e7e5e4] bg-white data-[active=true]:border-[#d97706] data-[active=true]:ring-[#d97706]/20"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                      {errors.otp && (
                        <FieldError className="flex items-center gap-1.5 text-[#dc2626] mt-2">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.otp}
                        </FieldError>
                      )}
                    </Field>
                  </FieldGroup>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 mt-6 bg-[#d97706] hover:bg-[#b45309] text-white text-base font-semibold rounded-xl shadow-lg shadow-[#d97706]/20"
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="mr-2" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Continue
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full mt-4 text-sm text-[#78716c] hover:text-[#44403c] transition-colors"
                  >
                    Change phone number
                  </button>
                </form>
              )}
            </TabsContent>

            {/* Email + Password Login */}
            <TabsContent value="email" className="mt-0">
              <form onSubmit={handleEmailLogin}>
                <FieldGroup>
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel
                      htmlFor="email"
                      className="text-sm font-medium text-[#44403c]"
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      className="h-14 text-base bg-white border-[#e7e5e4] focus-visible:border-[#d97706] focus-visible:ring-[#d97706]/20 placeholder:text-[#a8a29e]"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <FieldError className="flex items-center gap-1.5 text-[#dc2626]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </FieldError>
                    )}
                  </Field>

                  <Field data-invalid={!!errors.password}>
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm font-medium text-[#44403c]"
                    >
                      Password
                    </FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="h-14 text-base bg-white border-[#e7e5e4] focus-visible:border-[#d97706] focus-visible:ring-[#d97706]/20 placeholder:text-[#a8a29e]"
                      aria-invalid={!!errors.password}
                    />
                    {errors.password && (
                      <FieldError className="flex items-center gap-1.5 text-[#dc2626]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.password}
                      </FieldError>
                    )}
                  </Field>
                </FieldGroup>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="text-sm text-[#d97706] hover:text-[#b45309] font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 mt-6 bg-[#d97706] hover:bg-[#b45309] text-white text-base font-semibold rounded-xl shadow-lg shadow-[#d97706]/20"
                >
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Registration Link */}
          <div className="mt-8 text-center">
            <p className="text-[#78716c]">
              New here?{" "}
              <button className="text-[#d97706] hover:text-[#b45309] font-semibold transition-colors">
                Create an account
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center border-t border-[#e7e5e4]">
        <p className="text-xs text-[#a8a29e]">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </footer>
    </div>
  )
}
