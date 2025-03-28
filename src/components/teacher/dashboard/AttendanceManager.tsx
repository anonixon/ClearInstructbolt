import React, { useState, useMemo } from 'react';
import { Calendar, Download, Filter, Plus, X, ChevronUp, ChevronDown, Info, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';

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
  total: number;
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
  excused: 1,
  total: 28,
};

const SortTooltip = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap">
    {children}
    <div className="absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45 -bottom-1 left-4"></div>
  </div>
);

interface AttendanceManagerProps {
  className?: string;
}

const AttendanceManager: React.FC<AttendanceManagerProps> = ({ className }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const attendanceRate = (sampleSummary.present / sampleSummary.total) * 100;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Attendance Manager
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Check className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Present</p>
                <p className="text-2xl font-bold">{sampleSummary.present}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
              <X className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Absent</p>
                <p className="text-2xl font-bold">{sampleSummary.absent}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Late</p>
                <p className="text-2xl font-bold">{sampleSummary.late}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Excused</p>
                <p className="text-2xl font-bold">{sampleSummary.excused}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Attendance Rate</p>
              <p className="text-sm font-medium">{attendanceRate.toFixed(1)}%</p>
            </div>
            <Progress value={attendanceRate} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { AttendanceManager };
export type { AttendanceManagerProps, AttendanceSummary }; 