'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  checkActionCode,
} from 'firebase/auth';
import { notifySuccess, notifyError } from '@/components/notification';
import { auth } from '@/utils/firebaseConfig';
// import { apiClient } from '@/utils/api';
import { SERVER_LOCAL_IP } from '@/utils/constants';
import { useProfileInfoContext } from '@/app/providers';

const SignUpPage = () => {
  const { setPhoneVerifyEmail } = useProfileInfoContext();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState(null); // Error state
  const [user, setUser] = useState(null); // Track user state
  // const [emailVerified, setEmailVerified] = useState(false); // Track email verification status
  const router = useRouter();
  const params = useSearchParams();

  // Handle user sign-up
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${SERVER_LOCAL_IP}/api/register`, {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      address: "",
      phoneNumber: 12222,
      avatar: ""
    });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      notifySuccess("Verification email sent! Please check your inbox.");

    } catch (error) {
      notifyError(error.message); // Use notifyError for handling errors
    }
  };

  // Function to register user details in the backend (called after email verification)

  const checkVerify = async (email) => {
    const res = await axios.get(`${SERVER_LOCAL_IP}/api/user/set-verify/${email}`);
    console.log(res);
  }
  // Handle email verification when clicking the link
  useEffect(() => {
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');

    if (mode === 'verifyEmail' && oobCode) {
      checkActionCode(auth, oobCode)
        .then((e) => {
          checkVerify(e.data.email);
          notifySuccess("Email verified successfully!");
          localStorage.setItem('phoneVerifyEmail', e.data.email);
          setPhoneVerifyEmail(e.data.email);
          
          router.push('/profile-info'); // Redirect to the login page
        })
        .catch((error) => {
          console.error('Error verifying email:', error);
          setError('Email verification failed.');
          notifyError('Email verification failed.');
        });
    }
  }, [params]);

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
    <>
      <div className="self-start mt-12 text-6xl uppercase max-md:mt-10 max-md:max-w-full max-md:text-4xl font-heading mb-8">
        Create an Account
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          size="lg"
          label="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="mb-5"
          classNames={{
            inputWrapper: 'border border-brand-dark'
          }}
        />
        <Input
          size="lg"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mb-5"
          classNames={{
            inputWrapper: 'border border-brand-dark'
          }}
        />
        <Input
          size="lg"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="mb-10"
          classNames={{
            inputWrapper: 'border border-brand-dark'
          }}
        />
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

        <Button type="submit" size="lg" className="bg-brand-lemon-yellow py-7 border border-brand-dark w-full font-bold">
          Submit
        </Button>

        {/* Resend verification email button */}
        {/* {user && !emailVerified && (
          <Button onClick={resendVerificationEmail} size="lg" className="mt-5 w-full bg-blue-500">
            Resend Verification Email
          </Button>
        )} */}
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
        <Image
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4afcf1048ae3f4852061b80f8ea5990ac5796d08b00ed5201f740025245bf9e8?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
          width={20}
          height={20}
          alt="Google logo"
          className="object-contain aspect-square"
        />
        Continue with Google
      </Button>
      <div className="flex gap-1 self-center mt-12 max-w-full justify-center text-dark">
        <div className="opacity-70">Already have an account? </div>
        <Link href="/login">Sign In</Link>
      </div>
    </>
  );
};

export default SignUpPage;
