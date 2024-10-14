'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  applyActionCode, 
  onAuthStateChanged 
} from 'firebase/auth';
import { notifySuccess, errorNotify } from '@/components/notification';
import { auth } from '@/utils/firebaseConfig'; 
import { apiClient } from '@/utils/api';

const SignUpPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState(null); // Error state
  const [user, setUser] = useState(null); // Track user state
  const [emailVerified, setEmailVerified] = useState(false); // Track email verification status
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

    } catch (error) {
      errorNotify(error.message); // Use errorNotify for handling errors
    }
  };

  // Function to register user details in the backend (called after email verification)
  const register = async () => {
    try {
      await apiClient.post(`${SERVER_LOCAL_IP}/api/register`, {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        address: "",
        phoneNumber: 12222,
        avatar: ""
      });
      notifySuccess('Registration successful!');
    } catch (error) {
      errorNotify('Failed to register user in the backend.');
    }
  };

  // Handle email verification when clicking the link
  useEffect(() => {
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');

    if (mode === 'verifyEmail' && oobCode) {
      applyActionCode(auth, oobCode)
        .then((e) => {
          console.log(e);
          notifySuccess("Email verified successfully!");
          // register(); // Call register function after successful email verification
          // router.push('/login'); // Redirect to the login page
        })
        .catch((error) => {
          console.error('Error verifying email:', error);
          setError('Email verification failed.');
          errorNotify('Email verification failed.');
        });
    }
  }, [params, router]);

  // Check if user is logged in and their email is verified
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        setEmailVerified(user.emailVerified);
      } else {
        setUser(null);
      }
    });
  }, []);

  // Function to resend verification email
  const resendVerificationEmail = async () => {
    if (user && !emailVerified) {
      try {
        await sendEmailVerification(user);
        notifySuccess('Verification email resent. Please check your inbox.');
      } catch (error) {
        errorNotify('Failed to resend verification email.');
      }
    } else {
      errorNotify('User is not available or already verified.');
    }
  };

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

      {/* Resend verification email button */}
      {user && !emailVerified && (
        <Button onClick={resendVerificationEmail} size="lg" className="mt-5 w-full bg-blue-500">
          Resend Verification Email
        </Button>
      )}
    </form>
  );
};

export default SignUpPage;
