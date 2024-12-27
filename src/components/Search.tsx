import { Input } from './ui/input';
import { CiSearch } from "react-icons/ci";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Import the RootState type
import { setSearchTerm } from '@/features/todo/TodoSlice'; // Adjust path based on your structure

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.todos.searchTerm); // Specify the RootState type

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    dispatch(setSearchTerm(term)); // Dispatch the action to update search term
  };

  return (
    <form action="" className="">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for your task"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full lg:w-[60rem] px-5 lg:px-10 md:px-10 text-2xl rounded-[20px] h-20"
        />
        <CiSearch className="absolute dark:text-white top-6 lg:top-5 md:top-5 h-8 w-8 lg:h-10 lg:w-10 md:h-10 md:w-10 right-5" />
      </div>
    </form>
  );
};

export default Search;
