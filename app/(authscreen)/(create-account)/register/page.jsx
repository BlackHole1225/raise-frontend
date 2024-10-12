'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { createUserWithEmailAndPassword, sendEmailVerification, applyActionCode } from 'firebase/auth';
import { notifySuccess } from '@/components/notification';
import { auth } from '@/utils/firebaseConfig'; // Make sure this is correctly initialized

const SignUpPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState(null); // Error state
  const router = useRouter();
  const params = useSearchParams();

 
  // Handle user sign-up
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      notifySuccess("Verification email sent! Please check your inbox.");

      // Redirect to verify-email page
      router.push('/verify-email');
    } catch (error) {
      console.error('Error in sign-up:', error);
      setError('Sign-up failed. Please try again.');
    }
  };

  // Handle email verification when clicking the link
  useEffect(() => {
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');
    if (mode === 'verifyEmail' && oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => {
          notifySuccess("Email verified successfully!");
          router.push('/next-step'); // Redirect to the next step of registration
        })
        .catch((error) => {
          console.error('Error verifying email:', error);
          setError('Email verification failed.');
        });
    }
  }, [params, router]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        size="lg"
        label="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        className="mb-5"
      />
      <Input
        size="lg"
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="mb-5"
      />
      <Input
        size="lg"
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="mb-10"
      />
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <Button type="submit" size="lg" className="bg-brand-lemon-yellow py-7 w-full font-bold">
        Submit
      </Button>
    </form>
  );
};

export default SignUpPage;
