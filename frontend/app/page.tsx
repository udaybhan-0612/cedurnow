"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Clock, Shield, TrendingUp, CheckCircle, Star } from "lucide-react"
import { DemoPopup } from "@/components/demo-popup"
import { scrollToTop } from "@/utils/scroll-to-top"
import { FadeInOnScroll, SlideInFromLeft, SlideInFromRight } from "@/components/animations"

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section - Full viewport height */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-white dark:from-purple-800 dark:via-purple-700 dark:to-gray-900 text-white min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-100 to-gray-100 bg-clip-text text-transparent leading-tight">
            Simplify HR & Payroll
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Get the payroll & HR tools your business needs all in one place. Streamline operations, ensure compliance,
            and focus on what matters most - your people.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50 px-10 py-4 transition-all duration-300 shadow-lg border-0 text-lg font-semibold"
              onClick={scrollToTop}
            >
              <Link href="/signup" className="flex items-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <DemoPopup>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 bg-transparent transition-all duration-300 text-lg font-semibold"
                onClick={scrollToTop}
              >
                Schedule Demo
              </Button>
            </DemoPopup>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 text-gradient">Everything You Need for HR Success</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive HR and payroll management tools designed to grow with your business.
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Payroll Management",
                desc: "Automated payroll processing with tax calculations, direct deposits, and compliance reporting.",
                delay: "0s",
              },
              {
                icon: Clock,
                title: "Time & Attendance",
                desc: "Track employee hours, manage schedules, and monitor attendance with real-time reporting.",
                delay: "0.2s",
              },
              {
                icon: Shield,
                title: "Employee Onboarding",
                desc: "Streamlined onboarding process with digital forms, document management, and task tracking.",
                delay: "0.4s",
              },
              {
                icon: TrendingUp,
                title: "Leave Management",
                desc: "Manage vacation requests, sick leave, and PTO with automated approval workflows.",
                delay: "0.6s",
              },
            ].map((feature, index) => (
              <FadeInOnScroll key={index} className={`animate-delay-${index * 200}`}>
                <Card className="text-center p-8 hover-lift hover-glow transition-all duration-300 glass-dark h-full">
                  <CardContent className="pt-8">
                    <feature.icon
                      className="w-16 h-16 text-purple-600 mx-auto mb-6 animate-float"
                      style={{ animationDelay: feature.delay }}
                    />
                    <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideInFromLeft>
              <div>
                <h2 className="text-5xl font-bold mb-8 text-gradient">Why Choose Cedur?</h2>
                <div className="space-y-8">
                  {[
                    {
                      title: "Save Time & Reduce Errors",
                      desc: "Automate repetitive HR tasks and eliminate manual data entry mistakes.",
                    },
                    {
                      title: "Stay Compliant",
                      desc: "Automatic updates ensure you're always compliant with the latest regulations.",
                    },
                    {
                      title: "Scale with Confidence",
                      desc: "Our platform grows with your business, from startup to enterprise.",
                    },
                    {
                      title: "24/7 Support",
                      desc: "Get help when you need it with our dedicated customer support team.",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <CheckCircle className="w-8 h-8 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors duration-300">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SlideInFromLeft>

            <SlideInFromRight>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden hover-lift transition-all duration-500">
                <img src="/images/dashboard-overview.png" alt="Cedur HR Dashboard Overview" className="w-full h-auto" />
              </div>
            </SlideInFromRight>
          </div>
        </div>
      </section>

      {/* Quick Testimonial */}
      <section className="py-24 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="max-w-5xl mx-auto text-center">
          <FadeInOnScroll>
            <div className="flex justify-center mb-8">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 text-yellow-400 fill-current animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <blockquote className="text-3xl md:text-4xl font-medium mb-10 text-muted-foreground leading-relaxed">
              "Cedur has transformed how we manage our HR processes. What used to take hours now takes minutes, and our
              employees love the self-service features."
            </blockquote>
            <div className="font-semibold text-2xl mb-3">Sarah Johnson</div>
            <div className="text-muted-foreground text-lg">HR Director, TechStart Inc.</div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Ready to Simplify Your HR?</h2>
            <p className="text-2xl mb-10 text-purple-100 leading-relaxed">
              Join thousands of businesses that trust Cedur for their HR and payroll needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 px-10 py-4 transition-all duration-300 border-0 shadow-lg text-lg font-semibold"
                onClick={scrollToTop}
              >
                <Link href="/signup" className="flex items-center gap-2">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <DemoPopup>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 bg-transparent transition-all duration-300 text-lg font-semibold"
                  onClick={scrollToTop}
                >
                  Schedule Demo
                </Button>
              </DemoPopup>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Have Questions? Let's Talk!</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get personalized advice from our HR experts. Contact us to discuss your specific needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-600 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
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
                      <svg
                        className="w-6 h-6 text-purple-600 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
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

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                  <p className="text-muted-foreground mb-6">
                    Tell us about your HR challenges and we'll provide tailored solutions.
                  </p>

                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Contact form functionality has been simplified for this demo.
                    </p>
                    <Button className="mt-4 bg-gradient-to-r from-purple-600 to-purple-700">
                      <Link href="/contact">Visit Full Contact Page</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
