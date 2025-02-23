import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Package } from 'lucide-react';

const data = [
  { name: 'Jan', pageViews: 30, clicks: 10 },
  { name: 'Feb', pageViews: 65, clicks: 15 },
  { name: 'Mar', pageViews: 45, clicks: 12 },
  { name: 'Apr', pageViews: 70, clicks: 18 },
  { name: 'May', pageViews: 48, clicks: 20 },
  { name: 'Jun', pageViews: 60, clicks: 15 },
  { name: 'Jul', pageViews: 40, clicks: 8 },
  { name: 'Aug', pageViews: 42, clicks: 10 },
  { name: 'Sep', pageViews: 80, clicks: 30 },
  { name: 'Oct', pageViews: 50, clicks: 15 },
  { name: 'Nov', pageViews: 65, clicks: 25 },
  { name: 'Dec', pageViews: 70, clicks: 28 },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="13,647"
          change="+2.3%"
          icon={<Package className="h-6 w-6 text-orange-500" />}
        />
        <StatCard
          title="New Leads"
          value="9,526"
          change="+8.1%"
          icon={<Users className="h-6 w-6 text-orange-500" />}
        />
        <StatCard
          title="Deals"
          value="976"
          change="-0.3%"
          icon={<TrendingUp className="h-6 w-6 text-orange-500" />}
          negative
        />
        <StatCard
          title="Booked Revenue"
          value="$123.6k"
          change="-10.6%"
          icon={<DollarSign className="h-6 w-6 text-orange-500" />}
          negative
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Performance</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm rounded bg-gray-100">ALL</button>
            <button className="px-3 py-1 text-sm rounded hover:bg-gray-100">1M</button>
            <button className="px-3 py-1 text-sm rounded hover:bg-gray-100">6M</button>
            <button className="px-3 py-1 text-sm rounded hover:bg-gray-100">1Y</button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pageViews" stroke="#ff4d00" strokeWidth={2} />
              <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, negative = false }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          <p className={`text-sm mt-2 ${negative ? 'text-red-500' : 'text-green-500'}`}>
            {change} Last Week
          </p>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">{icon}</div>
      </div>
    </div>
  );
}

export default Dashboard;