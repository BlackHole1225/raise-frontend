'use client';
import React from 'react';
import { Button } from '@nextui-org/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/otpInput';

const Page = () => {
  return (
    <>
      <div className="self-start mt-12 text-6xl uppercase max-md:mt-10 max-md:max-w-full max-md:text-4xl font-heading mb-8">
        Verify Your email
      </div>
      <p className="text-lg font-bold text-brand-dark mb-12">
        We have sent an one time password on your email address, fill it in below and move to the
        next step.
      </p>
      <p className="text-lg font-bold text-brand-dark mb-4">One Time Password</p>
      <InputOTP
        containerClassName="w-full mb-12"
        maxLength={6}
      // onChange={(v) => setOtpValue(v.toString())}
      >
        <InputOTPGroup className="w-full gap-2">
          <InputOTPSlot className="flex-grow h-12" index={0} />
          <InputOTPSlot className="flex-grow h-12" index={1} />
          <InputOTPSlot className="flex-grow h-12" index={2} />
          <InputOTPSlot className="flex-grow h-12" index={3} />
          <InputOTPSlot className="flex-grow h-12" index={4} />
          <InputOTPSlot className="flex-grow h-12" index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        size="lg"
        className="bg-brand-lemon-yellow py-7 border border-brand-dark w-full font-bold"
        variant="solid"
      >
        Submit
      </Button>
      <div className="flex gap-1 self-center mt-12 max-w-full justify-center text-dark">
        <div className="opacity-70">Have not received the OTP yet?</div>
        <div>Resend OTP</div>
      </div>
    </>
  );
};

export default Page;
