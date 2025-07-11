"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, CheckCircle } from "lucide-react"

interface DemoPopupProps {
  children: React.ReactNode
}

export function DemoPopup({ children }: DemoPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    employees: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError(null)
  
      try {
        const response = await fetch("http://127.0.0.1:8000/enquiry", {
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
        // scrollToTop()
  
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            employees: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Calendar className="w-6 h-6 text-purple-600" />
            Schedule Your Demo
          </DialogTitle>
          <DialogDescription>
            Get a personalized demo of Cedur and see how it can transform your HR processes.
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <select
                id="employees"
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="">Select range</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Tell us about your needs</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="What HR challenges are you looking to solve?"
                rows={3}
              />
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                What to expect:
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 30-minute personalized demo</li>
                <li>• See Cedur in action with your use case</li>
                <li>• Q&A with our HR experts</li>
                <li>• Custom pricing discussion</li>
              </ul>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300">
              Schedule Demo
            </Button>
          </form>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Demo Scheduled!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest in Cedur. Our team will contact you within 24 hours to schedule your
              personalized demo.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300">
                Check your email for confirmation details and calendar invite.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
