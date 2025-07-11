"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white rounded-full p-1 flex items-center justify-center">
              <Image
                src="/images/cedur-logo.png"
                alt="Cedur Logo"
                width={24}
                height={24}
                className="transition-transform duration-300"
              />
            </div>
            <span className="text-xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
              Cedur
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative transition-all duration-300 group font-medium ${
                    scrolled
                      ? `${
                          isActive(item.href)
                            ? "text-purple-600 dark:text-purple-400 font-semibold"
                            : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                        }`
                      : `${isActive(item.href) ? "text-white font-semibold" : "text-white/90 hover:text-white"}`
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full ${
                      isActive(item.href) ? "w-full" : ""
                    }`}
                  ></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white border-0 transition-all duration-300 shadow-md">
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 text-gray-600 dark:text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium ${
                    isActive(item.href)
                      ? "text-purple-600 dark:text-purple-400 font-semibold bg-gray-100 dark:bg-gray-800"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="w-fit bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-md">
                <Link href="/signin" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
