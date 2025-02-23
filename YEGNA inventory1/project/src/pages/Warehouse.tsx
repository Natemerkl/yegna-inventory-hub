import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

const warehouses = [
  {
    id: 'WH-001',
    name: 'Central Fulfillment',
    location: '123 Commerce St, NY',
    manager: 'John Doe',
    contact: '+1 (555) 123-4567',
    stockAvailable: 6490,
    stockShipping: 3022,
    revenue: 25737
  },
  {
    id: 'WH-002',
    name: 'East Coast Hub',
    location: '456 Market Ave, NY',
    manager: 'Jane Smith',
    contact: '+1 (555) 234-5678',
    stockAvailable: 7362,
    stockShipping: 4253,
    revenue: 67351
  },
  {
    id: 'WH-003',
    name: 'West Coast Depot',
    location: '789 Trade Blvd, CA',
    manager: 'Richard Roe',
    contact: '+1 (555) 345-6789',
    stockAvailable: 8842,
    stockShipping: 3221,
    revenue: 45865
  }
];

function Warehouse() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Product Items"
          value="3,521"
          subtitle="Items"
          icon="📦"
        />
        <StatCard
          title="In Stock Product"
          value="1,311"
          subtitle="Items"
          icon="📋"
        />
        <StatCard
          title="Out Of Stock Product"
          value="231"
          subtitle="Items"
          icon="🏷️"
        />
        <StatCard
          title="Total Visited Customer"
          value="2,334"
          subtitle="+4.5% Last Week"
          icon="👥"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Warehouse List</h2>
            <select className="border rounded-lg px-4 py-2">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warehouse ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warehouse Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Available
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Shipping
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warehouse Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{warehouse.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {warehouse.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {warehouse.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {warehouse.manager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {warehouse.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {warehouse.stockAvailable}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {warehouse.stockShipping}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${warehouse.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="h-5 w-5 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="h-5 w-5 text-blue-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg text-2xl">{icon}</div>
      </div>
    </div>
  );
}

export default Warehouse;