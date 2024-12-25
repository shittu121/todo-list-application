import { Dispatch, SetStateAction } from 'react';
import { Input } from './ui/input';

interface PasswordVisibilityToggleProp {
  setIsToggled: Dispatch<SetStateAction<boolean>>;
}

const PasswordVisibilityToggle = ({
  setIsToggled,
}: PasswordVisibilityToggleProp) => {
  return (
    <div className='flex items-center space-x-2 '>
      <Input
        id='password-visibility'
        type='checkbox'
        onChange={() => setIsToggled(prev => !prev)}
        className='h-[16px] w-[14px] rounded-sm checked:accent-brand-500 transition-all duration-300 ease-in-out'
      />
      <label
        htmlFor='password-visibility'
        className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[1.4rem] cursor-pointer'>
        Show password
      </label>
    </div>
  );
};

export default PasswordVisibilityToggle;