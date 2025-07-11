"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, Clock, Users, Calendar } from "lucide-react"
import { DemoPopup } from "@/components/demo-popup"
import { scrollToTop } from "@/utils/scroll-to-top"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:"",
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
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Let's Talk About Your HR Needs</h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
            Ready to streamline your HR and payroll operations? Get in touch with our experts for a personalized demo.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">Schedule Your Free Demo</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll schedule a personalized demo within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Work Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employees">Number of Employees</Label>
                        <Select onValueChange={(value) => handleChange("employees", value)}>
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
                        <Select onValueChange={(value) => handleChange("interest", value)}>
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
                      <Label htmlFor="message">Tell us about your current challenges</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={4}
                        className="mt-1"
                        placeholder="What HR or payroll challenges are you facing? What would you like to see in a demo?"
                      />
                    </div>

                    <DemoPopup>
                      <Button type="submit" size="lg" className="w-full">
                        Schedule My Free Demo
                      </Button>
                    </DemoPopup>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Contact Numbers</div>
                      <div className="text-muted-foreground text-sm">For Help: 011-4345-1244</div>
                      <div className="text-muted-foreground text-sm">For Sales: +91-85959 21201</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Email Support</div>
                      <div className="text-muted-foreground">info@cedurnow.com</div>
                      <div className="text-sm text-muted-foreground">24/7 response</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Business Hours</div>
                      <div className="text-muted-foreground">
                        Mon - Fri: 9:00 AM - 6:00 PM IST
                        <br />
                        Sat: 10:00 AM - 2:00 PM IST
                        <br />
                        Sun: Closed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Why Schedule a Demo?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Personalized Experience</div>
                      <div className="text-sm text-muted-foreground">
                        See how Cedur works with your specific use cases
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Expert Guidance</div>
                      <div className="text-sm text-muted-foreground">Get answers from our HR technology experts</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Quick Setup</div>
                      <div className="text-sm text-muted-foreground">Learn how to get started in just 30 minutes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Common Questions</h2>
            <p className="text-xl text-muted-foreground">Quick answers about getting started with Cedur.</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">How long does implementation take?</h3>
                <p className="text-muted-foreground">
                  Most customers are up and running within 1-2 weeks. Our implementation team will guide you through
                  every step, from data migration to employee training.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Can you migrate our existing data?</h3>
                <p className="text-muted-foreground">
                  Yes! We provide free data migration services for all paid plans. Our team will securely transfer your
                  employee data, payroll history, and other important information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">What kind of support do you provide?</h3>
                <p className="text-muted-foreground">
                  We offer comprehensive support including phone, email, and chat support. Plus, dedicated account
                  managers for Growth and Veteran plans, and extensive documentation and training resources.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Is my data secure?</h3>
                <p className="text-muted-foreground">
                  Absolutely. We use bank-level encryption, regular security audits, and comply with all major data
                  protection regulations including GDPR and SOC 2 Type II certification.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Salary Management Preview */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Comprehensive Salary Management</h3>
              <p className="text-muted-foreground">
                Manage employee salaries, designations, and compensation with complete transparency.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img
                src="/images/salary-breakdown.png"
                alt="Cedur Salary Breakdown Interface"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
