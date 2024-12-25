import FormHeader from '@/components/FormHeader';
import Navbar from '@/components/Navbar';
import AddTodo from '@/features/todo/AddTodo';
import TodoList from '@/features/todo/TodoList';

const Home = () => {
  
  return (
    <>
    <Navbar />
    <div className="w-form-container mx-auto mt-10 py-10 px-8 space-y-8">
      <FormHeader title="Welcome to TodoMaster" subtitle="Homepage" />
    </div>
    <AddTodo />
    <TodoList />
    </>
  );
};

export default Home;
