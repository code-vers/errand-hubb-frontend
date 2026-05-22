import React from "react";
import { User, TableColumn } from "@/types/users";
import UserTableRow from "./UserTableRow";
import { Users } from "lucide-react";

interface UserTableProps {
  users: User[];
  onUserAction: (
    userId: string,
    action: "edit" | "deactivate" | "activate",
  ) => void;
  onViewUser: (user: User) => void;
  isLoading?: boolean;
  emptyStateMessage?: string;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onUserAction,
  onViewUser,
  isLoading = false,
  emptyStateMessage = "No clients found",
}) => {
  const columns: TableColumn[] = [
    { key: "name", label: "Client" },
    { key: "email", label: "Email" },
    { key: "postsCount", label: "Posts" },
    { key: "status", label: "Status" },
    { key: "joinedDate", label: "Joined" },
    { key: "actions", label: "Actions" },
  ];

  if (isLoading) {
    return (
      <div className='bg-white shadow rounded-lg overflow-hidden'>
        <div className='px-6 py-5 border-b border-border'>
          <div className='h-7 w-32 bg-gray-200 rounded animate-pulse'></div>
        </div>
        <div className='p-6 space-y-4'>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className='flex items-center space-x-4 animate-pulse'>
              <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
              <div className='flex-1 space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                <div className='h-3 bg-gray-200 rounded w-1/3'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white shadow rounded-lg overflow-hidden'>
      {/* Card Header */}
      <div className='px-6 py-5 border-b border-border'>
        <h2 className='text-xl font-bold text-foreground flex items-center gap-2'>
          Clients
          <span className='text-muted font-normal text-lg'>
            ({users.length})
          </span>
        </h2>
      </div>

      {/* Table Container */}
      {users.length === 0 ? (
        <div className='p-12 text-center'>
          <Users className='mx-auto h-12 w-12 text-muted' strokeWidth={1.5} />
          <p className='mt-4 text-muted'>{emptyStateMessage}</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-border'>
            {/* Table Head */}
            <thead className='bg-gray-50/50'>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider'>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className='bg-white divide-y divide-border'>
              {users.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onAction={onUserAction}
                  onViewUser={onViewUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
