import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { Building2, Award, FileCheck, TrendingUp } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { universities, scholarships, applications, registrationRequests } = useApp();

  const metrics = [
    { label: 'Active Universities', value: universities.length, icon: Building2, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-100 dark:border-indigo-900' },
    { label: 'Platform Scholarships', value: scholarships.length, icon: Award, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-100 dark:border-emerald-900' },
    { label: 'Student Applications', value: applications.length, icon: FileCheck, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/80 border-blue-100 dark:border-blue-900' },
    { label: 'Pending Approvals', value: registrationRequests.filter(r => r.status === 'Pending').length, icon: TrendingUp, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/80 border-amber-100 dark:border-amber-900' }
  ];

  const applicationTrends = [
    { month: 'May', applications: 12, approvals: 8 },
    { month: 'Jun', applications: 24, approvals: 15 },
    { month: 'Jul', applications: 45, approvals: 32 },
    { month: 'Aug', applications: 78, approvals: 61 },
    { month: 'Sep', applications: 104, approvals: 89 }
  ];

  const fundingDistribution = [
    { name: 'Fully Funded', value: 65, color: '#10B981' },
    { name: 'Partial Funding', value: 25, color: '#F59E0B' },
    { name: 'Stipend Only', value: 10, color: '#0EA5E9' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
            Platform Analytics & Executive Insights
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Section 4 Analytics: Monitor user traffic, application velocity, and scholarship funding distribution.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400">{m.label}</span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading mt-1">{m.value}</p>
              </div>
              <div className={`p-3 rounded-2xl border ${m.bg} ${m.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm font-heading">Application & Admissions Growth Trajectory</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationTrends}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#FFF', borderRadius: '12px' }}
                />
                <Bar dataKey="applications" fill="#6366F1" radius={[6, 6, 0, 0]} name="Applications" />
                <Bar dataKey="approvals" fill="#10B981" radius={[6, 6, 0, 0]} name="Accepted Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm font-heading">Funding Model Breakdown</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fundingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {fundingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#FFF', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/> Fully Funded</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"/> Partial</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"/> Stipend</span>
          </div>
        </div>
      </div>
    </div>
  );
};
