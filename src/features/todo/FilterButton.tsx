// FilterButtons.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';  // Adjust the import path based on your store structure
import { setFilterStatus, filterTodos } from './TodoSlice';  // Adjust path if necessary
import Search from '@/components/Search'; // Import the new SearchInput component

type Filter = 'all' | 'incomplete' | 'completed';

const FilterButtons: React.FC = () => {
  const dispatch = useDispatch();
  const { filterStatus, searchTerm } = useSelector((state: RootState) => state.todos);

  // Apply the filter when the filter status or search term changes
  useEffect(() => {
    dispatch(filterTodos());  // Reapply filters whenever the state updates
  }, [dispatch, filterStatus, searchTerm]);  // Only depend on filterStatus and searchTerm

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value as Filter;
    dispatch(setFilterStatus(filter));  // Update filter status in the store
  };

  return (
    <div className="flex justify-between items-center space-x-4 p-4 bg-gray-50 lg:h-32 md:h-32 rounded-md shadow-md">
      {/* Filter Dropdown */}
      <div className="flex space-x-4 items-center w-40 lg:w-52 mb-3 mt-2 lg:mt-2">
        <select
          className="text-xl w-40 h-16 my-auto lg:w-52 lg:h-16 rounded border form-select border-gray-300 focus:outline-none"
          value={filterStatus}
          onChange={handleFilterChange}
        >
          <option value="all">Default (All)</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Search Input */}
      <div className="lg:hidden md:hidden my-auto">
        <Search />  
      </div> 
    </div>
  );
};

export default FilterButtons;
