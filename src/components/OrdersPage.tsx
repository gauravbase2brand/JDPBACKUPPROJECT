'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Separator } from './ui/separator'
// import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { 
  Search, 
  Filter, 
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar as CalendarIcon,
  FileDown,
  Receipt,
  Printer,
  Mail,
  Building,
  User,
  MapPin,
  Phone
} from 'lucide-react'
import { format } from 'date-fns'


interface OrderItem {
  id: string
  name: string
  sku: string
  quantity: number
  unitPrice: number
  total: number
}

interface Order {
  id: string
  jobId: string
  customerName: string
  contractorName?: string
  customerEmail: string
  customerPhone: string
  billingAddress: {
    fullName: string
    address: string
    city: string
    state: string
    zipCode: string
    email: string
    phone: string
  }
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  orderDate: string
  items: OrderItem[]
  subtotal: number
  tax: number
  discount: number
  totalPayment: number
  notes?: string
}

// Mock data with enhanced structure
const ordersData: Order[] = [
  {
    id: 'ORD-2025-001',
    jobId: 'PH209_US_JDP',
    customerName: 'ABC Corporation',
    contractorName: 'John Carter',
    customerEmail: 'billing@abccorp.com',
    customerPhone: '+1 (555) 123-4567',
    billingAddress: {
      fullName: 'ABC Corporation',
      address: '1160 N Willow Dr Near Res.',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      email: 'billing@abccorp.com',
      phone: '+1 (555) 123-4567'
    },
    status: 'completed',
    orderDate: '2025-01-20',
    items: [
      {
        id: 'ITEM-001',
        name: 'Main Electrical Panel 200A',
        sku: 'ELC-PNL-200A',
        quantity: 1,
        unitPrice: 450,
        total: 450
      },
      {
        id: 'ITEM-002',
        name: 'Circuit Breakers 20A (10 Pack)',
        sku: 'CB-20A-10PK',
        quantity: 2,
        unitPrice: 180,
        total: 360
      },
      {
        id: 'ITEM-003',
        name: 'Copper Wire 12 AWG (500 ft)',
        sku: 'CW-12AWG-500FT',
        quantity: 3,
        unitPrice: 125,
        total: 375
      }
    ],
    subtotal: 1185,
    tax: 94.8,
    discount: 0,
    totalPayment: 1279.8,
    notes: 'Rush order for electrical panel installation project'
  },
  {
    id: 'ORD-2025-002',
    jobId: 'PH210_US_JDP',
    customerName: 'XYZ Company',
    contractorName: 'Sarah Johnson',
    customerEmail: 'orders@xyzcompany.com',
    customerPhone: '+1 (555) 234-5678',
    billingAddress: {
      fullName: 'XYZ Company',
      address: '11613 W Shores RD NW Jursa Res.',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      email: 'orders@xyzcompany.com',
      phone: '+1 (555) 234-5678'
    },
    status: 'processing',
    orderDate: '2025-01-21',
    items: [
      {
        id: 'ITEM-004',
        name: 'Advanced Main Unit 5000W',
        sku: 'MU-ADV-5000',
        quantity: 1,
        unitPrice: 2200,
        total: 2200
      },
      {
        id: 'ITEM-005',
        name: 'Digital Control Panel (3 Pack)',
        sku: 'CP-DIG-TRIO',
        quantity: 1,
        unitPrice: 450,
        total: 450
      }
    ],
    subtotal: 2650,
    tax: 212,
    discount: 100,
    totalPayment: 2762
  },
  {
    id: 'ORD-2025-003',
    jobId: 'PH211_US_JDP',
    customerName: 'DEF Industries',
    contractorName: 'Mike Wilson',
    customerEmail: 'procurement@defindustries.com',
    customerPhone: '+1 (555) 345-6789',
    billingAddress: {
      fullName: 'DEF Industries',
      address: '4211 Aiden Dr Frakes Res.',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      email: 'procurement@defindustries.com',
      phone: '+1 (555) 345-6789'
    },
    status: 'pending',
    orderDate: '2025-01-22',
    items: [
      {
        id: 'ITEM-006',
        name: 'Fine Sand (5 Cubic Yards)',
        sku: 'SND-FNE-5YD',
        quantity: 2,
        unitPrice: 150,
        total: 300
      },
      {
        id: 'ITEM-007',
        name: 'Pea Gravel (3 Cubic Yards)',
        sku: 'GRV-PEA-3YD',
        quantity: 1,
        unitPrice: 120,
        total: 120
      }
    ],
    subtotal: 420,
    tax: 33.6,
    discount: 0,
    totalPayment: 453.6
  },
  {
    id: 'ORD-2025-004',
    jobId: 'PH212_US_JDP',
    customerName: 'GHI Construction',
    contractorName: 'John Carter',
    customerEmail: 'orders@ghiconstruction.com',
    customerPhone: '+1 (555) 456-7890',
    billingAddress: {
      fullName: 'GHI Construction',
      address: '789 Construction Ave',
      city: 'Manhattan',
      state: 'NY',
      zipCode: '10003',
      email: 'orders@ghiconstruction.com',
      phone: '+1 (555) 456-7890'
    },
    status: 'cancelled',
    orderDate: '2025-01-18',
    items: [
      {
        id: 'ITEM-008',
        name: 'Professional Testing Kit',
        sku: 'TST-KIT-PRO',
        quantity: 1,
        unitPrice: 350,
        total: 350
      }
    ],
    subtotal: 350,
    tax: 28,
    discount: 0,
    totalPayment: 378
  },
  {
    id: 'ORD-2025-005',
    jobId: 'PH213_US_JDP',
    customerName: 'JKL Enterprises',
    contractorName: 'Sarah Johnson',
    customerEmail: 'purchasing@jklenterprises.com',
    customerPhone: '+1 (555) 567-8901',
    billingAddress: {
      fullName: 'JKL Enterprises',
      address: '456 Business Plaza',
      city: 'Queens',
      state: 'NY',
      zipCode: '11004',
      email: 'purchasing@jklenterprises.com',
      phone: '+1 (555) 567-8901'
    },
    status: 'processing',
    orderDate: '2025-01-19',
    items: [
      {
        id: 'ITEM-009',
        name: 'ROMEX Cable 14 AWG (250 ft)',
        sku: 'RMX-14-250FT',
        quantity: 4,
        unitPrice: 95,
        total: 380
      },
      {
        id: 'ITEM-010',
        name: 'Standard Outlets (20 Pack)',
        sku: 'OUT-STD-20PK',
        quantity: 2,
        unitPrice: 85,
        total: 170
      }
    ],
    subtotal: 550,
    tax: 44,
    discount: 25,
    totalPayment: 569
  },
  {
    id: 'ORD-2025-006',
    jobId: 'PH214_US_JDP',
    customerName: 'MNO Corporation',
    contractorName: 'Mike Wilson',
    customerEmail: 'orders@mnocorp.com',
    customerPhone: '+1 (555) 678-9012',
    billingAddress: {
      fullName: 'MNO Corporation',
      address: '321 Corporate Blvd',
      city: 'Bronx',
      state: 'NY',
      zipCode: '10005',
      email: 'orders@mnocorp.com',
      phone: '+1 (555) 678-9012'
    },
    status: 'pending',
    orderDate: '2025-01-23',
    items: [
      {
        id: 'ITEM-011',
        name: 'Single Pole Switches (15 Pack)',
        sku: 'SW-SGL-15PK',
        quantity: 2,
        unitPrice: 60,
        total: 120
      },
      {
        id: 'ITEM-012',
        name: 'Junction Boxes 4" (25 Pack)',
        sku: 'JB-4IN-25PK',
        quantity: 3,
        unitPrice: 45,
        total: 135
      }
    ],
    subtotal: 255,
    tax: 20.4,
    discount: 0,
    totalPayment: 275.4
  }
]

export function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [sortBy, setSortBy] = useState('all')
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Filter orders based on search, status, date range, and sort
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.contractorName && order.contractorName.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    
    let matchesDate = true
    if (dateRange.from && dateRange.to) {
      const orderDate = new Date(order.orderDate)
      matchesDate = orderDate >= dateRange.from && orderDate <= dateRange.to
    }
    
    let matchesSort = true
    if (sortBy !== 'all') {
      const orderDate = new Date(order.orderDate)
      const now = new Date()
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
      
      switch (sortBy) {
        case 'last_week':
          matchesSort = orderDate >= oneWeekAgo
          break
        case 'this_month':
          matchesSort = orderDate >= oneMonthAgo
          break
        case 'this_year':
          matchesSort = orderDate >= oneYearAgo
          break
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate && matchesSort
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': 
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'processing': 
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled': 
        return 'bg-red-100 text-red-800 border-red-200'
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-3 w-3" />
      case 'pending': return <Clock className="h-3 w-3" />
      case 'processing': return <AlertCircle className="h-3 w-3" />
      case 'cancelled': return <XCircle className="h-3 w-3" />
      default: return null
    }
  }

  const handleViewInvoice = (order: Order) => {
    setSelectedOrder(order)
    setShowInvoiceModal(true)
  }

  const handleExport = (format: 'csv' | 'pdf') => {
    // Implementation for CSV/PDF export
    console.log(`Exporting orders as ${format.toUpperCase()}...`)
    // Here you would implement actual export functionality
  }

  const handlePrintInvoice = () => {
    window.print()
  }

  const handleEmailInvoice = () => {
    console.log('Sending invoice via email...')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Calculate summary statistics
  const totalOrders = ordersData.length
  const pendingOrders = ordersData.filter(o => o.status === 'pending').length
  const processingOrders = ordersData.filter(o => o.status === 'processing').length
  const completedOrders = ordersData.filter(o => o.status === 'completed').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Orders Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders with comprehensive invoice details</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                <div className="text-2xl font-semibold text-foreground">{totalOrders}</div>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
                <div className="text-2xl font-semibold text-yellow-600">{pendingOrders}</div>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Processing</CardTitle>
                <div className="text-2xl font-semibold text-blue-600">{processingOrders}</div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                <div className="text-2xl font-semibold text-green-600">{completedOrders}</div>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders, jobs, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range Filter */}
         
            </div>
            
            {/* Sort and Export */}
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last_week">Last Week</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
                  <SelectItem value="this_year">This Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={() => handleExport('csv')}>
                <FileDown className="h-4 w-4 mr-2" />
                CSV
              </Button>
              
              <Button variant="outline" onClick={() => handleExport('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Customer / Contractor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium font-mono">{order.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-primary">{order.jobId}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        {order.contractorName && (
                          <div className="text-sm text-muted-foreground">Contractor: {order.contractorName}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 w-fit hover:${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewInvoice(order)}
                      >
                        <Receipt className="h-3 w-3 mr-1" />
                        View Invoice
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Modal */}
      <Dialog open={showInvoiceModal} onOpenChange={setShowInvoiceModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              Order Invoice - {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription>
              Detailed invoice information for order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-primary">INVOICE</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Order Date: {formatDate(selectedOrder.orderDate)}
                  </p>
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-semibold">JDP Corporation</h3>
                  <p className="text-sm text-muted-foreground">
                    1234 Business Street<br />
                    New York, NY 10001<br />
                    Phone: (555) 123-4567
                  </p>
                </div>
              </div>

              <Separator />

              {/* Order & Billing Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Order Info */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-primary" />
                      Order Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Order ID:</span>
                      <span className="ml-2 font-medium font-mono">{selectedOrder.id}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Job ID:</span>
                      <span className="ml-2 font-medium text-primary">{selectedOrder.jobId}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Order Date:</span>
                      <span className="ml-2 font-medium">{formatDate(selectedOrder.orderDate)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <span className="ml-2">
                        <Badge className={`${getStatusColor(selectedOrder.status)} text-xs`}>
                          {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                        </Badge>
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="font-medium">{selectedOrder.billingAddress.fullName}</div>
                    <div className="text-muted-foreground">
                      {selectedOrder.billingAddress.address}<br />
                      {selectedOrder.billingAddress.city}, {selectedOrder.billingAddress.state} {selectedOrder.billingAddress.zipCode}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedOrder.billingAddress.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedOrder.billingAddress.phone}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer/Contractor Info */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Customer Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Customer:</span>
                      <div className="font-medium">{selectedOrder.customerName}</div>
                    </div>
                    {selectedOrder.contractorName && (
                      <div>
                        <span className="text-muted-foreground">Contractor:</span>
                        <div className="font-medium">{selectedOrder.contractorName}</div>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedOrder.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedOrder.customerPhone}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Items Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(item.total)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Total Payment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(selectedOrder.subtotal)}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between">
                        <span>Discount:</span>
                        <span className="text-green-600">-{formatCurrency(selectedOrder.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>{formatCurrency(selectedOrder.tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Payment:</span>
                      <span className="text-primary">{formatCurrency(selectedOrder.totalPayment)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedOrder.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handlePrintInvoice}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleEmailInvoice} className="bg-primary hover:bg-primary/90">
              <Mail className="h-4 w-4 mr-2" />
              Email Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}