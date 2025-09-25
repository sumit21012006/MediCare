import React from 'react';
import { TrendingUp, Package, AlertTriangle, Clock, Users, Heart } from 'lucide-react';
import { User } from '../App';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const stats = [
    {
      name: 'Available Medicines',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Package,
    },
    {
      name: 'Pending Requests',
      value: '23',
      change: '+4.75%',
      changeType: 'positive',
      icon: Clock,
    },
    {
      name: 'Expiring Soon',
      value: '89',
      change: '-2.1%',
      changeType: 'negative',
      icon: AlertTriangle,
    },
    {
      name: 'Successful Deliveries',
      value: '456',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
    },
  ];

  const recentMedicines = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      quantity: '120 tablets',
      expiryDate: '2025-06-15',
      donor: 'Apollo Pharmacy',
      status: 'available',
    },
    {
      id: '2',
      name: 'Amoxicillin 250mg',
      quantity: '60 capsules',
      expiryDate: '2025-04-20',
      donor: 'MedPlus',
      status: 'available',
    },
    {
      id: '3',
      name: 'Cetirizine 10mg',
      quantity: '90 tablets',
      expiryDate: '2025-03-30',
      donor: 'Guardian Pharmacy',
      status: 'reserved',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-600">
            {user.organizationName} • {user.organizationType.replace('_', ' ').toUpperCase()}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
          <Heart className="h-4 w-4" />
          <span>Verified Organization</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                        <span className="ml-1">{stat.change}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Medicines */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recently Added Medicines
          </h3>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medicine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {medicine.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Donated by {medicine.donor}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {medicine.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(medicine.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        medicine.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {medicine.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;