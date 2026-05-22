import React from "react";
import { User, UserAction } from "@/types/users";

interface UserTableRowProps {
  user: User;
  onAction: (userId: string, action: UserAction["type"]) => void;
  onViewUser: (user: User) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user, onAction, onViewUser }) => {
  const getStatusStyle = (status: User["status"]) => {
    return status === "active" ? "text-success bg-green-50" : "text-muted bg-gray-50";
  };

  const getStatusDot = (status: User["status"]) => {
    return status === "active" ? "bg-success" : "bg-gray-400";
  };

  const getActionButton = (user: User): UserAction[] => {
    if (user.status === "active") {
      return [
        {
          type: "edit",
          label: "Edit",
          className: "bg-gray-100 text-gray-600 hover:bg-gray-200",
        },
        {
          type: "deactivate",
          label: "Deactivate",
          className: "bg-red-50 text-error hover:bg-red-100",
        },
      ];
    }

    return [
      {
        type: "edit",
        label: "Edit",
        className: "bg-gray-100 text-gray-600 hover:bg-gray-200",
      },
      {
        type: "activate",
        label: "Activate",
        className: "bg-green-50 text-success hover:bg-green-100",
      },
    ];
  };

  const actions = getActionButton(user);

  return (
    <tr className='table-row-hover transition-colors duration-150 hover:bg-hover'>
      {/* Client Info */}
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div
            className='flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity'
            style={{ backgroundColor: user.avatarColor }}
            onClick={() => onViewUser(user)}
          >
            {user.initials}
          </div>
          <div className='ml-4'>
            <button 
              onClick={() => onViewUser(user)}
              className='text-sm font-medium text-foreground hover:text-primary transition-colors focus:outline-none'
            >
              {user.name}
            </button>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-text-secondary'>{user.email}</div>
      </td>

      {/* Posts Count */}
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-text-secondary'>{user.postsCount}</div>
      </td>

      {/* Status */}
      <td className='px-6 py-4 whitespace-nowrap'>
        <span
          className={`px-3 py-1 inline-flex items-center text-[10px] leading-4 font-bold rounded-full border border-current ${getStatusStyle(user.status)}`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusDot(user.status)}`}></span>
          {user.status.toUpperCase()}
        </span>
      </td>

      {/* Joined Date */}
      <td className='px-6 py-4 whitespace-nowrap text-sm text-text-secondary'>
        {user.joinedDate}
      </td>

      {/* Actions */}
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
        <div className='flex items-center gap-2'>
          {actions.map((action) => (
            <button
              key={action.type}
              onClick={() => onAction(user.id, action.type)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary ${action.className}`}
              aria-label={`${action.label} ${user.name}`}>
              {action.label}
            </button>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
