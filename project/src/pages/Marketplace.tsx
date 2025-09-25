import React, { useState, useEffect } from 'react';
import { Search, Filter, Package } from 'lucide-react';
import { User } from '../App';
import MedicineCard from '../components/MedicineCard';
import RequestModal from '../components/RequestModal';

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

interface MarketplaceProps {
  user: User;
}

const Marketplace: React.FC<MarketplaceProps> = ({ user }) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('expiry');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const categories = [
    'all',
    'pain-relief',
    'antibiotics',
    'vitamins',
    'cardiovascular',
    'diabetes',
    'respiratory',
    'digestive',
    'other'
  ];

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockMedicines: Medicine[] = [
      {
        id: '1',
        name: 'Paracetamol 500mg',
        genericName: 'Acetaminophen',
        manufacturer: 'Johnson & Johnson',
        batchNo: 'PCM2024001',
        expiryDate: '2025-06-15',
        quantity: 120,
        unit: 'tablets',
        category: 'pain-relief',
        description: 'Pain relief and fever reducer',
        location: 'Mumbai, Maharashtra',
        donor: 'Apollo Pharmacy',
        imageUrl: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
        addedDate: '2024-12-01',
        estimatedValue: 180
      },
      {
        id: '2',
        name: 'Amoxicillin 250mg',
        genericName: 'Amoxicillin',
        manufacturer: 'Cipla Ltd',
        batchNo: 'AMX2024002',
        expiryDate: '2025-04-20',
        quantity: 60,
        unit: 'capsules',
        category: 'antibiotics',
        description: 'Broad-spectrum antibiotic',
        location: 'Delhi, NCR',
        donor: 'MedPlus Pharmacy',
        imageUrl: 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=300',
        addedDate: '2024-11-28',
        estimatedValue: 240
      },
      {
        id: '3',
        name: 'Cetirizine 10mg',
        genericName: 'Cetirizine HCl',
        manufacturer: 'Sun Pharma',
        batchNo: 'CET2024003',
        expiryDate: '2025-03-30',
        quantity: 90,
        unit: 'tablets',
        category: 'respiratory',
        description: 'Antihistamine for allergies',
        location: 'Bangalore, Karnataka',
        donor: 'Guardian Pharmacy',
        imageUrl: 'https://images.pexels.com/photos/3683077/pexels-photo-3683077.jpeg?auto=compress&cs=tinysrgb&w=300',
        addedDate: '2024-11-25',
        estimatedValue: 135
      },
      {
        id: '4',
        name: 'Metformin 500mg',
        genericName: 'Metformin HCl',
        manufacturer: 'Dr. Reddy\'s',
        batchNo: 'MET2024004',
        expiryDate: '2025-08-10',
        quantity: 200,
        unit: 'tablets',
        category: 'diabetes',
        description: 'Type 2 diabetes management',
        location: 'Chennai, Tamil Nadu',
        donor: 'Fortis Hospital',
        imageUrl: 'https://images.pexels.com/photos/3683083/pexels-photo-3683083.jpeg?auto=compress&cs=tinysrgb&w=300',
        addedDate: '2024-11-30',
        estimatedValue: 320
      },
      {
        id: '5',
        name: 'Vitamin D3 1000 IU',
        genericName: 'Cholecalciferol',
        manufacturer: 'Himalaya',
        batchNo: 'VTD2024005',
        expiryDate: '2025-12-15',
        quantity: 150,
        unit: 'capsules',
        category: 'vitamins',
        description: 'Bone health supplement',
        location: 'Pune, Maharashtra',
        donor: 'Apollo Hospitals',
        imageUrl: 'https://images.pexels.com/photos/3683093/pexels-photo-3683093.jpeg?auto=compress&cs=tinysrgb&w=300',
        addedDate: '2024-12-02',
        estimatedValue: 280
      },
      {
        id: '6',
        name: 'Omeprazole 20mg',
        genericName: 'Omeprazole',
        manufacturer: 'Lupin',
        batchNo: 'OME2024006',
        expiryDate: '2025-05-25',
        quantity: 75,
        unit: 'capsules',
        category: 'digestive',
        description: 'Proton pump inhibitor for acid reflux',
        location: 'Hyderabad, Telangana',
        donor: 'Max Healthcare',
        imageUrl: 'https://images.pexels.com/photos/3683086/pexels-photo-3683086.jpeg?auto=compress&cs=tinysrgb&w=300',
        addedDate: '2024-11-27',
        estimatedValue: 195
      }
    ];

    setMedicines(mockMedicines);
    setFilteredMedicines(mockMedicines);
  }, []);

  useEffect(() => {
    let filtered = medicines;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(medicine => medicine.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'expiry':
        filtered.sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
        break;
      case 'quantity':
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'added':
        filtered.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
        break;
    }

    setFilteredMedicines(filtered);
  }, [medicines, searchTerm, selectedCategory, sortBy]);

  const handleRequestMedicine = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setShowRequestModal(true);
  };

  const handleSubmitRequest = (requestData: any) => {
    // Save request to localStorage for admin approval
    const existingRequests = JSON.parse(localStorage.getItem('medicineRequests') || '[]');
    const newRequest = {
      ...requestData,
      userId: user.id,
      userType: user.organizationType,
      id: `REQ${Date.now()}`,
      status: 'pending',
    };
    localStorage.setItem('medicineRequests', JSON.stringify([...existingRequests, newRequest]));
    setShowRequestModal(false);
    setSelectedMedicine(null);
    // Show success message or redirect
  };

  const getDaysToExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medicine Marketplace</h1>
          <p className="text-gray-600">Browse and request available donated medicines</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Package className="h-4 w-4" />
          <span>{filteredMedicines.length} medicines available</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search medicines, generic names, or manufacturers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.replace('-', ' ').toUpperCase()}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="expiry">Sort by Expiry Date</option>
              <option value="quantity">Sort by Quantity</option>
              <option value="name">Sort by Name</option>
              <option value="added">Sort by Date Added</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry within (days)
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Any</option>
                  <option>30 days</option>
                  <option>60 days</option>
                  <option>90 days</option>
                  <option>6 months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Quantity
                </label>
                <input
                  type="number"
                  placeholder="Enter minimum quantity"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City or state"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            onRequest={() => handleRequestMedicine(medicine)}
            daysToExpiry={getDaysToExpiry(medicine.expiryDate)}
          />
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Request Modal */}
      {showRequestModal && selectedMedicine && (
        <RequestModal
          medicine={selectedMedicine}
          user={user}
          onSubmit={handleSubmitRequest}
          onClose={() => {
            setShowRequestModal(false);
            setSelectedMedicine(null);
          }}
        />
      )}
    </div>
  );
};

export default Marketplace;