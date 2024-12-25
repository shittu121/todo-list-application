import FormHeader from '@/components/FormHeader';
import SignUpForm from '@/features/auth/SignUpForm';

const SignUp = () => {
  return (
    <div className='w-form-container mx-auto mt-20 py-20 px-8 space-y-8'>
      <FormHeader
        title={'Join TodoMaster'}
        subtitle={
          "Unlock the full potential of productivity with TodoMaster! Take control of your tasks with TodoMaster. Create, manage, and track your to-dos with ease. Stay organized and boost your productivity. Sign up now and start checking off your tasks!"
        }
      />
      <SignUpForm />
    </div>
  );
};

export default SignUp;