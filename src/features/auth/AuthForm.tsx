import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { AuthData, AuthValidation } from '@/lib/formValidation';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordVisibilityToggle from '@/components/PasswordVisibilityToggle';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetState } from '@/features/auth/AuthSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  const form = useForm<AuthData>({
    mode: 'all',
    resolver: zodResolver(AuthValidation),
  });

  const onSubmit = async (data: AuthData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success('Login successful');
      navigate('/'); // Redirect to the Homepage
    } catch (err) {
      toast.error(err as string);
      console.error('Login failed:', err);
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(resetState());
    }

    return () => {
      dispatch(resetState());
    };
  }, [success, dispatch]);

  return (
    // Shadcn ui form with ReactHookform and Zod for Validation
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1.4rem]">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  className="text-[1.4rem] py-8 border-grey-200 dark:border-dark-grey-200"
                />
              </FormControl>
              <FormMessage className="text-[1.1rem]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel className="text-[1.4rem]">Password</FormLabel>
                <PasswordVisibilityToggle
                  setIsToggled={setIsPasswordVisible}
                />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  type={isPasswordVisible ? 'text' : 'password'}
                  className="text-[1.4rem] py-8 border-grey-200 dark:border-dark-grey-200"
                />
              </FormControl>
              <FormMessage className="text-[1.1rem]" />
            </FormItem>
          )}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="text-[1.5rem] py-8 w-full bg-[#050c9c] text-white hover:bg-[#03075e] transition-all duration-300 ease-in-out disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>

        <p className="text-center">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="text-[#050c9c] dark:text-[blue] font-semibold hover:text-[#03075e] transition-all duration-300 ease-in-out disabled:cursor-not-allowed"
          >
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default AuthForm;
