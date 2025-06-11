"use client"

import { useState, useMemo } from "react"

/**
 * @typedef {Object} User
 * @property {string} [id] - User ID
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} phone - User phone
 */

/**
 * @typedef {Object} AdminUsersProps
 * @property {User[]} [users] - Array of users
 */

export default function UserData({ users = [] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Sample data for demonstration
  const sampleUsers = [
    { id: "1", name: "John Doe", email: "john.doe@example.com", phone: "+1 (555) 123-4567" },
    { id: "2", name: "Jane Smith", email: "jane.smith@example.com", phone: "+1 (555) 987-6543" },
    { id: "3", name: "Mike Johnson", email: "mike.johnson@example.com", phone: "+1 (555) 456-7890" },
    { id: "4", name: "Sarah Wilson", email: "sarah.wilson@example.com", phone: "+1 (555) 321-0987" },
    { id: "5", name: "David Brown", email: "david.brown@example.com", phone: "+1 (555) 654-3210" },
    { id: "6", name: "Emily Davis", email: "emily.davis@example.com", phone: "+1 (555) 789-0123" },
    { id: "7", name: "Robert Miller", email: "robert.miller@example.com", phone: "+1 (555) 234-5678" },
    { id: "8", name: "Lisa Anderson", email: "lisa.anderson@example.com", phone: "+1 (555) 876-5432" },
    { id: "9", name: "James Taylor", email: "james.taylor@example.com", phone: "+1 (555) 345-6789" },
    { id: "10", name: "Maria Garcia", email: "maria.garcia@example.com", phone: "+1 (555) 567-8901" },
    { id: "11", name: "William Martinez", email: "william.martinez@example.com", phone: "+1 (555) 678-9012" },
    { id: "12", name: "Jennifer Lopez", email: "jennifer.lopez@example.com", phone: "+1 (555) 789-0123" },
    { id: "13", name: "Michael Rodriguez", email: "michael.rodriguez@example.com", phone: "+1 (555) 890-1234" },
    { id: "14", name: "Ashley Thompson", email: "ashley.thompson@example.com", phone: "+1 (555) 901-2345" },
    { id: "15", name: "Christopher Lee", email: "christopher.lee@example.com", phone: "+1 (555) 012-3456" },
    { id: "16", name: "Amanda White", email: "amanda.white@example.com", phone: "+1 (555) 123-4567" },
    { id: "17", name: "Daniel Harris", email: "daniel.harris@example.com", phone: "+1 (555) 234-5678" },
    { id: "18", name: "Jessica Clark", email: "jessica.clark@example.com", phone: "+1 (555) 345-6789" },
    { id: "19", name: "Matthew Lewis", email: "matthew.lewis@example.com", phone: "+1 (555) 456-7890" },
    { id: "20", name: "Nicole Walker", email: "nicole.walker@example.com", phone: "+1 (555) 567-8901" },
  ]

  const displayUsers = users.length > 0 ? users : sampleUsers

  // Filter and paginate users
  const { filteredUsers, paginatedUsers, totalPages, totalFilteredUsers } = useMemo(() => {
    // Filter users based on search term
    const filtered = displayUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm),
    )

    // Calculate pagination
    const total = Math.ceil(filtered.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginated = filtered.slice(startIndex, endIndex)

    return {
      filteredUsers: filtered,
      paginatedUsers: paginated,
      totalPages: total,
      totalFilteredUsers: filtered.length,
    }
  }, [displayUsers, searchTerm, currentPage, pageSize])

  // Reset to first page when search term changes
  const handleSearchChange = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  // Reset to first page when page size changes
  const handlePageSizeChange = (value) => {
    setPageSize(Number.parseInt(value))
    setCurrentPage(1)
  }

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="container mx-auto p-12 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage and view all registered users</p>
        </div>
        <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            {totalFilteredUsers} Users
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
          <p className="text-gray-600 mt-1">A comprehensive list of all registered users in the system</p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">Show:</span>
              <select
                value={pageSize.toString()}
                onChange={(e) => handlePageSizeChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-16">#</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Name
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Email
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Phone
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user, index) => (
                    <tr key={user.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4 text-gray-600">{user.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                          />
                        </svg>
                        <p className="text-gray-500">No users found</p>
                        {searchTerm && <p className="text-sm text-gray-400">Try adjusting your search terms</p>}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalFilteredUsers)} of{" "}
                {totalFilteredUsers} users
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-8 h-8 text-sm rounded-md ${
                          currentPage === pageNum ? "bg-blue-600 text-white" : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
