'use client'
// components/DynamicForm.tsx
import React from 'react';
import { MessageIcon } from '../icons/MessageIcon';
import { LockIcon } from '../icons/LockIcon';
import Link from 'next/link';

interface DynamicFormProps {
  values?: {
    username?: string;
    email?: string;
    password?: string;
  };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DEFAULT_VALUES = {
  username: '',
  email: '',
  password: ''
};

const DEFAULT_ONCHANGE = () => {};

const DynamicForm: React.FC<DynamicFormProps> = ({ 
  values = DEFAULT_VALUES,
  onChange = DEFAULT_ONCHANGE 
}) => {
  return (
    <div className="space-y-5 mt-4.5">
      <div className="flex flex-col">
        <label htmlFor="username" className="text-[#4a4c56] text-base mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={values.username ?? ''}
          onChange={onChange}
          className="py-3.5 px-5 border border-[#f0ece4] bg-white rounded-xl"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-[#4a4c56] text-base mb-2">
          Email
        </label>
        <div className="relative">
          <MessageIcon className="absolute left-5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={values.email ?? ''}
            onChange={onChange}
            className="py-3.5 pr-5 pl-12 border border-[#f0ece4] bg-white rounded-xl w-full"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-[#4a4c56] text-base mb-2">
          Password
        </label>
        <div className="relative">
          <LockIcon className="absolute left-5 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password ?? ''}
            onChange={onChange}
            className="py-3.5 pr-5 pl-12 border border-[#f0ece4] bg-white rounded-xl w-full"
          />
        </div>
      </div>

      <button className=' w-full my-3.5 bg-[#0b2a3b] py-3.5 rounded-xl text-white font-medium'>Sign up</button>
      <p className=' text-center'>Already have an account? <Link href="#" className=' text-[#0b2a3b] font-medium'>Log In</Link></p>
    </div>
  );
};

export default DynamicForm;