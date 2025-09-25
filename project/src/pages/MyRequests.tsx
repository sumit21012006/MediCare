import React, { useState, useEffect } from 'react';
import { Clock, Package, CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';
import { User } from '../App';

interface Request {
  id: string;
  medicineId: string;
  medicineName: string;
  medicineImage: string;
  requestedQuantity: number;
  unit: string;
  urgency: 'low' | 'normal' | 'high' | 'critical';
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'delivered';
  requestDate: string;
  responseDate?: string;
  estimatedDelivery?: string;
  trackingId?: string;
  donor: string;
  notes?: string;
  rejectionReason?: string;
}

interface MyRequestsProps {
  user: User;
}

const MyRequests: React.FC<MyRequestsProps> = ({ user }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  useEffect(() => {
  // Load requests from localStorage for this user
  const allRequests = JSON.parse(localStorage.getItem('medicineRequests') || '[]');
  const userRequests = allRequests.filter((req: any) => req.userId === user.id);
  setRequests(userRequests);
  }, [user.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(request => request.status === filter);

  return (
    <div className="space-y-6">
      {/* User Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
          <p className="text-gray-600">Track your medicine requests and their status</p>
          <div className="mt-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            <div><span className="font-semibold">Name:</span> {user.name}</div>
            {user.organizationName && (
              <div><span className="font-semibold">Organization:</span> {user.organizationName}</div>
            )}
            <div><span className="font-semibold">Email:</span> {user.email}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Package className="h-4 w-4" />
          <span>{filteredRequests.length} requests</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'approved', 'delivered', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All Requests' : status}
              <span className="ml-2 text-xs">
                ({status === 'all' ? requests.length : requests.filter(r => r.status === status).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Request Info */}
              <div className="flex items-start space-x-4">
                <img
                  src={request.medicineImage}
                  alt={request.medicineName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{request.medicineName}</h3>
                      <p className="text-sm text-gray-600">Request ID: {request.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      {request.requestedQuantity} {request.unit}
                    </div>
                    <div>
                      Requested: {new Date(request.requestDate).toLocaleDateString()}
                    </div>
                    <div>
                      Donor: {request.donor}
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {request.purpose}
                  </p>

                  {/* Status and Urgency */}
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1 capitalize">{request.status}</span>
                    </span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency.toUpperCase()} PRIORITY
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions and Status Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {request.status === 'approved' && request.trackingId && (
                  <div className="text-sm">
                    <p className="text-gray-600">Tracking ID:</p>
                    <p className="font-mono text-blue-600">{request.trackingId}</p>
                    {request.estimatedDelivery && (
                      <p className="text-gray-500 text-xs">
                        Est. delivery: {new Date(request.estimatedDelivery).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}

                {request.status === 'rejected' && request.rejectionReason && (
                  <div className="text-sm text-red-600">
                    <p className="font-medium">Rejected</p>
                    <p className="text-xs">{request.rejectionReason}</p>
                  </div>
                )}

                <button
                  onClick={() => setSelectedRequest(request)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? "You haven't made any medicine requests yet" 
              : `No ${filter} requests found`}
          </p>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Request Details - {selectedRequest.id}
              </h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4 space-y-6">
              {/* Medicine Info */}
              <div className="flex items-start space-x-4">
                <img
                  src={selectedRequest.medicineImage}
                  alt={selectedRequest.medicineName}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{selectedRequest.medicineName}</h4>
                  <p className="text-sm text-gray-600">Donated by: {selectedRequest.donor}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {selectedRequest.requestedQuantity} {selectedRequest.unit}
                  </p>
                </div>
              </div>

              {/* Request Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Request Information</h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Urgency:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedRequest.urgency)}`}>
                        {selectedRequest.urgency.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Requested:</span>
                      <span className="ml-2">{new Date(selectedRequest.requestDate).toLocaleDateString()}</span>
                    </div>
                    {selectedRequest.responseDate && (
                      <div>
                        <span className="text-gray-600">Response:</span>
                        <span className="ml-2">{new Date(selectedRequest.responseDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {(selectedRequest.trackingId || selectedRequest.estimatedDelivery) && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Delivery Information</h5>
                    <div className="space-y-2 text-sm">
                      {selectedRequest.trackingId && (
                        <div>
                          <span className="text-gray-600">Tracking ID:</span>
                          <span className="ml-2 font-mono text-blue-600">{selectedRequest.trackingId}</span>
                        </div>
                      )}
                      {selectedRequest.estimatedDelivery && (
                        <div>
                          <span className="text-gray-600">Est. Delivery:</span>
                          <span className="ml-2">{new Date(selectedRequest.estimatedDelivery).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Purpose */}
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Purpose of Use</h5>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {selectedRequest.purpose}
                </p>
              </div>

              {/* Notes or Rejection Reason */}
              {(selectedRequest.notes || selectedRequest.rejectionReason) && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">
                    {selectedRequest.rejectionReason ? 'Rejection Reason' : 'Additional Notes'}
                  </h5>
                  <p className={`text-sm p-3 rounded-lg ${
                    selectedRequest.rejectionReason 
                      ? 'text-red-700 bg-red-50' 
                      : 'text-gray-700 bg-gray-50'
                  }`}>
                    {selectedRequest.rejectionReason || selectedRequest.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;