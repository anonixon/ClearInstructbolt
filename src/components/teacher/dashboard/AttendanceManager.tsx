import React, { useState, useMemo } from 'react';
import { Calendar, Download, Filter, Plus, X, ChevronUp, ChevronDown, Info } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  name: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

interface AttendanceSummary {
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
}

interface AttendanceFilters {
  dateRange: {
    start: string;
    end: string;
  };
  status: ('present' | 'absent' | 'late' | 'excused')[];
  searchQuery: string;
}

interface SortConfig {
  key: keyof AttendanceRecord;
  direction: 'asc' | 'desc';
}

interface MultiSortConfig {
  primary: SortConfig;
  secondary: SortConfig | null;
}

const sampleAttendance: AttendanceRecord[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    date: '2024-03-20',
    status: 'present',
    notes: 'On time'
  },
  {
    id: '2',
    name: 'James Wilson',
    date: '2024-03-20',
    status: 'late',
    notes: 'Arrived 15 minutes late'
  },
  {
    id: '3',
    name: 'Sophia Martinez',
    date: '2024-03-20',
    status: 'absent',
    notes: 'Called in sick'
  },
  {
    id: '4',
    name: 'Michael Brown',
    date: '2024-03-19',
    status: 'present',
    notes: 'On time'
  },
  {
    id: '5',
    name: 'Sarah Davis',
    date: '2024-03-19',
    status: 'excused',
    notes: 'Doctor appointment'
  }
];

const sampleSummary: AttendanceSummary = {
  totalStudents: 28,
  present: 22,
  absent: 3,
  late: 2,
  excused: 1
};

const SortTooltip = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap">
    {children}
    <div className="absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45 -bottom-1 left-4"></div>
  </div>
);

const AttendanceManager = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<MultiSortConfig>({
    primary: {
      key: 'date',
      direction: 'desc'
    },
    secondary: null
  });
  const [filters, setFilters] = useState<AttendanceFilters>({
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    status: [],
    searchQuery: ''
  });
  const [showSortTooltip, setShowSortTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleSort = (key: keyof AttendanceRecord, event: React.MouseEvent) => {
    if (event.shiftKey) {
      // Multi-column sort
      setSortConfig(prev => {
        if (prev.primary.key === key) {
          // If clicking primary sort column, toggle its direction
          return {
            ...prev,
            primary: {
              ...prev.primary,
              direction: prev.primary.direction === 'asc' ? 'desc' : 'asc'
            }
          };
        } else if (prev.secondary?.key === key) {
          // If clicking secondary sort column, toggle its direction
          return {
            ...prev,
            secondary: {
              ...prev.secondary,
              direction: prev.secondary.direction === 'asc' ? 'desc' : 'asc'
            }
          };
        } else {
          // If clicking a new column, make it the secondary sort
          return {
            ...prev,
            secondary: {
              key,
              direction: 'asc'
            }
          };
        }
      });
    } else {
      // Single-column sort
      setSortConfig(prev => ({
        primary: {
          key,
          direction: prev.primary.key === key && prev.primary.direction === 'asc' ? 'desc' : 'asc'
        },
        secondary: null
      }));
    }
  };

  const getSortIcon = (key: keyof AttendanceRecord) => {
    if (sortConfig.primary.key === key) {
      return sortConfig.primary.direction === 'asc' ? (
        <ChevronUp className="w-4 h-4 ml-1" />
      ) : (
        <ChevronDown className="w-4 h-4 ml-1" />
      );
    }
    if (sortConfig.secondary?.key === key) {
      return sortConfig.secondary.direction === 'asc' ? (
        <ChevronUp className="w-4 h-4 ml-1 text-gray-400" />
      ) : (
        <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
      );
    }
    return null;
  };

  const filteredAttendance = useMemo(() => {
    let filtered = sampleAttendance.filter(record => {
      const matchesDateRange = record.date >= filters.dateRange.start && 
                             record.date <= filters.dateRange.end;
      const matchesStatus = filters.status.length === 0 || 
                          filters.status.includes(record.status);
      const matchesSearch = record.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          (record.notes?.toLowerCase() || '').includes(filters.searchQuery.toLowerCase());
      
      return matchesDateRange && matchesStatus && matchesSearch;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      // Primary sort
      const primaryCompare = compareValues(a[sortConfig.primary.key], b[sortConfig.primary.key]);
      if (primaryCompare !== 0) {
        return sortConfig.primary.direction === 'asc' ? primaryCompare : -primaryCompare;
      }

      // Secondary sort
      if (sortConfig.secondary) {
        const secondaryCompare = compareValues(a[sortConfig.secondary.key], b[sortConfig.secondary.key]);
        return sortConfig.secondary.direction === 'asc' ? secondaryCompare : -secondaryCompare;
      }

      return 0;
    });

    return filtered;
  }, [filters, sortConfig]);

  const compareValues = (a: any, b: any): number => {
    if (a === undefined || a === null) return 1;
    if (b === undefined || b === null) return -1;
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    // In a real application, this would connect to an API endpoint
    console.log(`Exporting attendance data in ${format} format...`);
    
    // For CSV export
    if (format === 'csv') {
      const headers = ['Student Name', 'Date', 'Status', 'Notes'];
      const csvContent = [
        headers.join(','),
        ...filteredAttendance.map(record => 
          [record.name, record.date, record.status, record.notes || ''].join(',')
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const FilterPanel = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter Attendance</h3>
          <button
            onClick={() => setShowFilters(false)}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date Range
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value }
                }))}
                className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value }
                }))}
                className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <div className="mt-1 space-y-2">
              {(['present', 'absent', 'late', 'excused'] as const).map(status => (
                <label key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({
                          ...prev,
                          status: [...prev.status, status]
                        }));
                      } else {
                        setFilters(prev => ({
                          ...prev,
                          status: prev.status.filter(s => s !== status)
                        }));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Search
            </label>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                searchQuery: e.target.value
              }))}
              placeholder="Search by student name or notes..."
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setFilters({
                  dateRange: {
                    start: new Date().toISOString().split('T')[0],
                    end: new Date().toISOString().split('T')[0]
                  },
                  status: [],
                  searchQuery: ''
                });
                setShowFilters(false);
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Reset
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ExportMenu = () => (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu">
        <button
          onClick={() => handleExport('csv')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          role="menuitem"
        >
          Export as CSV
        </button>
        <button
          onClick={() => handleExport('excel')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          role="menuitem"
        >
          Export as Excel
        </button>
        <button
          onClick={() => handleExport('pdf')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          role="menuitem"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track and manage student attendance
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowFilters(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <div className="relative">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <ExportMenu />
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <MetricCard
          label="Total Students"
          value={filteredAttendance.length}
          color="blue"
        />
        <MetricCard
          label="Present"
          value={filteredAttendance.filter(r => r.status === 'present').length}
          color="green"
        />
        <MetricCard
          label="Absent"
          value={filteredAttendance.filter(r => r.status === 'absent').length}
          color="red"
        />
        <MetricCard
          label="Late"
          value={filteredAttendance.filter(r => r.status === 'late').length}
          color="yellow"
        />
        <MetricCard
          label="Excused"
          value={filteredAttendance.filter(r => r.status === 'excused').length}
          color="purple"
        />
      </div>

      {/* Attendance Form */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Daily Attendance</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Record attendance for {new Date(selectedDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 relative group"
                    onClick={(e) => handleSort('name', e)}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({ x: rect.left, y: rect.bottom + 5 });
                      setShowSortTooltip(true);
                    }}
                    onMouseLeave={() => setShowSortTooltip(false)}
                    title="Click to sort. Hold Shift to add secondary sort."
                  >
                    <div className="flex items-center">
                      Student
                      {getSortIcon('name')}
                      <Info className="w-3 h-3 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 relative group"
                    onClick={(e) => handleSort('date', e)}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({ x: rect.left, y: rect.bottom + 5 });
                      setShowSortTooltip(true);
                    }}
                    onMouseLeave={() => setShowSortTooltip(false)}
                    title="Click to sort. Hold Shift to add secondary sort."
                  >
                    <div className="flex items-center">
                      Date
                      {getSortIcon('date')}
                      <Info className="w-3 h-3 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 relative group"
                    onClick={(e) => handleSort('status', e)}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({ x: rect.left, y: rect.bottom + 5 });
                      setShowSortTooltip(true);
                    }}
                    onMouseLeave={() => setShowSortTooltip(false)}
                    title="Click to sort. Hold Shift to add secondary sort."
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIcon('status')}
                      <Info className="w-3 h-3 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 relative group"
                    onClick={(e) => handleSort('notes', e)}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({ x: rect.left, y: rect.bottom + 5 });
                      setShowSortTooltip(true);
                    }}
                    onMouseLeave={() => setShowSortTooltip(false)}
                    title="Click to sort. Hold Shift to add secondary sort."
                  >
                    <div className="flex items-center">
                      Notes
                      {getSortIcon('notes')}
                      <Info className="w-3 h-3 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAttendance.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {record.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === 'present'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : record.status === 'absent'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : record.status === 'late'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {record.notes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Sort Tooltip */}
      {showSortTooltip && (
        <div 
          className="fixed z-50"
          style={{ 
            left: tooltipPosition.x, 
            top: tooltipPosition.y 
          }}
        >
          <SortTooltip>
            <div className="space-y-1">
              <p>Click to sort by this column</p>
              <p>Hold Shift + Click to add as secondary sort</p>
              <p className="text-gray-300">Primary sort: Black chevron</p>
              <p className="text-gray-300">Secondary sort: Gray chevron</p>
            </div>
          </SortTooltip>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && <FilterPanel />}
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: number;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, color }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
        <div className={`text-${color}-600 dark:text-${color}-400`}>
          <Calendar className="w-6 h-6" />
        </div>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default AttendanceManager; 