"use client";

import React, { useEffect, useRef, useState } from "react";
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Dot } from "../icons/Dot";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "../icons/TrashIcon";

// Define ColumnConfig interface
interface ColumnConfig {
  label: React.ReactNode;
  width: string;
  accessor: string;
  sortable?: boolean;
  formatter?: (value: any, row: any) => React.ReactNode;
}

// ==================== USER STATUS BADGE COMPONENT ====================
const UserStatusBadge = ({ status }: { status: string }) => {
  let textColor = "";
  let borderColor = "";
  let backgroundColor = "";

  switch (status.toLowerCase()) {
    case "active":
      borderColor = "border-[#D9E5FF]";
      textColor = "text-[#3366CF]";
      backgroundColor = "bg-[#e5f3fe]";
      break;
    case "deactivated":
      borderColor = "border-[#f6e7dc]";
      textColor = "text-[#9a6036]";
      backgroundColor = "bg-[#fbf5db]";
      break;
    case "deleted":
      borderColor = "border-[#ffd5d5]";
      textColor = "text-[#a12a24]";
      backgroundColor = "bg-[#ffdede]";
      break;
    default:
      borderColor = "border-gray-400";
      textColor = "text-gray-400";
  }

  return (
    <p
      className={`${borderColor} ${textColor} ${backgroundColor} border px-3 py-1.5 rounded-[4px] text-xs font-medium inline-block`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </p>
  );
};

// ==================== DATE FORMATTER ====================
const formatUserDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

// ==================== DEACTIVATE USER DIALOG ====================
const DeactivateUserDialog = ({ 
  children, 
  rowData 
}: { 
  children: React.ReactNode;
  rowData: any;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      <DialogContent className="sm:max-w-[522px] bg-[#ffffff] [&>button]:hidden rounded-4xl border border-[#ede9df] p-12"   >
      
        <div className="">
          <h2 className="text-2xl font-semibold text-center text-[#1d1f2c]">Deactivate User</h2>
          <p className="text-base text-[#777980] mt-2 text-center">
          Are you sure you want to deactivate this user?
          </p>
          <div className=" flex justify-center items-center gap-4 mt-6">
            <button className=" border border-[#e7eaeb] rounded-lg py-3.5 flex-1 text-[#0b2a3b] font-medium text-sm" onClick={()=>setOpen(false)}>Cancel</button>
            <button className=" border border-[#e7eaeb] rounded-lg py-3.5 flex-1 text-white bg-[#eb3d4d] font-medium text-sm" onClick={()=>setOpen(false)}>Deactive</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ==================== ASSIGN PROPERTY DIALOG ====================
const AssignPropertyDialog = ({ 
  children, 
  rowData 
}: { 
  children: React.ReactNode;
  rowData: any;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <div className="">
          <h2 className="text-2xl font-semibold text-center text-[#1d1f2c]">Deactivate User</h2>
          <p className="text-base text-[#777980] mt-2 text-center">
          Are you sure you want to deactivate this user?
          </p>
          <div className=" flex justify-center items-center gap-4 mt-6">
            <button className=" border border-[#e7eaeb] rounded-lg py-3.5 flex-1 text-[#0b2a3b] font-medium text-sm" onClick={()=>setOpen(false)}>Cancel</button>
            <button className=" border border-[#e7eaeb] rounded-lg py-3.5 flex-1 text-white bg-[#eb3d4d] font-medium text-sm" onClick={()=>setOpen(false)}>Deactive</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ==================== DELETE USER DIALOG ====================
const DeleteUserDialog = ({ 
  children, 
  rowData,
  onConfirm 
}: { 
  children: React.ReactNode;
  rowData: any;
  onConfirm?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[522px] bg-[#ffffff] [&>button]:hidden rounded-4xl border border-[#ede9df] p-12">
      <div className="">
        <div className=" flex justify-center">
        <div className=" bg-[#eb3d4d] inline-block rounded-[12px] px-4 py-3.5">
        <TrashIcon/>
        </div>

        </div>

          <h2 className="text-2xl font-semibold text-center text-[#1d1f2c] mt-3">Delete User Account</h2>
          <p className="text-base text-[#777980] mt-2 text-center">
          Are you sure you want to delete this user account?
          </p>
          <div className=" flex justify-center items-center gap-4 mt-6">
            <button className=" border border-[#e7eaeb] rounded-lg py-3.5 flex-1 text-[#0b2a3b] font-medium text-sm" onClick={()=>setOpen(false)}>Cancel</button>
            <button className=" border border-[#e7eaeb] rounded-lg py-3.5 flex-1 text-white bg-[#eb3d4d] font-medium text-sm" onClick={()=>setOpen(false)}>Delete Account</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ==================== USER ACTION BUTTON COMPONENT ====================
const UserActionButton = ({ 
  rowData, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  rowData: any;
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}) => {
  // Check if user is deleted - disable actions for deleted users
  const isUserDeleted = rowData.status?.toLowerCase() === "deleted";

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(rowData);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 p-0 hover:bg-[#f6f8fa]"
            disabled={isUserDeleted}
          >
            <Dot className={`h-4 w-4 ${isUserDeleted ? "text-gray-600" : "text-gray-500"}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="bg-[#f6f8fa] text-white min-w-[167px] shadow-xl p-3"
        >
          <DropdownMenuGroup>
            {onView && (
              <DeactivateUserDialog rowData={rowData}>
                <DropdownMenuItem 
                  onSelect={(e) => e.preventDefault()}
                  disabled={isUserDeleted}
                  className={`cursor-pointer focus:bg-[#1D1D1D] focus:text-white text-[#5c707c] text-sm ${
                    isUserDeleted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Deactivate User
                </DropdownMenuItem>
              </DeactivateUserDialog>
            )}
            
            {onEdit && (
              <AssignPropertyDialog rowData={rowData}>
                <DropdownMenuItem 
                  onSelect={(e) => e.preventDefault()}
                  disabled={isUserDeleted}
                  className={`cursor-pointer focus:bg-[#1D1D1D] focus:text-white text-[#5c707c] text-sm ${
                    isUserDeleted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Assign to a property
                </DropdownMenuItem>
              </AssignPropertyDialog>
            )}
          </DropdownMenuGroup>
          
          {onDelete && !isUserDeleted && (
            <DropdownMenuGroup>
              <DeleteUserDialog 
                rowData={rowData} 
                onConfirm={handleConfirmDelete}
              >
                <DropdownMenuItem 
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer focus:bg-[#1D1D1D] focus:text-white text-[#5c707c] text-sm"
                >
                  Delete User
                </DropdownMenuItem>
              </DeleteUserDialog>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

// ==================== USER COLUMNS CONFIGURATION ====================
export const UserManagementColumns: ColumnConfig[] = [
  {
    label: "No.",
    width: "8%",
    accessor: "no",
    sortable: true,
    formatter: (item: number | string, row: any) => {
      const num = typeof item === "string" ? parseInt(item) : item;
      return (
        <div className="flex items-center">
          <p className="text-xs text-[#4a4c56]">
            {num < 10 ? `0${num}` : num}
          </p>
        </div>
      );
    },
  },
  {
    label: "Name",
    width: "20%",
    accessor: "name",
    sortable: true,
    formatter: (value: string, row: any) => {
      return (
        <div>
          <p className="text-xs text-[#4a4c56] ">{value}</p>
        </div>
      );
    },
  },
  {
    label: "User Type",
    width: "18%",
    accessor: "userType",
    sortable: true,
    formatter: (value: string, row: any) => {
      return <p className="text-xs text-[#4a4c56] ">{value}</p>;
    },
  },
  {
    label: "Email",
    width: "22%",
    accessor: "email",
    sortable: true,
    formatter: (value: string, row: any) => {
      return (
        <div>
          <p className="text-xs text-[#4a4c56]">{value}</p>
        </div>
      );
    },
  },
  {
    label: "Date",
    width: "15%",
    accessor: "date",
    sortable: true,
    formatter: (value: string, row: any) => {
      return (
        <div>
          <p className="text-xs text-[#4a4c56]">{formatUserDate(value)}</p>
        </div>
      );
    },
  },
  {
    label: "Status",
    width: "12%",
    accessor: "status",
    sortable: true,
    formatter: (value: string, row: any) => {
      return <UserStatusBadge status={value} />;
    },
  },
  {
    label: "",
    accessor: "action",
    width: "5%",
    formatter: (value: any, row: any) => {
      return (
        <UserActionButton 
          rowData={row} 
          onView={(row) => console.log("View", row)}
          onEdit={(row) => console.log("Edit", row)}
          onDelete={(row) => console.log("Delete", row)}
        />
      );
    },
  },
];

// ==================== DEMO DATA ====================
export const demoUserData = [
  {
    id: "usr_001",
    no: 1,
    name: "John Smith",
    userType: "Property Manager",
    email: "john.smith@example.com",
    date: "2026-01-15T10:30:00Z",
    status: "active"
  },
  {
    id: "usr_002",
    no: 2,
    name: "Sarah Johnson",
    userType: "Authorized Viewer",
    email: "sarah.johnson@example.com",
    date: "2026-01-12T14:20:00Z",
    status: "active"
  },
  {
    id: "usr_003",
    no: 3,
    name: "Michael Chen",
    userType: "Operation",
    email: "michael.chen@example.com",
    date: "2026-01-10T09:15:00Z",
    status: "deactivated"
  },
  {
    id: "usr_004",
    no: 4,
    name: "Emily Rodriguez",
    userType: "Property Manager",
    email: "emily.rodriguez@example.com",
    date: "2026-01-08T16:45:00Z",
    status: "active"
  },
  {
    id: "usr_005",
    no: 5,
    name: "David Kim",
    userType: "Authorized Viewer",
    email: "david.kim@example.com",
    date: "2026-01-05T11:00:00Z",
    status: "deleted"
  },
  {
    id: "usr_006",
    no: 6,
    name: "Lisa Thompson",
    userType: "Operation",
    email: "lisa.thompson@example.com",
    date: "2026-01-03T13:30:00Z",
    status: "active"
  },
  {
    id: "usr_007",
    no: 7,
    name: "James Wilson",
    userType: "Property Manager",
    email: "james.wilson@example.com",
    date: "2025-12-28T10:00:00Z",
    status: "active"
  },
  {
    id: "usr_008",
    no: 8,
    name: "Maria Garcia",
    userType: "Authorized Viewer",
    email: "maria.garcia@example.com",
    date: "2025-12-25T15:20:00Z",
    status: "active"
  },
  {
    id: "usr_009",
    no: 9,
    name: "Robert Brown",
    userType: "Property Manager",
    email: "robert.brown@example.com",
    date: "2025-12-20T12:00:00Z",
    status: "deactivated"
  },
  {
    id: "usr_010",
    no: 10,
    name: "Jennifer Lee",
    userType: "Operation",
    email: "jennifer.lee@example.com",
    date: "2025-12-18T09:45:00Z",
    status: "active"
  }
];