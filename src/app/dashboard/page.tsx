"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { FiUsers, FiTrendingUp, FiActivity, FiDollarSign } from 'react-icons/fi';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Users', stat: '71,897', icon: FiUsers, change: '12%', changeType: 'increase' },
    { name: 'Revenue', stat: '$58,400', icon: FiDollarSign, change: '2.3%', changeType: 'increase' },
    { name: 'Active Sessions', stat: '1,429', icon: FiActivity, change: '4.05%', changeType: 'decrease' },
    { name: 'Conversion Rate', stat: '24.57%', icon: FiTrendingUp, change: '0.95%', changeType: 'increase' },
  ];

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, {user?.first_name}! 👋
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Here's what's happening with your dashboard today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {item.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {item.stat}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <span
                        className={`font-medium ${
                          item.changeType === 'increase'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {item.changeType === 'increase' ? '+' : '-'}{item.change}
                      </span>
                      <span className="text-gray-500"> from last month</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {[
                      {
                        id: 1,
                        content: 'New user registration',
                        target: 'john.doe@example.com',
                        date: '2 hours ago',
                        type: 'user',
                      },
                      {
                        id: 2,
                        content: 'System backup completed',
                        target: 'Database backup',
                        date: '4 hours ago',
                        type: 'system',
                      },
                      {
                        id: 3,
                        content: 'New order received',
                        target: 'Order #1234',
                        date: '6 hours ago',
                        type: 'order',
                      },
                    ].map((item, itemIdx) => (
                      <li key={item.id}>
                        <div className="relative pb-8">
                          {itemIdx !== 2 ? (
                            <span
                              className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                <FiActivity className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm">
                                  <span className="font-medium text-gray-900">
                                    {item.content}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  {item.target}
                                </p>
                              </div>
                              <div className="mt-2 text-sm text-gray-500">
                                <time>{item.date}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <button className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <div className="flex-shrink-0">
                      <FiUsers className="h-10 w-10 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Manage Users
                      </p>
                      <p className="text-sm text-gray-500">
                        View and manage user accounts
                      </p>
                    </div>
                  </button>

                  <button className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <div className="flex-shrink-0">
                      <FiActivity className="h-10 w-10 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        View Reports
                      </p>
                      <p className="text-sm text-gray-500">
                        Generate and view reports
                      </p>
                    </div>
                  </button>

                  <button className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <div className="flex-shrink-0">
                      <FiTrendingUp className="h-10 w-10 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Analytics
                      </p>
                      <p className="text-sm text-gray-500">
                        View detailed analytics
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}