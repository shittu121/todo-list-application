import FormHeader from '@/components/FormHeader';
import AuthForm from '@/features/auth/AuthForm';

const Login = () => {
  return (
    <div className='w-form-container mx-auto mt-20 py-20 px-8 space-y-8'>
      <FormHeader
        title={'Welcome to TodoMaster'}
        subtitle={'Please enter your registration username and password'}
      />
      <AuthForm />
    </div>
  );
};

export default Login;