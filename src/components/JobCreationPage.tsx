import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Package,
  Clock,
  UserCheck,
  Building,
  Phone,
  Mail,
  Calculator,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  type: "service-based" | "contract-based";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  assignedLeadLabor: string[];
  assignedLabor: string[];
  contractor?: string;
  customer?: string;
  description: string;
  createdDate: string;
  dueDate: string;
  estimatedHours?: number;
  actualHours?: number;
  estimatedCost?: number;
  actualCost?: number;
  estimate?: number; // Added estimate field
  materials?: string[];
  // Enhanced location fields
  address: string;
  cityZip: string;
  phone: string;
  email: string;
  billToAddress: string;
  billToCityZip: string;
  billToPhone: string;
  billToEmail: string;
  sameAsAddress: boolean;
  priority: "low" | "medium" | "high";
  billingStatus?: "pending" | "invoiced" | "paid";
}

interface JobCreationPageProps {
  onBack: () => void;
  onJobCreated: (job: Job) => void;
}

const availableLeadLabor = [
  "Mike Johnson",
  "Sarah Davis",
  "Robert Brown",
  "Jennifer Wilson",
  "Kevin Martinez",
  "Amanda Taylor",
];

const availableLabor = [
  "John Smith",
  "David Wilson",
  "Sarah Johnson",
  "Mike Rodriguez",
  "Tom Anderson",
  "Lisa Chen",
  "Emily Brown",
  "Alex Miller",
];

const availableContractors = [
  "Elite Electrical Services",
  "Bright Solutions Ltd",
  "Power Solutions Inc",
  "Climate Control Pro",
  "TechFlow Systems",
  "ProElectric Group",
];

const commonMaterials = [
  "Electrical Panel",
  "Copper Wire (12 AWG)",
  "Circuit Breakers",
  "LED Bulbs",
  "Ballasts",
  "HVAC Parts",
  "Filters",
  "Refrigerant",
  "Generator Unit",
  "Transfer Switch",
  "Fuel Tank",
  "Conduit",
  "Wire Nuts",
  "Outlet Covers",
];

export function JobCreationPage({
  onBack,
  onJobCreated,
}: JobCreationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Job Type
    type: "" as "service-based" | "contract-based" | "",
    // Step 2: Basic Details
    title: "",
    customer: "", // Only for service-based jobs
    contractor: "", // For contract-based jobs in step 2, service-based in step 3
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    // Enhanced Location fields
    address: "",
    cityZip: "",
    phone: "",
    email: "",
    billToAddress: "",
    billToCityZip: "",
    billToPhone: "",
    billToEmail: "",
    sameAsAddress: false,

    // Step 3: Scheduling & Resources
    dueDate: "",
    estimatedHours: 0,
    estimatedCost: 0,
    estimate: 0, // Added estimate field
    assignedLeadLabor: [] as string[],
    assignedLabor: [] as string[],

    // Step 4: Materials (Optional)
    materials: [] as string[],

    // Step 5: Review
  });

  const steps = [
    { id: 1, title: "Job Type", icon: FileText },
    { id: 2, title: "Job Details", icon: User },
    { id: 3, title: "Resources", icon: Users },
    { id: 4, title: "Materials", icon: Package },
    { id: 5, title: "Review", icon: Check },
  ];

  const generateJobId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.random().toString(36).substr(2, 3).toUpperCase();
    return `JOB-${year}-${random}`;
  };

  const handleSameAsAddressChange = (checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        sameAsAddress: true,
        billToAddress: prev.address,
        billToCityZip: prev.cityZip,
        billToPhone: prev.phone,
        billToEmail: prev.email,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        sameAsAddress: false,
        billToAddress: "",
        billToCityZip: "",
        billToPhone: "",
        billToEmail: "",
      }));
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !formData.type) {
      toast.error("Please select a job type");
      return;
    }

    if (currentStep === 2) {
      // Validate required fields based on job type
      if (
        !formData.title ||
        !formData.description ||
        !formData.address ||
        !formData.cityZip
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (formData.type === "service-based" && !formData.customer) {
        toast.error("Please enter customer name for service-based jobs");
        return;
      }

      if (formData.type === "contract-based" && !formData.contractor) {
        toast.error("Please select a contractor for contract-based jobs");
        return;
      }
    }

    if (currentStep === 3) {
      if (!formData.dueDate) {
        toast.error("Please select a due date");
        return;
      }
      if (
        formData.assignedLabor.length === 0 &&
        formData.assignedLeadLabor.length === 0
      ) {
        toast.error("Please assign at least one lead labor or labor");
        return;
      }
      // For service-based jobs, contractor selection is optional in step 3
    }

    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreate = () => {
    const newJob: Job = {
      id: generateJobId(),
      title: formData.title,
      type: formData.type as "service-based" | "contract-based",
      status: "pending",
      assignedLeadLabor: formData.assignedLeadLabor,
      assignedLabor: formData.assignedLabor,
      contractor: formData.contractor || undefined,
      customer:
        formData.type === "service-based" ? formData.customer : undefined,
      description: formData.description,
      createdDate: new Date().toISOString().split("T")[0],
      dueDate: formData.dueDate,
      estimatedHours: formData.estimatedHours || undefined,
      estimatedCost: formData.estimatedCost || undefined,
      estimate: formData.estimate || undefined, // Include estimate
      materials: formData.materials.length > 0 ? formData.materials : undefined,
      address: formData.address,
      cityZip: formData.cityZip,
      phone: formData.phone,
      email: formData.email,
      billToAddress: formData.billToAddress,
      billToCityZip: formData.billToCityZip,
      billToPhone: formData.billToPhone,
      billToEmail: formData.billToEmail,
      sameAsAddress: formData.sameAsAddress,
      priority: formData.priority,
      billingStatus: "pending",
    };

    onJobCreated(newJob);
  };

  const toggleLeadLabor = (leadLabor: string) => {
    setFormData({
      ...formData,
      assignedLeadLabor: formData.assignedLeadLabor.includes(leadLabor)
        ? formData.assignedLeadLabor.filter((l) => l !== leadLabor)
        : [...formData.assignedLeadLabor, leadLabor],
    });
  };

  const toggleLabor = (labor: string) => {
    setFormData({
      ...formData,
      assignedLabor: formData.assignedLabor.includes(labor)
        ? formData.assignedLabor.filter((l) => l !== labor)
        : [...formData.assignedLabor, labor],
    });
  };

  const toggleMaterial = (material: string) => {
    setFormData({
      ...formData,
      materials: formData.materials.includes(material)
        ? formData.materials.filter((m) => m !== material)
        : [...formData.materials, material],
    });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8 relative">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center relative">
            <div
              className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
              ${
                isActive
                  ? "bg-[#00A1FF] border-[#00A1FF] text-white"
                  : isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-white border-gray-300 text-gray-500"
              }
            `}
            >
              <Icon className="h-5 w-5" />
              <div className=" text-center text-sm mt-20 w-full">
                <p
                  className={`font-medium ${
                    isActive
                      ? "text-[#00A1FF]"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`
                h-px w-32 mx-4 transition-all
                ${isCompleted ? "bg-green-500" : "bg-gray-300"}
              `}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderStep1 = () => (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader>
        <CardTitle className="text-center">Select Job Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`
              p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md
              ${
                formData.type === "service-based"
                  ? "border-[#00A1FF] bg-[#E6F6FF]"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
            onClick={() => setFormData({ ...formData, type: "service-based" })}
          >
            <div className="text-center space-y-4">
              <div
                className={`
                w-16 h-16 mx-auto rounded-full flex items-center justify-center
                ${
                  formData.type === "service-based"
                    ? "bg-[#00A1FF]"
                    : "bg-gray-100"
                }
              `}
              >
                <FileText
                  className={`h-8 w-8 ${
                    formData.type === "service-based"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                />
              </div>
              <div>
                <h3 className="font-medium text-[#2b2b2b] mb-2">
                  Service-Based Job
                </h3>
                <p className="text-sm text-gray-600">
                  One-time service jobs with specific deliverables and timeline.
                  Suitable for installations, repairs, and maintenance tasks.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`
              p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md
              ${
                formData.type === "contract-based"
                  ? "border-[#00A1FF] bg-[#E6F6FF]"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
            onClick={() => setFormData({ ...formData, type: "contract-based" })}
          >
            <div className="text-center space-y-4">
              <div
                className={`
                w-16 h-16 mx-auto rounded-full flex items-center justify-center
                ${
                  formData.type === "contract-based"
                    ? "bg-[#00A1FF]"
                    : "bg-gray-100"
                }
              `}
              >
                <Users
                  className={`h-8 w-8 ${
                    formData.type === "contract-based"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                />
              </div>
              <div>
                <h3 className="font-medium text-[#2b2b2b] mb-2">
                  Contract-Based Job
                </h3>
                <p className="text-sm text-gray-600">
                  Ongoing contract work with external contractors. Suitable for
                  long-term projects and outsourced services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader>
        <CardTitle className="text-center">
          {formData.type === "service-based" ? (
            <>service-based</>
          ) : (
            <>Contract-Based Job</>
          )}
        </CardTitle>
      </CardHeader>
      {formData.type === "service-based" ? (
        <>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter job title"
                />
              </div>

              {/* Customer field only for service-based jobs, Contractor field for contract-based */}

              <div className="space-y-2">
                <Label htmlFor="customer">Customer *</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) =>
                    setFormData({ ...formData, customer: e.target.value })
                  }
                  placeholder="Enter customer name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the job requirements and scope"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger className="md:w-1/2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Enhanced Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-[#00A1FF]" />
                <h3 className="font-medium text-[#2b2b2b]">
                  Location Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => {
                      const newFormData = {
                        ...formData,
                        address: e.target.value,
                      };
                      if (formData.sameAsAddress) {
                        newFormData.billToAddress = e.target.value;
                      }
                      setFormData(newFormData);
                    }}
                    placeholder="Enter street address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cityZip">City & Zip *</Label>
                  <Input
                    id="cityZip"
                    value={formData.cityZip}
                    onChange={(e) => {
                      const newFormData = {
                        ...formData,
                        cityZip: e.target.value,
                      };
                      if (formData.sameAsAddress) {
                        newFormData.billToCityZip = e.target.value;
                      }
                      setFormData(newFormData);
                    }}
                    placeholder="City, State ZIP"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const newFormData = {
                        ...formData,
                        phone: e.target.value,
                      };
                      if (formData.sameAsAddress) {
                        newFormData.billToPhone = e.target.value;
                      }
                      setFormData(newFormData);
                    }}
                    placeholder="Phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      const newFormData = {
                        ...formData,
                        email: e.target.value,
                      };
                      if (formData.sameAsAddress) {
                        newFormData.billToEmail = e.target.value;
                      }
                      setFormData(newFormData);
                    }}
                    placeholder="Email address"
                  />
                </div>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-5 w-5 text-[#00A1FF]" />
                <h3 className="font-medium text-[#2b2b2b]">
                  Bill To Information
                </h3>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="sameAsAddress"
                  checked={formData.sameAsAddress}
                  onCheckedChange={handleSameAsAddressChange}
                />
                <Label htmlFor="sameAsAddress" className="text-sm font-medium">
                  Same as Address
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billToAddress">Bill To Address</Label>
                  <Input
                    id="billToAddress"
                    value={formData.billToAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billToAddress: e.target.value,
                      })
                    }
                    placeholder="Enter billing address"
                    disabled={formData.sameAsAddress}
                    className={formData.sameAsAddress ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billToCityZip">Bill To City & Zip</Label>
                  <Input
                    id="billToCityZip"
                    value={formData.billToCityZip}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billToCityZip: e.target.value,
                      })
                    }
                    placeholder="City, State ZIP"
                    disabled={formData.sameAsAddress}
                    className={formData.sameAsAddress ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billToPhone">Bill To Phone</Label>
                  <Input
                    id="billToPhone"
                    value={formData.billToPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, billToPhone: e.target.value })
                    }
                    placeholder="Phone number"
                    disabled={formData.sameAsAddress}
                    className={formData.sameAsAddress ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billToEmail">Bill To Email</Label>
                  <Input
                    id="billToEmail"
                    type="email"
                    value={formData.billToEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, billToEmail: e.target.value })
                    }
                    placeholder="Email address"
                    disabled={formData.sameAsAddress}
                    className={formData.sameAsAddress ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </>
      ) : (
        <>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                <Label htmlFor="contractor">Select Contractor *</Label>
                <Select
                  value={formData.contractor}
                  onValueChange={(value) =>
                    setFormData({ ...formData, contractor: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select contractor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableContractors.map((contractor) => (
                      <SelectItem key={contractor} value={contractor}>
                        {contractor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter job title"
                />
              </div>

              {/* Customer field only for service-based jobs, Contractor field for contract-based */}

          
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the job requirements and scope"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger className="md:w-1/2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Enhanced Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-[#00A1FF]" />
                <h3 className="font-medium text-[#2b2b2b]">
                  Location Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => {
                      const newFormData = {
                        ...formData,
                        address: e.target.value,
                      };
                      if (formData.sameAsAddress) {
                        newFormData.billToAddress = e.target.value;
                      }
                      setFormData(newFormData);
                    }}
                    placeholder="Enter street address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cityZip">City & Zip *</Label>
                  <Input
                    id="cityZip"
                    value={formData.cityZip}
                    onChange={(e) => {
                      const newFormData = {
                        ...formData,
                        cityZip: e.target.value,
                      };
                      if (formData.sameAsAddress) {
                        newFormData.billToCityZip = e.target.value;
                      }
                      setFormData(newFormData);
                    }}
                    placeholder="City, State ZIP"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const newFormData = {
                        ...formData,
                        phone: e.target.value,
                      };
                      if (formData.sameAsAddress) {
                        newFormData.billToPhone = e.target.value;
                      }
                      setFormData(newFormData);
                    }}
                    placeholder="Phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      const newFormData = {
                        ...formData,
                        email: e.target.value,
                      };
                      if (formData.sameAsAddress) {
                        newFormData.billToEmail = e.target.value;
                      }
                      setFormData(newFormData);
                    }}
                    placeholder="Email address"
                  />
                </div>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-5 w-5 text-[#00A1FF]" />
                <h3 className="font-medium text-[#2b2b2b]">
                  Bill To Information
                </h3>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="sameAsAddress"
                  checked={formData.sameAsAddress}
                  onCheckedChange={handleSameAsAddressChange}
                />
                <Label htmlFor="sameAsAddress" className="text-sm font-medium">
                  Same as Address
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billToAddress">Bill To Address</Label>
                  <Input
                    id="billToAddress"
                    value={formData.billToAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billToAddress: e.target.value,
                      })
                    }
                    placeholder="Enter billing address"
                    disabled={formData.sameAsAddress}
                    className={formData.sameAsAddress ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billToCityZip">Bill To City & Zip</Label>
                  <Input
                    id="billToCityZip"
                    value={formData.billToCityZip}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billToCityZip: e.target.value,
                      })
                    }
                    placeholder="City, State ZIP"
                    disabled={formData.sameAsAddress}
                    className={formData.sameAsAddress ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billToPhone">Bill To Phone</Label>
                  <Input
                    id="billToPhone"
                    value={formData.billToPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, billToPhone: e.target.value })
                    }
                    placeholder="Phone number"
                    disabled={formData.sameAsAddress}
                    className={formData.sameAsAddress ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billToEmail">Bill To Email</Label>
                  <Input
                    id="billToEmail"
                    type="email"
                    value={formData.billToEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, billToEmail: e.target.value })
                    }
                    placeholder="Email address"
                    disabled={formData.sameAsAddress}
                    className={formData.sameAsAddress ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );

  const renderStep3 = () => (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader>
        <CardTitle>Resources & Scheduling</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date *</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>

          {/* Only show Time & Material fields for service-based jobs */}
          {formData.type === "service-based" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated Hours</Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  value={formData.estimatedHours || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimatedHours: Number(e.target.value),
                    })
                  }
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
                <Input
                  id="estimatedCost"
                  type="number"
                  value={formData.estimatedCost || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimatedCost: Number(e.target.value),
                    })
                  }
                  placeholder="0"
                />
              </div>
            </>
          )}

          {/* Estimate field for all job types */}
          <div className="space-y-2">
            <Label htmlFor="estimate" className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-[#00A1FF]" />
              Estimate ($)
            </Label>
            <Input
              id="estimate"
              type="number"
              value={formData.estimate || ""}
              onChange={(e) =>
                setFormData({ ...formData, estimate: Number(e.target.value) })
              }
              placeholder="0"
            />
          </div>
        </div>

        {/* Contractor selection for service-based jobs (optional) */}
        {formData.type === "service-based" && (
          <div className="space-y-2">
            <Label htmlFor="serviceContractor">Contractor (Optional)</Label>
            <Select
              value={formData.contractor || "none"}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  contractor: value === "none" ? "" : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select contractor (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No contractor</SelectItem>
                {availableContractors.map((contractor) => (
                  <SelectItem key={contractor} value={contractor}>
                    {contractor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Assigned Lead Labor Section */}
        <div>
          <Label className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-[#00A1FF]" />
            Assigned Lead Labor
          </Label>
          <p className="text-sm text-gray-600 mb-3">
            Select lead labor to assign to this job
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableLeadLabor.map((leadLabor) => (
              <div
                key={leadLabor}
                className={`
                  p-3 border rounded-lg cursor-pointer transition-all
                  ${
                    formData.assignedLeadLabor.includes(leadLabor)
                      ? "border-[#00A1FF] bg-[#E6F6FF]"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
                onClick={() => toggleLeadLabor(leadLabor)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.assignedLeadLabor.includes(leadLabor)}
                    onCheckedChange={() => toggleLeadLabor(leadLabor)}
                  />
                  <span className="text-sm font-medium">{leadLabor}</span>
                </div>
              </div>
            ))}
          </div>

          {formData.assignedLeadLabor.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected Lead Labor ({formData.assignedLeadLabor.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {formData.assignedLeadLabor.map((leadLabor) => (
                  <Badge
                    key={leadLabor}
                    className="bg-[#E6F6FF] text-[#00A1FF] border-[#00A1FF]/20"
                  >
                    {leadLabor}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Assigned Labor Section */}
        <div>
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#00A1FF]" />
            Assigned Labor
          </Label>
          <p className="text-sm text-gray-600 mb-3">
            Select labor to assign to this job
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableLabor.map((labor) => (
              <div
                key={labor}
                className={`
                  p-3 border rounded-lg cursor-pointer transition-all
                  ${
                    formData.assignedLabor.includes(labor)
                      ? "border-[#00A1FF] bg-[#E6F6FF]"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
                onClick={() => toggleLabor(labor)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.assignedLabor.includes(labor)}
                    onCheckedChange={() => toggleLabor(labor)}
                  />
                  <span className="text-sm font-medium">{labor}</span>
                </div>
              </div>
            ))}
          </div>

          {formData.assignedLabor.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected Labor ({formData.assignedLabor.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {formData.assignedLabor.map((labor) => (
                  <Badge
                    key={labor}
                    className="bg-[#E6F6FF] text-[#00A1FF] border-[#00A1FF]/20"
                  >
                    {labor}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader>
        <CardTitle>Materials (Optional)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-600">
          Select materials that will be needed for this job. You can add more
          materials later.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {commonMaterials.map((material) => (
            <div
              key={material}
              className={`
                p-3 border rounded-lg cursor-pointer transition-all
                ${
                  formData.materials.includes(material)
                    ? "border-[#00A1FF] bg-[#E6F6FF]"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
              onClick={() => toggleMaterial(material)}
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.materials.includes(material)}
                  onCheckedChange={() => toggleMaterial(material)}
                />
                <span className="text-sm font-medium">{material}</span>
              </div>
            </div>
          ))}
        </div>

        {formData.materials.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">
              Selected Materials ({formData.materials.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {formData.materials.map((material) => (
                <Badge
                  key={material}
                  className="bg-[#E6F6FF] text-[#00A1FF] border-[#00A1FF]/20"
                >
                  {material}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep5 = () => (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader>
        <CardTitle>Review & Create Job</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#2b2b2b] mb-3">Job Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <Badge className="bg-[#E6F6FF] text-[#00A1FF] border-[#00A1FF]/20">
                  {formData.type === "service-based"
                    ? "Service-Based"
                    : "Contract-Based"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Title:</span>
                <span className="font-medium">{formData.title}</span>
              </div>
              {formData.customer && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{formData.customer}</span>
                </div>
              )}
              {formData.contractor && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Contractor:</span>
                  <span className="font-medium">{formData.contractor}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Priority:</span>
                <Badge
                  className={
                    formData.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : formData.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {formData.priority.charAt(0).toUpperCase() +
                    formData.priority.slice(1)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-medium">
                  {new Date(formData.dueDate).toLocaleDateString()}
                </span>
              </div>
              {formData.estimate > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimate:</span>
                  <span className="font-medium">
                    ${formData.estimate.toLocaleString()}
                  </span>
                </div>
              )}
              {formData.type === "service-based" && (
                <>
                  {formData.estimatedHours > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Hours:</span>
                      <span className="font-medium">
                        {formData.estimatedHours}h
                      </span>
                    </div>
                  )}
                  {formData.estimatedCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Cost:</span>
                      <span className="font-medium">
                        ${formData.estimatedCost.toLocaleString()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Location & Team */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#2b2b2b] mb-3">Location & Team</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 block mb-1">Address:</span>
                <span className="font-medium">{formData.address}</span>
                <br />
                <span className="font-medium">{formData.cityZip}</span>
              </div>

              {formData.assignedLeadLabor.length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-2">Lead Labor:</span>
                  <div className="flex flex-wrap gap-1">
                    {formData.assignedLeadLabor.map((leadLabor) => (
                      <Badge
                        key={leadLabor}
                        className="bg-[#E6F6FF] text-[#00A1FF] border-[#00A1FF]/20 text-xs"
                      >
                        {leadLabor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {formData.assignedLabor.length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-2">Labor:</span>
                  <div className="flex flex-wrap gap-1">
                    {formData.assignedLabor.map((labor) => (
                      <Badge
                        key={labor}
                        className="bg-gray-100 text-gray-700 border-gray-200 text-xs"
                      >
                        {labor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {formData.materials.length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-2">
                    Materials ({formData.materials.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {formData.materials.slice(0, 3).map((material) => (
                      <Badge
                        key={material}
                        className="bg-purple-100 text-purple-800 border-purple-200 text-xs"
                      >
                        {material}
                      </Badge>
                    ))}
                    {formData.materials.length > 3 && (
                      <Badge className="bg-gray-100 text-gray-600 text-xs">
                        +{formData.materials.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-medium text-[#2b2b2b] mb-3">Description</h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">{formData.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-[70%] space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Button>
        <div>
          <h1 className="text-2xl font-medium text-[#2b2b2b]">
            Create New Job
          </h1>
          <p className="text-sm text-gray-600">
            Fill in the details to create a new job
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      {renderCurrentStep()}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-4">
          {currentStep < 5 ? (
            <Button
              onClick={handleNext}
              className="bg-[#00A1FF] hover:bg-[#0090e6] gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-700 gap-2"
            >
              <Check className="h-4 w-4" />
              Create Job
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
