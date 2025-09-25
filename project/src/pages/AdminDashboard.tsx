import React, { useState, useEffect } from 'react';
import { Package, Users, TrendingUp, AlertTriangle, Eye, CheckCircle, XCircle } from 'lucide-react';

interface AdminStats {
  totalMedicines: number;
  totalRequests: number;
  pendingRequests: number;
  totalOrganizations: number;
  medicinesDelivered: number;
  expiringMedicines: number;
}

interface Request {
  id: string;
  organizationName: string;
  medicineName: string;
  quantity: number;
  unit: string;
  urgency: string;
  requestDate: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  // Medicine requests approval logic
  const [pendingMedicineRequests, setPendingMedicineRequests] = useState<any[]>([]);

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('medicineRequests') || '[]');
    setPendingMedicineRequests(requests.filter((r: any) => r.status === 'pending'));
  }, []);

  const handleApproveMedicineRequest = (id: string) => {
    const requests = JSON.parse(localStorage.getItem('medicineRequests') || '[]');
    const updated = requests.map((r: any) => r.id === id ? { ...r, status: 'approved' } : r);
    localStorage.setItem('medicineRequests', JSON.stringify(updated));
    setPendingMedicineRequests(updated.filter((r: any) => r.status === 'pending'));
  };
  const handleRejectMedicineRequest = (id: string) => {
    const requests = JSON.parse(localStorage.getItem('medicineRequests') || '[]');
    const updated = requests.map((r: any) => r.id === id ? { ...r, status: 'rejected' } : r);
    localStorage.setItem('medicineRequests', JSON.stringify(updated));
    setPendingMedicineRequests(updated.filter((r: any) => r.status === 'pending'));
  };
  // Pending user approval logic
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    setPendingUsers(allUsers.filter((u: any) => !u.verified));
  }, []);

  const handleApproveUser = (email: string) => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const updated = allUsers.map((u: any) => u.email === email ? { ...u, verified: true } : u);
    localStorage.setItem('allUsers', JSON.stringify(updated));
    setPendingUsers(updated.filter((u: any) => !u.verified));
  };
  const handleRejectUser = (email: string) => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const updated = allUsers.filter((u: any) => u.email !== email);
    localStorage.setItem('allUsers', JSON.stringify(updated));
    setPendingUsers(updated.filter((u: any) => !u.verified));
  };
  const [stats, setStats] = useState<AdminStats>({
    totalMedicines: 1247,
    totalRequests: 89,
    pendingRequests: 23,
    totalOrganizations: 156,
    medicinesDelivered: 456,
    expiringMedicines: 12
  });

  const [recentRequests, setRecentRequests] = useState<Request[]>([
    {
      id: 'REQ001',
      organizationName: 'City General Hospital',
      medicineName: 'Paracetamol 500mg',
      quantity: 50,
      unit: 'tablets',
      urgency: 'high',
      requestDate: '2024-11-28',
      status: 'pending'
    },
    {
      id: 'REQ002',
      organizationName: 'Care Foundation',
      medicineName: 'Amoxicillin 250mg',
      quantity: 30,
      unit: 'capsules',
      urgency: 'normal',
      requestDate: '2024-11-30',
      status: 'pending'
    },
    {
      id: 'REQ003',
      organizationName: 'Rural Health Clinic',
      medicineName: 'Cetirizine 10mg',
      quantity: 25,
      unit: 'tablets',
      urgency: 'critical',
      requestDate: '2024-11-29',
      status: 'pending'
    }
  ]);

  const handleApproveRequest = (requestId: string) => {
    setRecentRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'approved' } : req
      )
    );
  };

  const handleRejectRequest = (requestId: string) => {
    setRecentRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
  <div>
      {/* Pending Medicine Requests Approval */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Pending Medicine Requests</h3>
        </div>
        <div className="p-6">
          {pendingMedicineRequests.length === 0 ? (
            <p className="text-gray-500">No pending medicine requests for approval.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Requested By</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingMedicineRequests.map((req) => (
                  <tr key={req.id}>
                    <td className="px-4 py-2">{req.medicineName || req.medicine?.name}</td>
                    <td className="px-4 py-2">{req.userId}</td>
                    <td className="px-4 py-2">{req.requestedQuantity || req.quantity} {req.unit}</td>
                    <td className="px-4 py-2 capitalize">{req.status}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleApproveMedicineRequest(req.id)} className="text-green-600 hover:text-green-900 mr-2">Approve</button>
                      <button onClick={() => handleRejectMedicineRequest(req.id)} className="text-red-600 hover:text-red-900">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="space-y-6">
        {/* Pending User Approvals */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Pending User Approvals</h3>
          </div>
          <div className="p-6">
            {pendingUsers.length === 0 ? (
              <p className="text-gray-500">No pending users for approval.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingUsers.map((user) => (
                    <tr key={user.email}>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2 capitalize">{user.organizationType}</td>
                      <td className="px-4 py-2">
                        <button onClick={() => handleApproveUser(user.email)} className="text-green-600 hover:text-green-900 mr-2">Approve</button>
                        <button onClick={() => handleRejectUser(user.email)} className="text-red-600 hover:text-red-900">Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage medicines, requests, and organizations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Medicines
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stats.totalMedicines.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Organizations
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stats.totalOrganizations}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Medicines Delivered
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stats.medicinesDelivered}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Requests
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stats.pendingRequests}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Expiring Soon
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stats.expiringMedicines}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Requests
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stats.totalRequests}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Medicine Requests
          </h3>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Urgency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {request.medicineName}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {request.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.organizationName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.quantity} {request.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {request.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {request.status === 'pending' ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveRequest(request.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
              View All Medicines
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
              Manage Organizations
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
              Generate Reports
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">12 medicines expiring soon</p>
                <p className="text-xs text-gray-500">Within next 30 days</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">5 critical requests</p>
                <p className="text-xs text-gray-500">Require immediate attention</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-900">New organization registered</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900">Medicine donation added</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900">Request approved</p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AdminDashboard;