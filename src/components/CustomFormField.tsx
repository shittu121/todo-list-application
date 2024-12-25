// prettier-ignore
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Control } from 'react-hook-form';
import PasswordVisibilityToggle from './PasswordVisibilityToggle';

interface CustomFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  placeholder: string;
  name: string;
  type: string;
  isPassword?: boolean;
}

const CustomFormField = (props: CustomFormProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const { control, label, placeholder, name, type, isPassword } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className='flex justify-between'>
            <FormLabel className='text-[1.4rem]'>{label}</FormLabel>
            {isPassword && (
              <PasswordVisibilityToggle setIsToggled={setIsToggled} />
            )}
          </div>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type === 'password' && isToggled ? 'text' : type}
              className='text-2xl border-grey-200 dark:border-dark-grey-200'
            />
          </FormControl>
          <FormMessage className='text-[1.1rem]' />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;