import { Input } from './ui/input'
import { CiSearch } from "react-icons/ci";

export const Search = () => {
  return (
    <div>
        <form action="" className=''>
            <div className="relative">
            <Input type='text' placeholder='Search for your task' className='w-full lg:w-[60rem] px-10 text-lg rounded-[20px] h-20' />
            <CiSearch className='absolute top-5 h-10 w-10 right-5'/>
            </div>
        </form>
    </div>
  )
}
