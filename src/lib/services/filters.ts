import { sanitizeInput } from '../utils';

export interface MockIncident {
  id: string;
  type: string;
  severity: string;
  location: string;
  status: string;
  time: string;
  date: string;
  response: string;
  agent: string;
}

export interface MockVolunteer {
  name: string;
  role: string;
  zone: string;
  status: string;
  tasks: number;
  avatar: string;
}

export interface MockVolunteerTask {
  task: string;
  priority: string;
  zone: string;
  eta: string;
}

/**
 * Filter incident reports based on search query.
 */
export function handleDashboardIncidentFilter(
  incidents: MockIncident[],
  search: string
): { state: string; data: MockIncident[] } {
  if (!incidents || incidents.length === 0) {
    return { state: 'empty', data: [] };
  }
  
  const cleanSearch = sanitizeInput(search).trim().toLowerCase();
  if (!cleanSearch) {
    return { state: 'success', data: incidents };
  }

  const filtered = incidents.filter(
    (inc) =>
      inc.type.toLowerCase().includes(cleanSearch) ||
      inc.location.toLowerCase().includes(cleanSearch) ||
      inc.id.toLowerCase().includes(cleanSearch) ||
      inc.agent.toLowerCase().includes(cleanSearch) ||
      inc.severity.toLowerCase().includes(cleanSearch)
  );

  if (filtered.length === 0) {
    return { state: 'no-results', data: [] };
  }
  return { state: 'success', data: filtered };
}

/**
 * Filter volunteers list based on search query and status.
 */
export function filterVolunteers(
  volunteers: MockVolunteer[],
  search: string,
  statusFilter?: string
): MockVolunteer[] {
  let result = volunteers;

  if (statusFilter && statusFilter !== 'all') {
    const cleanStatus = statusFilter.trim().toLowerCase();
    result = result.filter(v => v.status.toLowerCase() === cleanStatus);
  }

  const cleanSearch = sanitizeInput(search).trim().toLowerCase();
  if (!cleanSearch) {
    return result;
  }

  return result.filter(
    (v) =>
      v.name.toLowerCase().includes(cleanSearch) ||
      v.role.toLowerCase().includes(cleanSearch) ||
      v.zone.toLowerCase().includes(cleanSearch)
  );
}

/**
 * Filter volunteer tasks based on search and priority.
 */
export function filterVolunteerTasks(
  tasks: MockVolunteerTask[],
  search: string,
  priorityFilter?: string
): MockVolunteerTask[] {
  let result = tasks;

  if (priorityFilter && priorityFilter !== 'all') {
    const cleanPriority = priorityFilter.trim().toLowerCase();
    result = result.filter(t => t.priority.toLowerCase() === cleanPriority);
  }

  const cleanSearch = sanitizeInput(search).trim().toLowerCase();
  if (!cleanSearch) {
    return result;
  }

  return result.filter(
    (t) =>
      t.task.toLowerCase().includes(cleanSearch) ||
      t.zone.toLowerCase().includes(cleanSearch)
  );
}
