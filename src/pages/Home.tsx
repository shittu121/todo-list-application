import FormHeader from '@/components/FormHeader';
import Navbar from '@/components/Navbar';
import { AddTodoModalForm } from '@/features/todo/AddTodoModal';
import TodoList from '@/features/todo/TodoList';

const Home = () => {
  
  return (
    <div className='dark:bg-[#252525]'>
    <Navbar />
    <div className="text-center mt-10 py-10 px-8 space-y-8 flex-shrink-0">
      <FormHeader title="Welcome to TodoMaster" subtitle="" />
    </div>
    <AddTodoModalForm />
    <TodoList />
    </div>
  );
};

export default Home;
