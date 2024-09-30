'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

const SignUpPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
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
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
