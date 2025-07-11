"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Mail, Phone, Building, Users, MessageSquare, Calendar, Filter } from "lucide-react"
import type { Enquiry } from "@/lib/supabase"

export default function EnquiriesAdminPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    try {
      const response = await fetch("/api/enquiries")
      const data = await response.json()
      setEnquiries(data.enquiries || [])
    } catch (error) {
      console.error("Error fetching enquiries:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateEnquiryStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchEnquiries() // Refresh the list
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: status as any })
        }
      }
    } catch (error) {
      console.error("Error updating enquiry:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "contacted":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "qualified":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter
    const matchesSearch =
      searchTerm === "" ||
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.company.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Enquiries Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage and track customer enquiries from your website.</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Enquiries</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{enquiries.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">New</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {enquiries.filter((e) => e.status === "new").length}
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">New</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Contacted</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {enquiries.filter((e) => e.status === "contacted").length}
                  </p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Contacted</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Qualified</p>
                  <p className="text-2xl font-bold text-green-600">
                    {enquiries.filter((e) => e.status === "qualified").length}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">Qualified</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enquiries Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Enquiries ({filteredEnquiries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      <TableCell className="font-medium">{enquiry.name}</TableCell>
                      <TableCell>{enquiry.company}</TableCell>
                      <TableCell>{enquiry.email}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(enquiry.status || "new")}>{enquiry.status || "new"}</Badge>
                      </TableCell>
                      <TableCell>
                        {enquiry.created_at ? new Date(enquiry.created_at).toLocaleDateString() : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedEnquiry(enquiry)}>
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Enquiry Details</DialogTitle>
                              <DialogDescription>
                                View and manage enquiry from {selectedEnquiry?.name}
                              </DialogDescription>
                            </DialogHeader>

                            {selectedEnquiry && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Users className="w-4 h-4 text-gray-500" />
                                      <span className="font-medium">Name:</span>
                                      <span>{selectedEnquiry.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-4 h-4 text-gray-500" />
                                      <span className="font-medium">Email:</span>
                                      <span>{selectedEnquiry.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-4 h-4 text-gray-500" />
                                      <span className="font-medium">Phone:</span>
                                      <span>{selectedEnquiry.phone || "Not provided"}</span>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Building className="w-4 h-4 text-gray-500" />
                                      <span className="font-medium">Company:</span>
                                      <span>{selectedEnquiry.company}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Users className="w-4 h-4 text-gray-500" />
                                      <span className="font-medium">Employees:</span>
                                      <span>{selectedEnquiry.employees || "Not specified"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-gray-500" />
                                      <span className="font-medium">Date:</span>
                                      <span>
                                        {selectedEnquiry.created_at
                                          ? new Date(selectedEnquiry.created_at).toLocaleString()
                                          : "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <span className="font-medium">Interest:</span>
                                  <p className="mt-1">{selectedEnquiry.interest || "Not specified"}</p>
                                </div>

                                <div>
                                  <span className="font-medium">Message:</span>
                                  <Textarea value={selectedEnquiry.message} readOnly className="mt-1 min-h-[100px]" />
                                </div>

                                <div className="flex items-center gap-4">
                                  <span className="font-medium">Status:</span>
                                  <Select
                                    value={selectedEnquiry.status || "new"}
                                    onValueChange={(value) => updateEnquiryStatus(selectedEnquiry.id!, value)}
                                  >
                                    <SelectTrigger className="w-40">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="contacted">Contacted</SelectItem>
                                      <SelectItem value="qualified">Qualified</SelectItem>
                                      <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredEnquiries.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No enquiries found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
