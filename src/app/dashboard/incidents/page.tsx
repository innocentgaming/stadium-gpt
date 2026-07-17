'use client';

import { useState, useTransition } from 'react';
import { CheckCircle, Clock, Filter, Search } from 'lucide-react';
import { handleDashboardIncidentFilter, MockIncident } from '@/lib/services/filters';

const initialIncidents: MockIncident[] = [
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
  const [incidents, setIncidents] = useState<MockIncident[]>(initialIncidents);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    startTransition(() => {
      applyFilters(val, severityFilter);
    });
  };

  const handleSeverityChange = (val: string) => {
    setSeverityFilter(val);
    startTransition(() => {
      applyFilters(searchQuery, val);
    });
  };

  const applyFilters = (search: string, severity: string) => {
    let filtered = initialIncidents;
    if (severity !== 'All') {
      filtered = initialIncidents.filter(inc => inc.severity.toLowerCase() === severity.toLowerCase());
    }
    const filterResult = handleDashboardIncidentFilter(filtered, search);
    setIncidents(filterResult.data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Incident Reports</h1>
          <p className="text-sm text-text-secondary mt-1">Historical incident log and analysis</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search incidents..."
              className="pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/5 text-sm placeholder-text-muted focus:outline-none focus:border-blue-500/30 w-48 text-slate-100"
              aria-label="Search incident reports"
            />
          </div>
          {/* Dropdown severity filter */}
          <div className="relative flex items-center">
            <Filter className="absolute left-3 w-4 h-4 text-text-muted pointer-events-none" />
            <select
              value={severityFilter}
              onChange={(e) => handleSeverityChange(e.target.value)}
              className="pl-9 pr-8 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-text-secondary focus:outline-none focus:border-blue-500/30 cursor-pointer appearance-none"
              aria-label="Filter by severity"
            >
              <option value="All" className="bg-[#0B1D3A]">All Severities</option>
              <option value="Critical" className="bg-[#0B1D3A]">Critical</option>
              <option value="High" className="bg-[#0B1D3A]">High</option>
              <option value="Medium" className="bg-[#0B1D3A]">Medium</option>
              <option value="Low" className="bg-[#0B1D3A]">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-heading text-text-primary">{initialIncidents.length}</p>
          <p className="text-xs text-text-muted">Total Incidents</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-heading text-emerald-400">2.1m</p>
          <p className="text-xs text-text-muted">Avg Response</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-heading text-blue-400">94.2%</p>
          <p className="text-xs text-text-muted">Resolution Rate</p>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden min-h-[300px]">
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
            <p className="text-xs text-text-muted">Filtering logs...</p>
          </div>
        ) : incidents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-text-secondary">No incidents matching filter parameters.</p>
          </div>
        ) : (
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
                    <td className="py-3 px-4 text-slate-100">{inc.type}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                        inc.severity === 'Critical' ? 'bg-red-500/10 text-red-400' :
                        inc.severity === 'High' ? 'bg-amber-500/10 text-amber-400' :
                        inc.severity === 'Medium' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {inc.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary hidden sm:table-cell">{inc.location}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1 text-xs text-slate-200">
                        {inc.status === 'Resolved' || inc.status === 'False Alarm' ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                        )}
                        {inc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary hidden lg:table-cell">{inc.response}</td>
                    <td className="py-3 px-4 text-text-secondary hidden lg:table-cell">{inc.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
