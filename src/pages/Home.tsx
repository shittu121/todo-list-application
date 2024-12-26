import FormHeader from '@/components/FormHeader';
import Navbar from '@/components/Navbar';
import { AddTodoModalForm } from '@/features/todo/AddTodoModal';
import TodoList from '@/features/todo/TodoList';

const Home = () => {
  
  return (
    <>
    <Navbar />
    <div className="w-form-container mx-auto mt-10 py-10 px-8 space-y-8">
      <FormHeader title="Welcome to TodoMaster" subtitle="" />
    </div>
    <AddTodoModalForm />
    <TodoList />
    </>
  );
};

export default Home;
