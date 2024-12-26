import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import CustomFormField from '@/components/CustomFormField';
import { signUpFormObj } from '../../data/signUpFormObj';
import { Link, useNavigate } from 'react-router-dom';
import { UserFormData, UserFormValidation } from '@/lib/formValidation';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetState } from '@/features/auth/AuthSlice';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '@/store/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Add useNavigate
  const { loading, error, success } = useSelector((state: RootState) => state.auth);

  const form = useForm<UserFormData>({
    mode: 'all',
    resolver: zodResolver(UserFormValidation),
  });

  const onSubmit = (data: UserFormData) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        toast.success('Registration successful');
        form.reset(); // Reset form fields after successful registration
        setTimeout(() => navigate('/login'), 1500); // Redirect to login page
      })
      .catch((err) => {
        toast.error('Registration failed');
        console.error('Registration failed:', err);
      });
  };

  useEffect(() => {
    if (success) {
      // Trigger success notification (already handled in `onSubmit`)
      dispatch(resetState());
    }

    return () => {
      dispatch(resetState());
    };
  }, [success, dispatch]);

  return (
    <>
      {/* Made the Form Reusable, and using it right here */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {signUpFormObj.map((formObj, index) => (
            // This component uses Shadcn ui, Reacthookform and Zod for validation
            <CustomFormField
              control={form.control}
              name={formObj.name}
              label={formObj.label}
              placeholder={formObj.placeholder}
              type={formObj.type}
              key={index}
              isPassword={formObj.isPassword}
            />
          ))}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            className="text-[1.5rem] py-8 w-full bg-[#050c9c] text-white hover:bg-[#03075e] transition-all duration-300 ease-in-out disabled:cursor-not-allowed"
            disabled={loading}>
            {loading ? 'Registering...' : 'Submit'}
          </Button>

          <p className="text-center">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#050c9c] font-semibold hover:text-[#03075e] transition-all duration-300 ease-in-out disabled:cursor-not-allowed">
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
