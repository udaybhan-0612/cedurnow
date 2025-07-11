"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { scrollToTop } from "@/utils/scroll-to-top"

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    employees: "",
    interest: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("http://127.0.0.1:8000/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit enquiry")
      }

      console.log("Enquiry submitted successfully:", result)
      setIsSubmitted(true)
      scrollToTop()

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          employees: "",
          interest: "",
          message: "",
        })
      }, 5000)
    } catch (error) {
      console.error("Error submitting enquiry:", error)
      setError(error instanceof Error ? error.message : "Failed to submit enquiry")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  if (isSubmitted) {
    return (
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-purple-50 dark:from-green-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto">
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                Thank You for Your Enquiry!
              </h3>
              <p className="text-green-600 dark:text-green-300 mb-4">
                We've received your message and saved it to our database. Our team will get back to you within 24 hours.
              </p>
              <p className="text-sm text-muted-foreground">
                Our HR experts are excited to help you streamline your business operations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Have Questions? Let's Talk!</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized advice from our HR experts. Fill out the form below and we'll reach out to discuss your
            specific needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-sm text-muted-foreground">For Help: 011-4345-1244</p>
                    <p className="text-sm text-muted-foreground">For Sales: +91-85959 21201</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-sm text-muted-foreground">info@cedurnow.com</p>
                    <p className="text-sm text-muted-foreground">24/7 response time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">🚀 Quick Response</h3>
                <p className="text-sm text-purple-100">
                  We typically respond to enquiries within 2 hours during business hours.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us Your Enquiry</CardTitle>
                <p className="text-muted-foreground">
                  Tell us about your HR challenges and we'll provide tailored solutions.
                </p>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        className="mt-1"
                        placeholder="Enter your full name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        className="mt-1"
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="mt-1"
                        placeholder="+91 98765 43210"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        required
                        className="mt-1"
                        placeholder="Your company name"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employees">Number of Employees</Label>
                      <Select onValueChange={(value) => handleChange("employees", value)} disabled={isSubmitting}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-25">11-25 employees</SelectItem>
                          <SelectItem value="26-50">26-50 employees</SelectItem>
                          <SelectItem value="51-100">51-100 employees</SelectItem>
                          <SelectItem value="101-500">101-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="interest">Primary Interest</Label>
                      <Select onValueChange={(value) => handleChange("interest", value)} disabled={isSubmitting}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="What interests you most?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="payroll">Payroll Management</SelectItem>
                          <SelectItem value="hr">HR Management</SelectItem>
                          <SelectItem value="time-tracking">Time & Attendance</SelectItem>
                          <SelectItem value="onboarding">Employee Onboarding</SelectItem>
                          <SelectItem value="compliance">Compliance & Reporting</SelectItem>
                          <SelectItem value="all">Complete HR Solution</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                      rows={4}
                      className="mt-1"
                      placeholder="Tell us about your HR challenges, current processes, or specific questions you have about Cedur..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving to Database...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Enquiry
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
