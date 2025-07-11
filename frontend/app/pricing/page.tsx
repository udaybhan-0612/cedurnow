"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, ArrowRight, Users, Shield, Zap, BarChart3 } from "lucide-react"
import { FadeInOnScroll, SlideInFromLeft, SlideInFromRight } from "@/components/animations"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 employees",
        "Basic payroll processing",
        "Employee self-service portal",
        "Email support",
        "Basic reporting",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Basic",
      price: "₹23,999",
      period: "per month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 50 employees",
        "Advanced payroll features",
        "Time & attendance tracking",
        "Leave management",
        "Priority support",
        "Custom reports",
        "Mobile app access",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Growth",
      price: "₹39,999",
      period: "per month",
      description: "For established companies",
      features: [
        "Up to 200 employees",
        "All Basic features",
        "Performance management",
        "Advanced analytics",
        "API access",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Veteran",
      price: "₹69,999",
      period: "per month",
      description: "Enterprise-grade solution",
      features: [
        "Unlimited employees",
        "All Growth features",
        "White-label options",
        "Advanced security",
        "Custom workflows",
        "On-premise deployment",
        "24/7 dedicated support",
        "Training & onboarding",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees. You only pay the monthly subscription fee for your chosen plan.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and bank transfers. All payments are processed securely.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes, we provide email support for all plans, with priority and phone support available for higher-tier plans.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription at any time. There are no cancellation fees or long-term contracts.",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInOnScroll>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your business. All plans include our core HR and payroll features with no
              hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 shadow-lg px-8 py-3"
              >
                <Link href="/signup" className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 px-8 py-3 bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <FadeInOnScroll key={index} className={`animate-delay-${index * 100}`}>
                <Card
                  className={`relative h-full transition-all duration-300 hover:shadow-xl ${
                    plan.popular ? "border-purple-500 shadow-lg scale-105" : "hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-purple-600 text-white px-4 py-1">Recommended</Badge>
                    </div>
                  )}
                  <CardHeader className={plan.popular ? "pt-8" : "pt-6"}>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-purple-600">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full transition-all duration-300 ${
                        plan.popular
                          ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Cedur?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our platform is designed to grow with your business, offering powerful features at every stage.
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Employee Management",
                description: "Centralized employee database with comprehensive profiles and document management.",
              },
              {
                icon: Shield,
                title: "Security & Compliance",
                description: "Bank-level security with automatic compliance updates and audit trails.",
              },
              {
                icon: Zap,
                title: "Automation",
                description: "Automated workflows for payroll, leave requests, and performance reviews.",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                description: "Real-time insights and customizable reports to make data-driven decisions.",
              },
            ].map((feature, index) => (
              <FadeInOnScroll key={index} className={`animate-delay-${index * 100}`}>
                <Card className="text-center p-6 h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <feature.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
              </p>
            </div>
          </FadeInOnScroll>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FadeInOnScroll key={index} className={`animate-delay-${index * 100}`}>
                <Card className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SlideInFromLeft>
              <div>
                <h2 className="text-4xl font-bold mb-6">See Cedur in Action</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Experience the power of our HR platform with a personalized demo. See how Cedur can transform your HR
                  processes.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Streamlined employee onboarding",
                    "Automated payroll processing",
                    "Real-time attendance tracking",
                    "Comprehensive reporting dashboard",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 shadow-lg"
                >
                  Schedule Demo
                </Button>
              </div>
            </SlideInFromLeft>

            <SlideInFromRight>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
                <img src="/images/dashboard-overview.png" alt="Cedur Dashboard Preview" className="w-full h-auto" />
              </div>
            </SlideInFromRight>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInOnScroll>
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium mb-8 text-muted-foreground">
              "Cedur has completely transformed our HR operations. The automation features alone have saved us 20+ hours
              per week."
            </blockquote>
            <div className="font-semibold text-xl mb-2">Priya Sharma</div>
            <div className="text-muted-foreground">HR Manager, TechCorp India</div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of businesses that have simplified their HR processes with Cedur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 shadow-lg px-8 py-3"
              >
                <Link href="/signup" className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300 px-8 py-3 bg-transparent"
              >
                Contact Sales
              </Button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </div>
  )
}
