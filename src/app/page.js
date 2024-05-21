"use client"
import React from 'react';
import { useForm } from 'react-hook-form';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitted, isSubmitting }
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'subscriptions', ...data }),
    })
      .then(() => alert('Success!'))
      .catch((error) => alert(error));
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Name
          <input
            type="text"
            placeholder="First and last"
            className="w-full bg-transparent text-body2 text-secondary focus:outline-none"
            required
            disabled={isSubmitting}
            {...register('name')}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Email 
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-transparent text-body2 text-secondary focus:outline-none"
            required
            disabled={isSubmitting}
            {...register('email')}
          />
        </label>
      </div>
      <div>
        <button
          disabled={!isValid}
          type="submit"
          role="button"
          aria-label="Subscribe to newsletter"
         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
         >Submit</button>
      </div>
    </form>
    </div>   
  )
}
  