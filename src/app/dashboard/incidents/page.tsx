'use client';

import { AlertTriangle, CheckCircle, Clock, Filter, Search } from 'lucide-react';

const incidents = [
  { id: 'INC-2026-0147', type: 'Medical', severity: 'Critical', location: 'Section 205, Row J', status: 'Resolved', time: '14:23', date: '2026-07-06', response: '1.8 min', agent: 'Medical Agent' },
  { id: 'INC-2026-0146', type: 'Crowd Surge', severity: 'High', location: 'Gate 7 North', status: 'Resolved', time: '14:11', date: '2026-07-06', response: '0.9 min', agent: 'Safety Agent' },
  { id: 'INC-2026-0145', type: 'Lost Child', severity: 'High', location: 'Concourse B', status: 'Resolved', time: '13:45', date: '2026-07-06', response: '3.2 min', agent: 'Safety Agent' },
  { id: 'INC-2026-0144', type: 'Equipment Failure', severity: 'Medium', location: 'F&B Station 5', status: 'In Progress', time: '13:22', date: '2026-07-06', response: '5.1 min', agent: 'Operations Agent' },
  { id: 'INC-2026-0143', type: 'Accessibility', severity: 'Low', location: 'Elevator 3', status: 'Resolved', time: '12:58', date: '2026-07-06', response: '2.4 min', agent: 'Accessibility Agent' },
  { id: 'INC-2026-0142', type: 'Suspicious Item', severity: 'High', location: 'Parking Lot B', status: 'False Alarm', time: '12:30', date: '2026-07-06', response: '1.2 min', agent: 'Safety Agent' },
  { id: 'INC-2026-0141', type: 'Fire Alarm', severity: 'Critical', location: 'Kitchen Area 2', status: 'False Alarm', time: '11:45', date: '2026-07-06', response: '0.5 min', agent: 'Safety Agent' },
  { id: 'INC-2026-0140', type: 'Medical', severity: 'Medium', location: 'Section 112, Row A', status: 'Resolved', time: '11:15', date: '2026-07-06', response: '2.0 min', agent: 'Medical Agent' },
];

export default function IncidentReports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Incident Reports</h1>
          <p className="text-sm text-text-secondary mt-1">Historical incident log and analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input type="text" placeholder="Search incidents..." className="pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/5 text-sm placeholder-text-muted focus:outline-none focus:border-blue-500/30 w-48" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-text-secondary hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-heading text-text-primary">147</p>
          <p className="text-xs text-text-muted">Total Incidents</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-heading text-green-400">2.1m</p>
          <p className="text-xs text-text-muted">Avg Response</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-heading text-blue-400">94.2%</p>
          <p className="text-xs text-text-muted">Resolution Rate</p>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Severity</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-text-muted hidden sm:table-cell">Location</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-text-muted hidden lg:table-cell">Response</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-text-muted hidden lg:table-cell">Agent</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="py-3 px-4 font-mono text-xs text-blue-400">{inc.id}</td>
                  <td className="py-3 px-4">{inc.type}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                      inc.severity === 'Critical' ? 'bg-red-500/10 text-red-400' :
                      inc.severity === 'High' ? 'bg-amber-500/10 text-amber-400' :
                      inc.severity === 'Medium' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary hidden sm:table-cell">{inc.location}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-xs">
                      {inc.status === 'Resolved' || inc.status === 'False Alarm' ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-muted hidden lg:table-cell">{inc.response}</td>
                  <td className="py-3 px-4 text-text-muted hidden lg:table-cell">{inc.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
