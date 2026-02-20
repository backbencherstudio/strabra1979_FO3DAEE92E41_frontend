"use client";

import React, { useEffect, useRef, useState } from "react";
import { Ellipsis, Eye, Edit, Trash2 } from "lucide-react";

// Define ColumnConfig interface
interface ColumnConfig {
  label: React.ReactNode;
  width: string;
  accessor: string;
  sortable?: boolean;
  formatter?: (value: any, row: any) => React.ReactNode;
}

// ==================== USER TYPE BADGE COMPONENT ====================
const UserTypeBadge = ({ type }: { type: string }) => {
  let bgColor = "";
  let textColor = "";
  let dotColor = "";

  switch (type.toLowerCase()) {
    case "property manager":
      bgColor = "bg-[#2ABA3B]/10";
      textColor = "text-[#2ABA3B]";
      dotColor = "bg-[#2ABA3B]";
      break;
    case "authorized viewer":
      bgColor = "bg-[#3B7AFF]/10";
      textColor = "text-[#3B7AFF]";
      dotColor = "bg-[#3B7AFF]";
      break;
    case "operation":
      bgColor = "bg-[#FE5000]/10";
      textColor = "text-[#FE5000]";
      dotColor = "bg-[#FE5000]";
      break;
    default:
      bgColor = "bg-gray-400/10";
      textColor = "text-gray-400";
      dotColor = "bg-gray-400";
  }

  return (
    <div className={`${bgColor} ${textColor} px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-2`}>
      <span className={`w-1 h-1 rounded-full ${dotColor}`}></span>
      {type}
    </div>
  );
};

// ==================== USER STATUS BADGE COMPONENT ====================
const UserStatusBadge = ({ status }: { status: string }) => {
  let textColor = "";
  let borderColor = "";
  let dotColor = "";

  switch (status.toLowerCase()) {
    case "active":
      borderColor = "border-[#2ABA3B]";
      textColor = "text-[#2ABA3B]";
      dotColor = "bg-[#2ABA3B]";
      break;
    case "deactive":
      borderColor = "border-[#EB3D4D]";
      textColor = "text-[#EB3D4D]";
      dotColor = "bg-[#EB3D4D]";
      break;
    case "deleted":
      borderColor = "border-[#909296]";
      textColor = "text-[#909296]";
      dotColor = "bg-[#909296]";
      break;
    default:
      borderColor = "border-gray-400";
      textColor = "text-gray-400";
      dotColor = "bg-gray-400";
  }

  return (
    <p
      className={`${borderColor} ${textColor} border px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-2`}
    >
      <span className={`w-1 h-1 rounded-full ${dotColor}`}></span>
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

// ==================== USER ACTION BUTTON COMPONENT ====================
const UserActionButton = ({ rowData, onView, onEdit, onDelete }: { 
  rowData: any;
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">("bottom");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Check if user is deleted - disable actions for deleted users
  const isUserDeleted = rowData.status?.toLowerCase() === "deleted";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 120;

      const spaceBelow = viewportHeight - buttonRect.bottom;

      if (spaceBelow < dropdownHeight && buttonRect.top > dropdownHeight) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [isOpen]);

  const handleViewUser = () => {
    setIsOpen(false);
    if (onView) {
      onView(rowData);
    }
  };

  const handleEditUser = () => {
    setIsOpen(false);
    if (onEdit) {
      onEdit(rowData);
    }
  };

  const handleDeleteClick = () => {
    setIsOpen(false);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(rowData);
    }
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-[#2D2D2D] rounded flex items-center justify-center cursor-pointer"
          disabled={isUserDeleted}
        >
          <Ellipsis size={16} className={isUserDeleted ? "text-gray-600" : "text-gray-500"} />
        </button>

        {isOpen && (
          <div
            className={`fixed bg-[#2D2D2D] rounded-md shadow-lg p-1 z-50 overflow-hidden w-[160px]`}
            style={{
              top: dropdownPosition === "top"
                ? `${buttonRef.current?.getBoundingClientRect().top! - 120}px`
                : `${buttonRef.current?.getBoundingClientRect().bottom! + 5}px`,
              left: `${buttonRef.current?.getBoundingClientRect().left! - 140}px`,
            }}
          >
            {onView && (
              <button
                onClick={handleViewUser}
                disabled={isUserDeleted}
                className={`w-full p-2 text-sm text-left rounded-[4px] cursor-pointer flex items-center gap-2 ${
                  isUserDeleted
                    ? "text-gray-500 cursor-not-allowed opacity-50"
                    : "text-[#909296] hover:bg-[#1D1D1D]"
                }`}
              >
                <Eye size={14} />
                View Details
              </button>
            )}
            
            {onEdit && (
              <button
                onClick={handleEditUser}
                disabled={isUserDeleted}
                className={`w-full p-2 text-sm text-left rounded-[4px] cursor-pointer flex items-center gap-2 ${
                  isUserDeleted
                    ? "text-gray-500 cursor-not-allowed opacity-50"
                    : "text-[#909296] hover:bg-[#1D1D1D]"
                }`}
              >
                <Edit size={14} />
                Edit User
              </button>
            )}
            
            {onDelete && !isUserDeleted && (
              <button
                onClick={handleDeleteClick}
                className="w-full p-2 text-sm text-left rounded-[4px] cursor-pointer flex items-center gap-2 text-[#EB3D4D] hover:bg-[#1D1D1D]"
              >
                <Trash2 size={14} />
                Delete User
              </button>
            )}
          </div>
        )}
      </div>

      {/* Simple Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-[#1D1D1D] rounded-2xl max-w-[400px] w-full mx-4">
            <div className="p-6 flex flex-col justify-center items-center">
              <div className="bg-[#321D1F] h-16 w-16 flex justify-center items-center rounded-full">
                <Trash2 className="text-[#EB3D4D]" size={24} />
              </div>
              <h2 className="text-white text-xl font-semibold my-4 text-center">
                Delete User Account?
              </h2>
              <p className="text-[#909296] text-sm text-center mb-4">
                Are you sure you want to delete <span className="text-white font-medium">{rowData.name}</span>? This action cannot be undone.
              </p>
              
              <div className="flex justify-center items-center gap-3 mt-4 w-full">
                <button
                  onClick={handleCancelDelete}
                  className="text-white text-sm font-semibold border border-[#383A3F] flex-1 py-2 px-4 rounded-[8px] cursor-pointer hover:bg-[#2D2D2D] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="text-white text-sm font-semibold border border-[#EB3D4D] bg-[#EB3D4D] hover:bg-[#EB3D4D]/80 py-2 px-4 rounded-[8px] cursor-pointer transition-colors flex-1"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
          <p className="text-sm text-[#909296]">
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
          <p className="text-sm text-[#909296] font-medium">{value}</p>
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
      return <UserTypeBadge type={value} />;
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
          <p className="text-sm text-[#909296]">{value}</p>
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
          <p className="text-sm text-[#909296]">{formatUserDate(value)}</p>
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
    label: "Action",
    accessor: "action",
    width: "5%",
    formatter: (value: any, row: any) => {
      return (
        <UserActionButton 
          rowData={row} 
          onView={(row) => {
            // Handle view user
            console.log("View user:", row);
            // You can open a modal or navigate to user details page
          }}
          onEdit={(row) => {
            // Handle edit user
            console.log("Edit user:", row);
            // You can open an edit modal
          }}
          onDelete={(row) => {
            // Handle delete user
            console.log("Delete user:", row);
            // API call to delete user
          }}
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
    status: "deactive"
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
    status: "deactive"
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