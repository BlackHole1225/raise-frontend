'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { SERVER_LOCAL_IP } from '@/utils/constants';
import { notifySuccess } from '@/components/notification';
import Image from 'next/image';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await axios.post(`${SERVER_LOCAL_IP}/api/login`, {
        email,
        password
      });
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        console.log(response.data);
        const data = response.data;

        notifySuccess('Login successful!');
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('userID', data.id);
          window.localStorage.setItem('userEmail', data.email);
          window.localStorage.setItem('authToken', data.token);
          router.push('/account')
        }


      } else {
        throw new Error('Unexpected response format');
      }

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });
  useEffect(() => {
    if (user) {
      axios.post(`${SERVER_LOCAL_IP}/api/google-login`, {
        token: user.access_token
      })
        .then((res) => {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('userID', res.data.user.id);
            window.localStorage.setItem('userEmail', res.data.user.email);
            window.localStorage.setItem('authToken', res.data.jwtToken);
            notifySuccess('Google login successful!');
            router.push('/account')
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="overflow-hidden p-8 lg:py-14 lg:pr-7 lg:pl-20 bg-brand-ivory max-md:px-5 lg:h-screen">
      <div className="flex gap-5 max-lg:flex-col-reverse h-full">
        <div className="flex flex-col w-[35%] max-md:ml-0 max-lg:w-full">
          <div className="flex flex-col self-stretch my-auto w-full text-xl font-bold text-zinc-800 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 self-start text-5xl whitespace-nowrap max-md:text-4xl">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2dc00ade95da09b368c1fef8bf0b3dc9966c324e821b245532ac1b2f21e73e3d?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
                width={60}
                height={60}
                className="object-contain shrink-0 rounded-lg"
                alt="Raise logo"
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
              onClick={login}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4afcf1048ae3f4852061b80f8ea5990ac5796d08b00ed5201f740025245bf9e8?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
                width={20}
                height={20}
                className="object-contain"
                alt="Google logo"
              />
              Continue with Google
            </Button>
            <div className="flex gap-1 self-center mt-12 max-w-full justify-center text-dark">
              <div className="opacity-70">Don&apos;t have an account? </div>
              <Link href="/register">Sign Up</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:ml-5 w-[65%] max-md:ml-0 max-lg:w-full h-full">
          <div className="flex overflow-hidden relative flex-col items-end grow text-2xl font-bold text-amber-50 rounded-3xl max-md:max-w-full h-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
              layout="fill"
              objectFit="cover"
              alt="Background image"
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
