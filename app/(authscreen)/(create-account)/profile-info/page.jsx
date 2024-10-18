'use client';
import React, { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import DragDropUpload from '../../../../components/ui/dragDropUpload';
import apiClient from '@/utils/api';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { notifySuccess, notifyError } from '@/components/notification';
import { auth } from '@/utils/firebaseConfig';
import { useProfileInfoContext } from '@/app/providers';

auth.languageCode = 'it';
const Page = () => {
  const router = useRouter();
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const { setProfileInfo, setPhoneVerifyAvatar } = useProfileInfoContext();
  const handleProfilePictureChange = (file) => {
    setProfilePicture(file);
  };
  const imageUpload = async () => {
    const formData = new FormData();
    Array.from(profilePicture).forEach(f => {
      formData.append('files', f);
    });

    try {
      const response = await apiClient.post(`/api/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Ensure the response contains the uploaded file information
      const uploadedFiles = response.data.uploaded;
      console.log('Uploaded Files:', uploadedFiles);

      if (uploadedFiles != undefined) {
        // Map the file IDs
        const avatar = uploadedFiles[0]?.imgUrl;
        return avatar;
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,
      "recaptcha-container",
      {
        'size': 'invisible', // or 'normal'
        'callback': () => {
          console.log('reCAPTCHA solved');
        }
      }
    );
  };
  const sendOtp = async () => {
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNo, appVerifier);
      setProfileInfo({ phoneNo, address, confirmationResult });
      router.push('/verify-mobile');
      notifySuccess('OTP sent');
    } catch (error) {
      notifyError('Error sending OTP', error.message);
    }
  };


  const handleSubmit = async () => {
    if (phoneNo == '' && address == '') {
      notifyError('Please enter your phone number and address');
      return;
    }
    if (profilePicture.length > 0) {
      const avatar = await imageUpload();
      setPhoneVerifyAvatar(avatar);
    }
    setUpRecaptcha();
    sendOtp();
  };
  return (
    <>
      <div className="self-start mt-12 text-6xl uppercase max-md:mt-10 max-md:max-w-full max-md:text-4xl font-heading mb-8">
        Let’s know more about you
      </div>
      <DragDropUpload
        acceptedFormats={{
          'image/*': ['.jpeg', '.png', '.jpg', '.gif']
        }}
        isMultiple={true}
        label="Profile Picture"
        onChange={handleProfilePictureChange}
      />
      <Input
        size="lg"
        variant="bordered"
        label="Phone Number"
        radius="sm"
        className="my-5"
        classNames={{
          inputWrapper: 'border border-brand-dark'
        }}
        onChange={(e) => {
          setPhoneNo(e.target.value);
        }}
      />
      <Input
        size="lg"
        variant="bordered"
        label="Residential Address"
        radius="sm"
        className="mb-5"
        classNames={{
          inputWrapper: 'border border-brand-dark'
        }}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <Button
        size="lg"
        className="bg-brand-lemon-yellow py-7 border border-brand-dark w-full font-bold"
        variant="solid"
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <div id="recaptcha-container"></div>
    </>
  );
};

export default Page;
