"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

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

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log('data', data);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'new', ...data }),
      });
      console.log('submitted');
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
            className="z-10 w-full max-w-[1200px] items-center justify-between flex"
          >
        <form
          onSubmit={handleSubmit(onSubmit)}
          name="subscriptions"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/"
        >
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="z-10 w-full max-w-[1200px] flex flex-col items-center gap-9 text-center mt-20 md:mt-52"
            >
              <div className="rounded-lg w-[95%] md:w-auto">
                <div className="rounded-lg py-3 px-2.5 flex flex-col md:flex-row gap-2.5 md:gap-5 m-[1px]">
                  <div className="bg-input rounded-sm min-w-[250px] focus-within:outline">
                    <div className="flex gap-1 p-4 rounded-sm m-[1px]">
                      <span className="text-body2 text-secondary-inactive">
                        Name
                      </span>
                      <input
                        type="text"
                        placeholder="First and last"
                        className="w-full bg-transparent text-body2 text-secondary focus:outline-none"
                        required
                        disabled={isSubmitting}
                        {...register('name')}
                      />
                    </div>
                  </div>
                  <div className="bg-input rounded-sm min-w-[250px] focus-within:outline">
                    <div className="flex gap-1 p-4  rounded-sm m-[1px]">
                      <span className="text-body2 text-secondary-inactive">
                        Email
                      </span>
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full bg-transparent text-body2 text-secondary focus:outline-none"
                        required
                        disabled={isSubmitting}
                        {...register('email')}
                      />
                    </div>
                  </div>
                  <button
                    disabled={!isValid}
                    type="submit"
                    role="button"
                    aria-label="Subscribe to newsletter"
                    className="rounded-sm bg-primary hover:bg-primary-active transition-colors text-text-01 text-button1 flex gap-2 items-center justify-center px-[52px] py-[13px] mt-5 md:mt-0"
                  >
                    {isSubmitted ? (
                      <>Subscribed 🎉</>
                    ) : (
                      <>
                        Subscribe
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </form>
      </motion.div>

    </div>   
  )
}
  