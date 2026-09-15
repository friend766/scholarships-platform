import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const UserManagement = () => {
  const [usersList, setUsersList] = useState([
    { id: 'usr-1', name: 'Alex Rivera', email: 'alex.rivera@student.edu', role: 'Student', status: 'Active', joined: '2026-08-01' },
    { id: 'usr-2', name: 'Prof. Eleanor Vance', email: 'eleanor.vance@ox.ac.uk', role: 'University Admin', status: 'Active', joined: '2026-07-15' },
    { id: 'usr-3', name: 'Dr. Robert Sterling', email: 'rsterling@mit.edu', role: 'University Admin', status: 'Active', joined: '2026-07-20' },
    { id: 'usr-4', name: 'Super Admin System', email: 'admin@platform.gov', role: 'Super Admin', status: 'Active', joined: '2026-01-01' }
  ]);

  const [filterRole, setFilterRole] = useState('All');

  const toggleUserStatus = (id) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const filtered = usersList.filter(u => filterRole === 'All' || u.role === filterRole);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
            Platform User & Permission Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Section 4: Control user accounts, role scopes, administrative permissions, and account status.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Role Scope Filter:</span>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg"
            >
              <option value="All">All Roles</option>
              <option value="Student">Student</option>
              <option value="University Admin">University Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-extrabold">
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Account Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-4 font-bold text-slate-900 dark:text-white">{u.name}</td>
                <td className="p-4 text-slate-600 dark:text-slate-300">{u.email}</td>
                <td className="p-4">
                  <Badge variant={u.role === 'Super Admin' ? 'purple' : u.role === 'University Admin' ? 'indigo' : 'gray'}>
                    {u.role}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge variant={u.status === 'Active' ? 'success' : 'error'}>{u.status}</Badge>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleUserStatus(u.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      u.status === 'Active'
                        ? 'bg-red-50 dark:bg-red-950/80 text-red-700 dark:text-red-300 hover:bg-red-100 border border-red-200 dark:border-red-800'
                        : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    {u.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
