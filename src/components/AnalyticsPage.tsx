'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from './ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  RadialBarChart,
  RadialBar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  ReferenceLine
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Target,
  Award,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  AlertTriangle,
  CheckCircle,
  Eye,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Building,
  Truck,
  Timer,
  UserCheck,
  Calculator,
  Globe,
  Layers,
  TrendingUpIcon
} from 'lucide-react'

// Mock Data
const revenueAnalytics = {
  current: 847256,
  previous: 754820,
  change: 12.2,
  target: 900000,
  monthly: [
    { month: 'Jan', revenue: 650000, profit: 195000, expenses: 455000, jobs: 45 },
    { month: 'Feb', revenue: 720000, profit: 216000, expenses: 504000, jobs: 52 },
    { month: 'Mar', revenue: 680000, profit: 204000, expenses: 476000, jobs: 48 },
    { month: 'Apr', revenue: 790000, profit: 237000, expenses: 553000, jobs: 58 },
    { month: 'May', revenue: 850000, profit: 255000, expenses: 595000, jobs: 62 },
    { month: 'Jun', revenue: 847256, profit: 254177, expenses: 593079, jobs: 65 }
  ]
}

const performanceMetrics = [
  {
    category: 'Revenue Growth',
    current: 847256,
    target: 900000,
    percentage: 94.1,
    trend: 'up',
    change: '+12.2%',
    color: '#00A1FF'
  },
  {
    category: 'Job Completion Rate',
    current: 92,
    target: 95,
    percentage: 96.8,
    trend: 'up',
    change: '+3.2%',
    color: '#00CEB6'
  },
  {
    category: 'Customer Satisfaction',
    current: 4.8,
    target: 5.0,
    percentage: 96.0,
    trend: 'up',
    change: '+0.3',
    color: '#FFB800'
  },
  {
    category: 'Cost Efficiency',
    current: 68,
    target: 70,
    percentage: 97.1,
    trend: 'down',
    change: '-2.1%',
    color: '#FF6692'
  }
]

const jobTypeAnalytics = [
  { name: 'Electrical', value: 35, count: 142, color: '#00A1FF' },
  { name: 'HVAC', value: 28, count: 114, color: '#00CEB6' },
  { name: 'Plumbing', value: 22, count: 89, color: '#FFB800' },
  { name: 'Generator', value: 15, count: 61, color: '#FF6692' }
]

const geographicData = [
  { region: 'North', jobs: 85, revenue: 245000, growth: 15.2 },
  { region: 'South', jobs: 72, revenue: 198000, growth: 8.7 },
  { region: 'East', jobs: 94, revenue: 287000, growth: 22.1 },
  { region: 'West', jobs: 63, revenue: 174000, growth: 5.3 },
  { region: 'Central', jobs: 78, revenue: 221000, growth: 12.8 }
]

const topPerformers = [
  {
    name: 'David Wilson',
    role: 'Lead Electrician',
    jobsCompleted: 23,
    revenue: 89750,
    efficiency: 98.2,
    rating: 4.9,
    avatar: null
  },
  {
    name: 'Sarah Chen',
    role: 'Project Manager',
    jobsCompleted: 31,
    revenue: 125400,
    efficiency: 96.8,
    rating: 4.8,
    avatar: null
  },
  {
    name: 'Mike Rodriguez',
    role: 'HVAC Specialist',
    jobsCompleted: 18,
    revenue: 67200,
    efficiency: 95.5,
    rating: 4.7,
    avatar: null
  },
  {
    name: 'Jennifer Wilson',
    role: 'Lead Plumber',
    jobsCompleted: 19,
    revenue: 71250,
    efficiency: 94.2,
    rating: 4.6,
    avatar: null
  }
]

const predictiveAnalytics = [
  { month: 'Jul', predicted: 920000, lower: 890000, upper: 950000 },
  { month: 'Aug', predicted: 975000, lower: 940000, upper: 1010000 },
  { month: 'Sep', predicted: 1020000, lower: 980000, upper: 1060000 },
  { month: 'Oct', predicted: 1080000, lower: 1040000, upper: 1120000 }
]

const realTimeMetrics = [
  { 
    title: 'Active Jobs', 
    value: 23, 
    change: '+3', 
    icon: Briefcase, 
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  { 
    title: 'Online Staff', 
    value: 47, 
    change: '+2', 
    icon: Users, 
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  { 
    title: 'Pending Approvals', 
    value: 8, 
    change: '-1', 
    icon: AlertTriangle, 
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  { 
    title: 'Today\'s Revenue', 
    value: '$28,450', 
    change: '+$2,100', 
    icon: DollarSign, 
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
]

const timeSeriesComparison = [
  { period: 'Q1 2024', thisYear: 2180000, lastYear: 1940000 },
  { period: 'Q2 2024', thisYear: 2456000, lastYear: 2180000 },
  { period: 'Q3 2024', thisYear: 2890000, lastYear: 2420000 },
  { period: 'Q4 2024', thisYear: 3200000, lastYear: 2680000 }
]

const customerInsights = [
  { segment: 'Enterprise', customers: 45, revenue: 425000, avgJobValue: 9444 },
  { segment: 'SMB', customers: 123, revenue: 287000, avgJobValue: 2333 },
  { segment: 'Residential', customers: 89, revenue: 135256, avgJobValue: 1520 }
]

const heatmapData = [
  { day: 'Mon', hour: '6AM', value: 12 }, { day: 'Mon', hour: '8AM', value: 45 }, { day: 'Mon', hour: '10AM', value: 78 }, { day: 'Mon', hour: '12PM', value: 92 }, { day: 'Mon', hour: '2PM', value: 85 }, { day: 'Mon', hour: '4PM', value: 67 }, { day: 'Mon', hour: '6PM', value: 34 },
  { day: 'Tue', hour: '6AM', value: 18 }, { day: 'Tue', hour: '8AM', value: 52 }, { day: 'Tue', hour: '10AM', value: 85 }, { day: 'Tue', hour: '12PM', value: 96 }, { day: 'Tue', hour: '2PM', value: 89 }, { day: 'Tue', hour: '4PM', value: 72 }, { day: 'Tue', hour: '6PM', value: 41 },
  { day: 'Wed', hour: '6AM', value: 15 }, { day: 'Wed', hour: '8AM', value: 48 }, { day: 'Wed', hour: '10AM', value: 82 }, { day: 'Wed', hour: '12PM', value: 94 }, { day: 'Wed', hour: '2PM', value: 87 }, { day: 'Wed', hour: '4PM', value: 69 }, { day: 'Wed', hour: '6PM', value: 38 },
  { day: 'Thu', hour: '6AM', value: 22 }, { day: 'Thu', hour: '8AM', value: 58 }, { day: 'Thu', hour: '10AM', value: 88 }, { day: 'Thu', hour: '12PM', value: 98 }, { day: 'Thu', hour: '2PM', value: 91 }, { day: 'Thu', hour: '4PM', value: 75 }, { day: 'Thu', hour: '6PM', value: 43 },
  { day: 'Fri', hour: '6AM', value: 25 }, { day: 'Fri', hour: '8AM', value: 62 }, { day: 'Fri', hour: '10AM', value: 91 }, { day: 'Fri', hour: '12PM', value: 100 }, { day: 'Fri', hour: '2PM', value: 94 }, { day: 'Fri', hour: '4PM', value: 78 }, { day: 'Fri', hour: '6PM', value: 45 }
]

export function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [selectedRegion, setSelectedRegion] = useState('all')

  const getHeatmapColor = (value: number) => {
    if (value >= 90) return 'bg-[#00A1FF]'
    if (value >= 70) return 'bg-[#00A1FF]/80'
    if (value >= 50) return 'bg-[#00A1FF]/60'
    if (value >= 30) return 'bg-[#00A1FF]/40'
    return 'bg-[#00A1FF]/20'
  }

  const getComparisonIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown
  }

  const TrigirData = [
  { name: 'Overview', value: 'overview', icon: <Eye className="h-4 w-4" /> },
  { name: 'Revenue', value: 'revenue', icon: <DollarSign className="h-4 w-4" /> },
  { name: 'Performance', value: 'performance', icon: <Target className="h-4 w-4" /> },
  { name: 'Geographic', value: 'geographic', icon: <MapPin className="h-4 w-4" /> },
  { name: 'Predictive', value: 'predictive', icon: <TrendingUpIcon className="h-4 w-4" /> },
  { name: 'Insights', value: 'insights', icon: <Layers className="h-4 w-4" /> },
];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights and performance metrics for data-driven decisions
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
          
         <SelectContent>
        {["71 Days", "30 Days", "3 Months", "6 Months", "1 Year"].map((timeframe, index) => (
          <SelectItem key={index} value={timeframe.toLowerCase().replace(' ', '')}>
            {timeframe}
          </SelectItem>
        ))}
      </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {realTimeMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change} vs yesterday
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Analytics Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
           <TabsList className="grid w-full grid-cols-6">
          {TrigirData.map((item,index) => (
            <TabsTrigger key={index} value={item.value} className="flex items-center gap-2">
              {item.icon} {item.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => {
              const TrendIcon = getComparisonIcon(metric.trend)
              return (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-foreground">{metric.category}</h3>
                      <div className={`p-2 rounded-lg ${metric.trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
                        <TrendIcon className={`h-4 w-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-foreground">
                          {typeof metric.current === 'number' && metric.current > 1000 
                            ? `$${(metric.current / 1000).toFixed(0)}k` 
                            : metric.current}
                        </span>
                        <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{metric.percentage}%</span>
                        </div>
                        <Progress value={metric.percentage} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Revenue Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={revenueAnalytics.monthly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }} 
                      />
                      <Bar dataKey="profit" fill="#00CEB6" radius={[2, 2, 0, 0]} />
                      <Line type="monotone" dataKey="revenue" stroke="#00A1FF" strokeWidth={3} />
                      <Area type="monotone" dataKey="revenue" fill="#00A1FF" fillOpacity={0.1} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Job Type Distribution */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                  Service Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={jobTypeAnalytics}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {jobTypeAnalytics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {jobTypeAnalytics.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.count} jobs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Heatmap */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Job Activity Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-8 gap-2 text-sm">
                  <div></div>
                  {['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM'].map(hour => (
                    <div key={hour} className="text-center text-muted-foreground">{hour}</div>
                  ))}
                </div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                  <div key={day} className="grid grid-cols-8 gap-2">
                    <div className="text-sm text-muted-foreground text-right pr-2">{day}</div>
                    {heatmapData.filter(d => d.day === day).map((item, index) => (
                      <div
                        key={index}
                        className={`h-8 rounded ${getHeatmapColor(item.value)} flex items-center justify-center`}
                        title={`${item.day} ${item.hour}: ${item.value}% capacity`}
                      >
                        <span className="text-xs text-white font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Summary Cards */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Total Revenue</h3>
                    <p className="text-sm text-muted-foreground">This period</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-foreground">
                    ${(revenueAnalytics.current / 1000).toFixed(0)}k
                  </p>
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      +{revenueAnalytics.change}%
                    </span>
                    <span className="text-sm text-muted-foreground">vs last period</span>
                  </div>
                  <Progress value={(revenueAnalytics.current / revenueAnalytics.target) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {((revenueAnalytics.current / revenueAnalytics.target) * 100).toFixed(1)}% of ${(revenueAnalytics.target / 1000).toFixed(0)}k target
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Avg Job Value</h3>
                    <p className="text-sm text-muted-foreground">Per completed job</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-foreground">$13,035</p>
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">+8.3%</span>
                    <span className="text-sm text-muted-foreground">improvement</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Profit Margin</h3>
                    <p className="text-sm text-muted-foreground">Current period</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-foreground">30.1%</p>
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">+2.1%</span>
                    <span className="text-sm text-muted-foreground">vs target</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Revenue Chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Revenue vs Profit Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={revenueAnalytics.monthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }} 
                    />
                    <Bar dataKey="revenue" fill="#00A1FF" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" fill="#00CEB6" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="jobs" stroke="#FF6692" strokeWidth={3} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Top Performers */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Top Performers This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {performer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{performer.name}</h4>
                        <p className="text-sm text-muted-foreground">{performer.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Jobs Completed</span>
                        <span className="font-medium">{performer.jobsCompleted}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Revenue</span>
                        <span className="font-medium">${(performer.revenue / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Efficiency</span>
                        <span className="font-medium">{performer.efficiency}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{performer.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueAnalytics.monthly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Area type="monotone" dataKey="jobs" stroke="#00A1FF" fill="#00A1FF" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Customer Satisfaction Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerInsights.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <h4 className="font-medium">{segment.segment}</h4>
                        <p className="text-sm text-muted-foreground">{segment.customers} customers</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(segment.revenue / 1000).toFixed(0)}k</p>
                        <p className="text-sm text-muted-foreground">${segment.avgJobValue} avg</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Geographic Tab */}
        <TabsContent value="geographic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regional Performance */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Regional Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geographicData.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{region.region}</h4>
                          <p className="text-sm text-muted-foreground">{region.jobs} active jobs</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(region.revenue / 1000).toFixed(0)}k</p>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="h-3 w-3 text-green-600" />
                          <span className="text-sm text-green-600">{region.growth}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Share */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Market Share by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={geographicData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" stroke="#64748b" />
                      <YAxis dataKey="region" type="category" stroke="#64748b" />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#00A1FF" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Predictive Tab */}
        <TabsContent value="predictive" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Revenue Forecasting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[...revenueAnalytics.monthly, ...predictiveAnalytics]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#00A1FF" fill="#00A1FF" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="predicted" stroke="#FF6692" fill="#FF6692" fillOpacity={0.1} strokeDasharray="5 5" />
                    <Area type="monotone" dataKey="upper" stroke="#FFB800" fill="none" strokeDasharray="2 2" />
                    <Area type="monotone" dataKey="lower" stroke="#FFB800" fill="none" strokeDasharray="2 2" />
                    <ReferenceLine x="Jun" stroke="#666" strokeDasharray="3 3" label="Current" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          {/* Business Intelligence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Growth Opportunity</h3>
                    <p className="text-sm text-blue-600">Eastern region shows 22% growth</p>
                  </div>
                </div>
                <p className="text-sm text-blue-800">
                  Consider expanding operations in the Eastern region to capitalize on the 22% growth rate.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-900">Performance Insight</h3>
                    <p className="text-sm text-green-600">Customer satisfaction at 4.8/5.0</p>
                  </div>
                </div>
                <p className="text-sm text-green-800">
                  Excellent customer satisfaction scores indicate strong service quality and potential for referrals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-orange-900">Action Required</h3>
                    <p className="text-sm text-orange-600">8 pending approvals need attention</p>
                  </div>
                </div>
                <p className="text-sm text-orange-800">
                  Review and process pending approvals to maintain operational efficiency and customer satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Year-over-Year Comparison */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Year-over-Year Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeSeriesComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="period" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="thisYear" fill="#00A1FF" radius={[4, 4, 0, 0]} name="2024" />
                    <Bar dataKey="lastYear" fill="#00CEB6" radius={[4, 4, 0, 0]} name="2023" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}