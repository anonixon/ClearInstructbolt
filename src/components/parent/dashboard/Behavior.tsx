import React, { useState, useMemo, useEffect } from 'react';
import { Award, AlertTriangle, Download, Filter, TrendingUp, TrendingDown, X, Tag, Save, Star } from 'lucide-react';
import { useStore } from '../../../store/useStore';

interface BehaviorStats {
  totalIncidents: number;
  positiveIncidents: number;
  negativeIncidents: number;
  behaviorScore: number;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

interface BehaviorRecord {
  id: string;
  date: string;
  type: 'positive' | 'negative';
  category: string;
  description: string;
  teacher: string;
  points?: number;
  status: 'resolved' | 'pending' | 'escalated';
}

interface BehaviorIntervention {
  id: string;
  date: string;
  type: string;
  description: string;
  status: 'active' | 'completed' | 'discontinued';
  progress: number;
}

interface BehaviorFilters {
  dateRange: {
    start: string;
    end: string;
  };
  type: ('positive' | 'negative')[];
  category: string[];
  teacher: string[];
  status: ('resolved' | 'pending' | 'escalated')[];
  searchQuery: string;
}

interface FilterPreset {
  id: string;
  name: string;
  filters: BehaviorFilters;
  isDefault?: boolean;
}

const DEFAULT_PRESETS: FilterPreset[] = [
  {
    id: 'all-positive',
    name: 'All Positive Incidents',
    filters: {
      dateRange: { start: '', end: '' },
      type: ['positive'],
      category: [],
      teacher: [],
      status: [],
      searchQuery: ''
    },
    isDefault: true
  },
  {
    id: 'pending-issues',
    name: 'Pending Issues',
    filters: {
      dateRange: { start: '', end: '' },
      type: [],
      category: [],
      teacher: [],
      status: ['pending'],
      searchQuery: ''
    },
    isDefault: true
  },
  {
    id: 'this-month',
    name: 'This Month\'s Records',
    filters: {
      dateRange: {
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
      },
      type: [],
      category: [],
      teacher: [],
      status: [],
      searchQuery: ''
    },
    isDefault: true
  },
  {
    id: 'academic-achievement',
    name: 'Academic Achievement Only',
    filters: {
      dateRange: { start: '', end: '' },
      type: ['positive'],
      category: ['Academic Achievement'],
      teacher: [],
      status: [],
      searchQuery: ''
    },
    isDefault: true
  }
];

const Behavior = () => {
  const selectedChild = useStore((state) => state.getSelectedChild());
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [showFilters, setShowFilters] = useState(false);
  const [showSavePreset, setShowSavePreset] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [showEditPreset, setShowEditPreset] = useState(false);
  const [editingPreset, setEditingPreset] = useState<FilterPreset | null>(null);
  const [editedPresetName, setEditedPresetName] = useState('');
  const [filters, setFilters] = useState<BehaviorFilters>(() => {
    // Try to load saved filters from localStorage
    const savedFilters = localStorage.getItem('behaviorFilters');
    return savedFilters ? JSON.parse(savedFilters) : {
      dateRange: {
        start: '',
        end: ''
      },
      type: [],
      category: [],
      teacher: [],
      status: [],
      searchQuery: ''
    };
  });
  const [customPresets, setCustomPresets] = useState<FilterPreset[]>(() => {
    // Try to load custom presets from localStorage
    const savedPresets = localStorage.getItem('behaviorFilterPresets');
    return savedPresets ? JSON.parse(savedPresets) : [];
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [presetToDelete, setPresetToDelete] = useState<FilterPreset | null>(null);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('behaviorFilters', JSON.stringify(filters));
  }, [filters]);

  // Save custom presets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('behaviorFilterPresets', JSON.stringify(customPresets));
  }, [customPresets]);

  // Sample data - replace with real data from your backend
  const stats: BehaviorStats = {
    totalIncidents: 24,
    positiveIncidents: 18,
    negativeIncidents: 6,
    behaviorScore: 85,
    trend: {
      value: 5,
      isPositive: true
    }
  };

  const behaviorRecords: BehaviorRecord[] = [
    {
      id: '1',
      date: '2024-03-20',
      type: 'positive',
      category: 'Academic Achievement',
      description: 'Outstanding performance in group project',
      teacher: 'Mrs. Smith',
      points: 5,
      status: 'resolved'
    },
    {
      id: '2',
      date: '2024-03-19',
      type: 'positive',
      category: 'Leadership',
      description: 'Helped organize class activity',
      teacher: 'Mr. Johnson',
      points: 3,
      status: 'resolved'
    },
    {
      id: '3',
      date: '2024-03-18',
      type: 'negative',
      category: 'Classroom Behavior',
      description: 'Disrupted class discussion',
      teacher: 'Mrs. Smith',
      status: 'resolved'
    },
    {
      id: '4',
      date: '2024-03-17',
      type: 'positive',
      category: 'Sports',
      description: 'Excellent sportsmanship during PE',
      teacher: 'Mr. Wilson',
      points: 4,
      status: 'resolved'
    }
  ];

  const interventions: BehaviorIntervention[] = [
    {
      id: '1',
      date: '2024-03-15',
      type: 'Positive Reinforcement',
      description: 'Daily reward chart for completing homework',
      status: 'active',
      progress: 75
    },
    {
      id: '2',
      date: '2024-03-10',
      type: 'Social Skills',
      description: 'Group activities to improve collaboration',
      status: 'active',
      progress: 60
    }
  ];

  // Get unique categories and teachers for filter options
  const categories = useMemo(() => 
    Array.from(new Set(behaviorRecords.map(record => record.category))),
    [behaviorRecords]
  );

  const teachers = useMemo(() => 
    Array.from(new Set(behaviorRecords.map(record => record.teacher))),
    [behaviorRecords]
  );

  // Filter behavior records based on current filters
  const filteredRecords = useMemo(() => {
    return behaviorRecords.filter(record => {
      // Date range filter
      if (filters.dateRange.start && new Date(record.date) < new Date(filters.dateRange.start)) return false;
      if (filters.dateRange.end && new Date(record.date) > new Date(filters.dateRange.end)) return false;

      // Type filter
      if (filters.type.length > 0 && !filters.type.includes(record.type)) return false;

      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(record.category)) return false;

      // Teacher filter
      if (filters.teacher.length > 0 && !filters.teacher.includes(record.teacher)) return false;

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(record.status)) return false;

      // Search query filter with fuzzy matching
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableFields = [
          record.description,
          record.category,
          record.teacher
        ];
        return searchableFields.some(field => 
          field.toLowerCase().includes(query) ||
          field.toLowerCase().split(' ').some(word => word.startsWith(query))
        );
      }

      return true;
    });
  }, [behaviorRecords, filters]);

  // Update stats based on filtered records
  const filteredStats = useMemo(() => {
    const positiveCount = filteredRecords.filter(r => r.type === 'positive').length;
    const negativeCount = filteredRecords.filter(r => r.type === 'negative').length;
    const totalCount = filteredRecords.length;

    return {
      ...stats,
      totalIncidents: totalCount,
      positiveIncidents: positiveCount,
      negativeIncidents: negativeCount,
      behaviorScore: totalCount > 0 ? Math.round((positiveCount / totalCount) * 100) : 0
    };
  }, [filteredRecords, stats]);

  const handleFilterChange = (key: keyof BehaviorFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      dateRange: {
        start: '',
        end: ''
      },
      type: [],
      category: [],
      teacher: [],
      status: [],
      searchQuery: ''
    });
  };

  const applyPreset = (preset: FilterPreset) => {
    setFilters(preset.filters);
    setShowFilters(false);
  };

  const saveAsPreset = () => {
    if (!newPresetName.trim()) return;

    const newPreset: FilterPreset = {
      id: `custom-${Date.now()}`,
      name: newPresetName.trim(),
      filters: { ...filters }
    };

    setCustomPresets(prev => [...prev, newPreset]);
    setNewPresetName('');
    setShowSavePreset(false);
  };

  const deletePreset = (presetId: string) => {
    setCustomPresets(prev => prev.filter(p => p.id !== presetId));
  };

  const handleEditPreset = (preset: FilterPreset) => {
    setEditingPreset(preset);
    setEditedPresetName(preset.name);
    setShowEditPreset(true);
  };

  const saveEditedPreset = () => {
    if (!editingPreset || !editedPresetName.trim()) return;

    setCustomPresets(prev => prev.map(preset => 
      preset.id === editingPreset.id
        ? { ...preset, name: editedPresetName.trim() }
        : preset
    ));
    setShowEditPreset(false);
    setEditingPreset(null);
    setEditedPresetName('');
  };

  const handleDeleteClick = (preset: FilterPreset) => {
    setPresetToDelete(preset);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (presetToDelete) {
      deletePreset(presetToDelete.id);
      setShowDeleteConfirmation(false);
      setPresetToDelete(null);
    }
  };

  // Get active filter badges
  const activeFilters = useMemo(() => {
    const badges: { label: string; value: string; key: keyof BehaviorFilters }[] = [];

    if (filters.dateRange.start && filters.dateRange.end) {
      badges.push({
        label: 'Date Range',
        value: `${new Date(filters.dateRange.start).toLocaleDateString()} - ${new Date(filters.dateRange.end).toLocaleDateString()}`,
        key: 'dateRange'
      });
    }

    if (filters.type.length > 0) {
      badges.push({
        label: 'Type',
        value: filters.type.join(', '),
        key: 'type'
      });
    }

    if (filters.category.length > 0) {
      badges.push({
        label: 'Category',
        value: filters.category.join(', '),
        key: 'category'
      });
    }

    if (filters.teacher.length > 0) {
      badges.push({
        label: 'Teacher',
        value: filters.teacher.join(', '),
        key: 'teacher'
      });
    }

    if (filters.status.length > 0) {
      badges.push({
        label: 'Status',
        value: filters.status.join(', '),
        key: 'status'
      });
    }

    if (filters.searchQuery) {
      badges.push({
        label: 'Search',
        value: filters.searchQuery,
        key: 'searchQuery'
      });
    }

    return badges;
  }, [filters]);

  const getStatusColor = (status: BehaviorRecord['status']) => {
    switch (status) {
      case 'resolved':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'escalated':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getInterventionStatusColor = (status: BehaviorIntervention['status']) => {
    switch (status) {
      case 'active':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'discontinued':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Behavior</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track {selectedChild?.name}'s behavior and interventions
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
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Active Filter Badges */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <span
              key={`${filter.key}-${filter.value}`}
              className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {filter.label}: {filter.value}
              <button
                onClick={() => {
                  if (filter.key === 'dateRange') {
                    handleFilterChange('dateRange', { start: '', end: '' });
                  } else {
                    handleFilterChange(filter.key, []);
                  }
                }}
                className="ml-1 hover:text-blue-600 dark:hover:text-blue-300"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 max-w-xl w-full bg-white dark:bg-gray-800 shadow-xl">
            <div className="h-full flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter Behavior Records</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                {/* Presets Section */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Filters</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[...DEFAULT_PRESETS, ...customPresets].map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset)}
                        className="flex items-center justify-between px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-2 text-yellow-500" />
                          {preset.name}
                        </span>
                        {!preset.isDefault && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditPreset(preset);
                              }}
                              className="text-blue-500 hover:text-blue-700"
                              title="Edit preset"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(preset);
                              }}
                              className="text-red-500 hover:text-red-700"
                              title="Delete preset"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowSavePreset(true)}
                    className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save Current Filters as Preset
                  </button>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                      className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                      className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const today = new Date();
                        const lastWeek = new Date(today);
                        lastWeek.setDate(today.getDate() - 7);
                        handleFilterChange('dateRange', {
                          start: lastWeek.toISOString().split('T')[0],
                          end: today.toISOString().split('T')[0]
                        });
                      }}
                      className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Last 7 Days
                    </button>
                    <button
                      onClick={() => {
                        const today = new Date();
                        const lastMonth = new Date(today);
                        lastMonth.setMonth(today.getMonth() - 1);
                        handleFilterChange('dateRange', {
                          start: lastMonth.toISOString().split('T')[0],
                          end: today.toISOString().split('T')[0]
                        });
                      }}
                      className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Last 30 Days
                    </button>
                    <button
                      onClick={() => {
                        const today = new Date();
                        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                        handleFilterChange('dateRange', {
                          start: startOfMonth.toISOString().split('T')[0],
                          end: today.toISOString().split('T')[0]
                        });
                      }}
                      className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      This Month
                    </button>
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Behavior Type
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.type.includes('positive')}
                        onChange={(e) => {
                          const newTypes = e.target.checked
                            ? [...filters.type, 'positive']
                            : filters.type.filter(t => t !== 'positive');
                          handleFilterChange('type', newTypes);
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Positive</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.type.includes('negative')}
                        onChange={(e) => {
                          const newTypes = e.target.checked
                            ? [...filters.type, 'negative']
                            : filters.type.filter(t => t !== 'negative');
                          handleFilterChange('type', newTypes);
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Negative</span>
                    </label>
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categories
                  </label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.category.includes(category)}
                          onChange={(e) => {
                            const newCategories = e.target.checked
                              ? [...filters.category, category]
                              : filters.category.filter(c => c !== category);
                            handleFilterChange('category', newCategories);
                          }}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Teacher Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Teachers
                  </label>
                  <div className="space-y-2">
                    {teachers.map(teacher => (
                      <label key={teacher} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.teacher.includes(teacher)}
                          onChange={(e) => {
                            const newTeachers = e.target.checked
                              ? [...filters.teacher, teacher]
                              : filters.teacher.filter(t => t !== teacher);
                            handleFilterChange('teacher', newTeachers);
                          }}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{teacher}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes('resolved')}
                        onChange={(e) => {
                          const newStatuses = e.target.checked
                            ? [...filters.status, 'resolved']
                            : filters.status.filter(s => s !== 'resolved');
                          handleFilterChange('status', newStatuses);
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Resolved</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes('pending')}
                        onChange={(e) => {
                          const newStatuses = e.target.checked
                            ? [...filters.status, 'pending']
                            : filters.status.filter(s => s !== 'pending');
                          handleFilterChange('status', newStatuses);
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Pending</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes('escalated')}
                        onChange={(e) => {
                          const newStatuses = e.target.checked
                            ? [...filters.status, 'escalated']
                            : filters.status.filter(s => s !== 'escalated');
                          handleFilterChange('status', newStatuses);
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Escalated</span>
                    </label>
                  </div>
                </div>

                {/* Search Query */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                    placeholder="Search in description, category, or teacher..."
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Reset Filters
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
        </div>
      )}

      {/* Save Preset Modal */}
      {showSavePreset && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Save Filter Preset</h3>
              <input
                type="text"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                placeholder="Enter preset name"
                className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white mb-4"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSavePreset(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={saveAsPreset}
                  disabled={!newPresetName.trim()}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Preset Modal */}
      {showEditPreset && editingPreset && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Edit Filter Preset</h3>
              <input
                type="text"
                value={editedPresetName}
                onChange={(e) => setEditedPresetName(e.target.value)}
                placeholder="Enter preset name"
                className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white mb-4"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowEditPreset(false);
                    setEditingPreset(null);
                    setEditedPresetName('');
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedPreset}
                  disabled={!editedPresetName.trim()}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && presetToDelete && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Delete Filter Preset</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Are you sure you want to delete the preset "{presetToDelete.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirmation(false);
                    setPresetToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Month Selection */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Behavior Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Behavior Score</h3>
            <div className={`flex items-center ${filteredStats.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {filteredStats.trend.isPositive ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(filteredStats.trend.value)}%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {filteredStats.behaviorScore}%
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Positive Incidents</h3>
          <div className="text-3xl font-bold text-green-600">{filteredStats.positiveIncidents}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {((filteredStats.positiveIncidents / filteredStats.totalIncidents) * 100).toFixed(1)}% of total incidents
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Negative Incidents</h3>
          <div className="text-3xl font-bold text-red-600">{filteredStats.negativeIncidents}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {((filteredStats.negativeIncidents / filteredStats.totalIncidents) * 100).toFixed(1)}% of total incidents
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Total Incidents</h3>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{filteredStats.totalIncidents}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Current academic year
          </div>
        </div>
      </div>

      {/* Active Interventions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Interventions</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {interventions.map((intervention) => (
            <div key={intervention.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {intervention.type}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Started on {new Date(intervention.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInterventionStatusColor(intervention.status)}`}>
                    {intervention.status.charAt(0).toUpperCase() + intervention.status.slice(1)}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {intervention.description}
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Progress</span>
                  <span className="text-gray-900 dark:text-white">{intervention.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${intervention.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Behavior Records */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Behavior Records</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredRecords.map((record) => (
            <div key={record.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    {record.type === 'positive' ? (
                      <Award className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {record.category}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(record.date).toLocaleDateString()} • {record.teacher}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {record.points && (
                    <span className="text-sm font-medium text-green-600">
                      +{record.points} points
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {record.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Behavior; 