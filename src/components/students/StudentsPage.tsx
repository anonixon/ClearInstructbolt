import React, { useState, useMemo } from 'react';
import { Search, Grid, List, ChevronDown, Plus, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useStore } from '../../store/useStore';
import StudentGrid from './StudentGrid';
import StudentTable from './StudentTable';
import { Student } from '../../types';

const StudentsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Student>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedFormGroup, setSelectedFormGroup] = useState<string>('all');
  
  const students = useStore((state) => state.students);
  
  const formGroups = useMemo(() => {
    const groups = new Set(students.map(s => s.grade));
    return ['all', ...Array.from(groups)];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students
      .filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFormGroup = selectedFormGroup === 'all' || student.grade === selectedFormGroup;
        return matchesSearch && matchesFormGroup;
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        return sortDirection === 'asc' 
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
  }, [students, searchQuery, selectedFormGroup, sortField, sortDirection]);

  const handleSort = (field: keyof Student) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Students</h1>
        <p className="text-gray-400">
          Manage and view detailed information about your students
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800/50 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          >
            <List className="w-5 h-5" />
          </button>
          
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Form Group</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-lg shadow-xl invisible group-hover:visible">
              {formGroups.map(group => (
                <button
                  key={group}
                  onClick={() => setSelectedFormGroup(group)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-700 ${
                    selectedFormGroup === group ? 'bg-gray-700 text-white' : 'text-gray-400'
                  }`}
                >
                  {group === 'all' ? 'All Form Groups' : `Form ${group}`}
                </button>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Plus className="w-5 h-5" />
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-4">
        {viewMode === 'grid' ? (
          <StudentGrid 
            students={filteredStudents}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        ) : (
          <StudentTable 
            students={filteredStudents}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        )}
      </div>
    </div>
  );
};

export default StudentsPage;