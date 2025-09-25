import React from 'react';
import { MapPin, Clock, Package, ShoppingCart, AlertTriangle } from 'lucide-react';

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

interface MedicineCardProps {
  medicine: Medicine;
  onRequest: () => void;
  daysToExpiry: number;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onRequest, daysToExpiry }) => {
  const getExpiryStatus = () => {
    if (daysToExpiry <= 30) return { color: 'text-red-600', bg: 'bg-red-50', label: 'Expires Soon' };
    if (daysToExpiry <= 60) return { color: 'text-orange-600', bg: 'bg-orange-50', label: 'Expires in 2 months' };
    return { color: 'text-green-600', bg: 'bg-green-50', label: 'Good shelf life' };
  };

  const expiryStatus = getExpiryStatus();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={medicine.imageUrl}
          alt={medicine.name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${expiryStatus.bg} ${expiryStatus.color}`}>
          {daysToExpiry} days left
        </div>
        {daysToExpiry <= 30 && (
          <div className="absolute top-2 left-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{medicine.name}</h3>
          <p className="text-sm text-gray-600">{medicine.genericName}</p>
          <p className="text-xs text-gray-500">{medicine.manufacturer}</p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Package className="h-4 w-4 mr-2 text-gray-400" />
            <span>{medicine.quantity} {medicine.unit}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span>Expires: {new Date(medicine.expiryDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{medicine.location}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500">Donated by</p>
              <p className="text-sm font-medium text-gray-900">{medicine.donor}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Est. Value</p>
              <p className="text-sm font-medium text-gray-900">₹{medicine.estimatedValue}</p>
            </div>
          </div>

          <div className="mb-3">
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${
              medicine.category === 'pain-relief' ? 'bg-blue-100 text-blue-800' :
              medicine.category === 'antibiotics' ? 'bg-green-100 text-green-800' :
              medicine.category === 'vitamins' ? 'bg-purple-100 text-purple-800' :
              medicine.category === 'cardiovascular' ? 'bg-red-100 text-red-800' :
              medicine.category === 'diabetes' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {medicine.category.replace('-', ' ')}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {medicine.description}
          </p>

          <button
            onClick={onRequest}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Request Medicine</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;