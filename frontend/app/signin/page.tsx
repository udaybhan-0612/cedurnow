"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CheckCircle, AlertCircle, Mail, Lock } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Check if user came from successful signup
    if (searchParams.get("from") === "signup") {
      const signupSuccess = localStorage.getItem("cedur_signup_success")
      if (signupSuccess) {
        setShowSuccessMessage(true)
        localStorage.removeItem("cedur_signup_success")

        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 5000)
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if user exists in localStorage (from signup)
      const storedUser = localStorage.getItem("cedur_user")

      if (storedUser) {
        const userData = JSON.parse(storedUser)
        if (userData.email === formData.email) {
          // Successful login
          localStorage.setItem(
            "cedur_session",
            JSON.stringify({
              user: userData,
              loginTime: new Date().toISOString(),
            }),
          )

          router.push("/dashboard")
          return
        }
      }

      // Demo login - allow any email/password combination
      const demoUser = {
        id: "demo-" + Date.now(),
        name: formData.email.split("@")[0],
        email: formData.email,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem(
        "cedur_session",
        JSON.stringify({
          user: demoUser,
          loginTime: new Date().toISOString(),
        }),
      )

      router.push("/dashboard")
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gradient">Welcome Back</CardTitle>
          <p className="text-muted-foreground">Sign in to your Cedur account</p>
        </CardHeader>
        <CardContent>
          {showSuccessMessage && (
            <Alert className="mb-4 border-green-200 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600 dark:text-green-400">
                Account created successfully! You can now sign in.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-4 border-red-200 dark:border-red-800">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-600 dark:text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="pl-10"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="#" className="text-purple-600 hover:text-purple-700">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
              Demo: Use any email and password to sign in
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
