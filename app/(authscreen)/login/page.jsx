'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Link from 'next/link';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { SERVER_IP, SERVER_LOCAL_IP } from '@/utils/constants';
import { notifySuccess, notifyError } from '@/components/notification';


const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // function UseClientSideStorage(key, defaultValue) {
  //   useEffect(() => {
  //     const value = localStorage.getItem(key) || defaultValue;
  //     console.log(value);
  //     localStorage.setItem(key, value);
  //   }, [key, defaultValue]);
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await axios.post(`${SERVER_LOCAL_IP}/api/login`, {
        // const response = await fetch(`${SERVER_IP}/api/login`, {
        email,
        password
      });
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        console.log(response.data);
        const data = response.data;

        notifySuccess('Login successful!');
        if (typeof window !== 'undefined') {
          // Save user info and token in window.localStorage
          window.localStorage.setItem('userID', data.id);
          window.localStorage.setItem('userName', data.fullName);
          window.localStorage.setItem('userEmail', data.email);
          window.localStorage.setItem('authToken', data.token);
          // Redirect to campaigns page after successful login
          window.location.href = '/campaigns';
        }

        // UseClientSideStorage('userID', data.id);
        // UseClientSideStorage('userName', data.fullName);
        // UseClientSideStorage('userEmail', data.email);
        // UseClientSideStorage('authToken', data.token);

      } else {
        // Handle unexpected content-type
        throw new Error('Unexpected response format');
      }

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    }
  };
  return (
    <div className="overflow-hidden p-8 lg:py-14 lg:pr-7 lg:pl-20 bg-brand-ivory max-md:px-5 lg:h-screen">
      <div className="flex gap-5 max-lg:flex-col-reverse h-full">
        <div className="flex flex-col w-[35%] max-md:ml-0 max-lg:w-full">
          <div className="flex flex-col self-stretch my-auto w-full text-xl font-bold text-zinc-800 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 self-start text-5xl whitespace-nowrap max-md:text-4xl">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2dc00ade95da09b368c1fef8bf0b3dc9966c324e821b245532ac1b2f21e73e3d?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
                className="object-contain shrink-0 rounded-lg aspect-square w-[60px]"
                alt="lazy"
              />
              <div className="self-start mt-2.5 basis-auto max-md:text-4xl">Raise.</div>
            </div>

            <div className="self-start mt-12 text-6xl uppercase max-md:mt-10 max-md:max-w-full max-md:text-4xl font-heading mb-8">
              Login To Your Account
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                size="lg"
                variant="bordered"
                label="Email"
                type="email"
                radius="sm"
                className="mb-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                classNames={{
                  inputWrapper: 'border border-brand-dark'
                }}
              />
              <Input
                size="lg"
                variant="bordered"
                label="Password"
                type="password"
                radius="sm"
                className="mb-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                classNames={{
                  inputWrapper: 'border border-brand-dark'
                }}
              />
              {error && <p className="text-red-500 mb-5">{error}</p>}
              <Link href="/" className="text-brand-dark text-xl mb-10">
                Forgot Password?
              </Link>
              <Button
                size="lg"
                className="bg-brand-lemon-yellow py-7 border border-brand-dark w-full font-bold"
                variant="solid"
                type="submit"
              >
                Submit
              </Button>
            </form>

            <div className="flex gap-1.5 items-center my-6 whitespace-nowrap">
              <div className="shrink-0 self-stretch my-auto w-2 grow h-px border border-solid border-zinc-800" />
              <p className="self-stretch">Or</p>
              <div className="shrink-0 self-stretch my-auto w-2 grow h-px border border-solid border-zinc-800" />
            </div>

            <Button
              size="lg"
              className="bg-white py-7 border border-brand-dark w-full font-bold"
              variant="solid"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4afcf1048ae3f4852061b80f8ea5990ac5796d08b00ed5201f740025245bf9e8?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
                className="object-contain w-5 aspect-square"
                alt="lazy"
              />
              Continue with Google
            </Button>
            <div className="flex gap-1 self-center mt-12 max-w-full justify-center text-dark">
              <div className="opacity-70">Don't have an account? </div>
              <Link href="/register">Sign Up</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:ml-5 w-[65%] max-md:ml-0 max-lg:w-full h-full">
          <div className="flex overflow-hidden relative flex-col items-end grow text-2xl font-bold text-amber-50 rounded-3xl max-md:max-w-full h-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
              className="object-cover absolute inset-0 size-full"
              alt="lazy"
            />
            <div className="min-h-[450px] flex overflow-hidden relative flex-col px-11 pb-11 rounded-3xl max-md:px-5 max-md:max-w-full h-full justify-end">
              <div className="max-md:max-w-full">
                Raise allows you to create online fundraising campaigns effortlessly with our
                easy-to-use tools.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
