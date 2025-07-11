"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote } from "lucide-react"
import Link from "next/link"
import { DemoPopup } from "@/components/demo-popup"
import { scrollToTop } from "@/utils/scroll-to-top"

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "HR Director",
      company: "TechStart Inc.",
      rating: 5,
      content:
        "Cedur has completely transformed our HR operations. The payroll automation alone saves us 10+ hours every month, and our employees love the self-service portal. The onboarding process is now seamless and professional.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Michael Chen",
      position: "CEO",
      company: "GrowthCorp",
      rating: 5,
      content:
        "As a growing company, we needed an HR solution that could scale with us. Cedur delivered exactly that. The reporting features give us insights we never had before, and the compliance tools give us peace of mind.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Emily Rodriguez",
      position: "Operations Manager",
      company: "RetailPlus",
      rating: 5,
      content:
        "The time and attendance tracking has been a game-changer for our retail locations. We can now manage schedules across multiple stores effortlessly, and the mobile app makes it easy for employees to clock in/out.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "David Kumar",
      position: "Finance Director",
      company: "ManufacturingPro",
      rating: 5,
      content:
        "The payroll accuracy and tax compliance features are outstanding. We've eliminated errors and the automatic tax filings save us significant time and stress during tax season. Highly recommended!",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Lisa Thompson",
      position: "HR Manager",
      company: "ServiceFirst",
      rating: 5,
      content:
        "Employee onboarding used to be a nightmare with paperwork everywhere. Now it's completely digital and streamlined. New hires can complete everything before their first day, making their experience much better.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Robert Wilson",
      position: "Founder",
      company: "StartupHub",
      rating: 5,
      content:
        "As a startup, we needed something affordable but powerful. The free plan got us started, and as we grew, upgrading was seamless. The customer support team is incredibly responsive and helpful.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const stats = [
    { value: "98%", label: "Customer Satisfaction" },
    { value: "10,000+", label: "Happy Customers" },
    { value: "500K+", label: "Employees Managed" },
    { value: "99.9%", label: "Uptime" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-800 dark:to-purple-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">What Our Customers Say</h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
            Don't just take our word for it. See how Cedur is helping businesses streamline their HR and payroll
            operations.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-primary/20 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mr-4"></div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.position}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Streamlined Attendance Management</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track employee attendance with ease using our intuitive interface.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              src="/images/attendance-tracking.png"
              alt="Cedur Attendance Tracking Interface"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Thousands of Happy Customers</h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            Start your free trial today and see why businesses choose Cedur for their HR needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-3" onClick={scrollToTop}>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <DemoPopup>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 bg-transparent"
                onClick={scrollToTop}
              >
                Schedule Demo
              </Button>
            </DemoPopup>
          </div>
        </div>
      </section>
    </div>
  )
}
