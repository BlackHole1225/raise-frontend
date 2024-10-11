'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { SERVER_IP, SERVER_LOCAL_IP } from '@/utils/constants';
import { createUserWithEmailAndPassword,onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
const SignUpPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${SERVER_LOCAL_IP}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.push('/verify-email');
    } else {
      console.log('Error in sign-up');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        size="lg"
        label="Full Name"
        value={formData.name}
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
      <Button type="submit" size="lg" className="bg-brand-lemon-yellow py-7 w-full font-bold">
        Submit
      </Button>
    </form>
  );
};

export default SignUpPage;
