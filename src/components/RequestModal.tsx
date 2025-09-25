import React, { useState } from 'react';
import { X, Package, MapPin, Clock } from 'lucide-react';
import { User } from '../App';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  batchNo: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  category: string;
  description: string;
  location: string;
  donor: string;
  imageUrl: string;
  addedDate: string;
  estimatedValue: number;
}

interface RequestModalProps {
  medicine: Medicine;
  user: User;
  onSubmit: (requestData: any) => void;
  onClose: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ medicine, user, onSubmit, onClose }) => {
  const [requestData, setRequestData] = useState({
    requestedQuantity: 1,
    urgency: 'normal',
    purpose: '',
    patientCount: '',
    deliveryAddress: '',
    contactPerson: '',
    contactPhone: '',
    additionalNotes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requestPayload = {
      medicineId: medicine.id,
      medicine: medicine,
      requester: user,
      ...requestData,
      requestDate: new Date().toISOString(),
      status: 'pending',
    };
    
    onSubmit(requestPayload);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequestData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Request Medicine
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Medicine Details */}
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-4">
            <img
              src={medicine.imageUrl}
              alt={medicine.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{medicine.name}</h4>
              <p className="text-sm text-gray-600">{medicine.genericName}</p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  {medicine.quantity} {medicine.unit} available
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Expires: {new Date(medicine.expiryDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {medicine.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requested Quantity *
              </label>
              <input
                type="number"
                name="requestedQuantity"
                value={requestData.requestedQuantity}
                onChange={handleInputChange}
                min="1"
                max={medicine.quantity}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum available: {medicine.quantity} {medicine.unit}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urgency Level *
              </label>
              <select
                name="urgency"
                value={requestData.urgency}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low - Routine</option>
                <option value="normal">Normal - Standard</option>
                <option value="high">High - Urgent</option>
                <option value="critical">Critical - Emergency</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose of Use *
            </label>
            <textarea
              name="purpose"
              value={requestData.purpose}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe how this medicine will be used (e.g., patient treatment, health camp, etc.)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Patient Count
              </label>
              <input
                type="number"
                name="patientCount"
                value={requestData.patientCount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Number of patients to benefit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person *
              </label>
              <input
                type="text"
                name="contactPerson"
                value={requestData.contactPerson}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name of contact person"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone *
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={requestData.contactPhone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address *
            </label>
            <textarea
              name="deliveryAddress"
              value={requestData.deliveryAddress}
              onChange={handleInputChange}
              required
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Complete address for medicine delivery"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={requestData.additionalNotes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional information or special requirements"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;