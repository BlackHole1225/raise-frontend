'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Avatar } from '@nextui-org/avatar';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from "@nextui-org/select";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import DragDropUpload from '@/components/ui/dragDropUpload';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/otpInput';
import { SERVER_LOCAL_IP } from '@/utils/constants';
import { useRouter, useSearchParams } from "next/navigation"
import { notifySuccess, notifyError } from '@/components/notification';
import apiClient from '@/utils/api';
import { auth } from '@/utils/firebaseConfig'; 
import { checkActionCode, createUserWithEmailAndPassword, sendEmailVerification, updateEmail } from 'firebase/auth';



const Setting = () => {
  const [openModal, setOpenModal] = useState(null);
  const [file, setFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const router = useRouter()
  const params = useSearchParams();
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const getUserInfo = async () => {
    try {
      console.log('here');
      const response = await apiClient.get(`/api/user/`);
      setInfo(response.data.user);
    } catch (error) {
      setError("Error changing email:");
    }
  }
  const updateAvatar = async () => {
    const formData = new FormData();
    Array.from(file).forEach(f => {
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
        const avatar = uploadedFiles[0]?._id;
        return avatar;
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };
  const logout = () => {
    window.localStorage.setItem('userID', '');
    window.localStorage.setItem('userName', '');
    window.localStorage.setItem('userEmail', '');
    window.localStorage.setItem('authToken', '');
    router.push('/login')
  }
  const updateProfile = async () => {
    setError(null); // Clear previous errors
    const formData = new FormData();
    // formData.append('avatar', file);
    formData.append('fullName', info?.fullName);
    formData.append('address', info?.address);
    formData.append('email', localStorage?.getItem('userEmail'));
    const avatar = await updateAvatar();
    formData.append('avatar', avatar);
    try {
      const response = await apiClient.post(`${SERVER_LOCAL_IP}/api/updateUserProfile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage?.getItem("authToken")}`, // JWT token for auth
          },
        }
      );
      notifySuccess('Updated successfully!');
      setOpenModal(null)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        console.log(response.data);
        const user = response.data.user;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('userEmail', user.email);
          getUserInfo();
        }

      } else {
        // Handle unexpected content-type
        throw new Error('Unexpected response format');
      }

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    }
  };
  const changePassword = async () => {
    if (newPassword && newConfirmPassword && currentPassword) {
      if (newPassword !== newConfirmPassword) {
        setError('The passwords for verification do not match.');
        return;
      }
      try {
        await apiClient.post(`/api/changePassword`, {
          currentPassword, // Current password
          newPassword,     // New password
        }, {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("authToken")}`, // JWT token for auth
          },
        });

        notifySuccess('Password was updated successfully');
        setOpenModal(null)
      } catch (error) {
        console.error("Error changing password:", error);
      }
    } else {
      setError('The input value is incorrect.')
    }

  };
  const changeEmail = async () => {
    try {
      const user = auth.currentUser;  
      if (!user) {
        throw new Error("No user is currently authenticated.");
      }
  
  
      await updateEmail(user,info?.email);
      
      console.log(user);
      // Send email verification
      await sendEmailVerification(user);
      notifySuccess("Verification email sent! Please check your inbox.");

    } catch (error) {
      console.log(error.message); // Use errorNotify for handling errors
    }
  }
  const handleOpenModal = (modalNumber) => {
    setOpenModal(modalNumber);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  useEffect(() => {
    getUserInfo();
  }, [])
  useEffect(() => {
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');

    if (mode === 'verifyEmail' && oobCode) {
      checkActionCode(auth, oobCode)
        .then((e) => {
          checkVerify(e.data.email);
          notifySuccess("Email verified successfully!");
          router.push('/profile-info'); // Redirect to the login page
        })
        .catch((error) => {
          console.error('Error verifying email:', error);
          setError('Email verification failed.');
          errorNotify('Email verification failed.');
        });
    }
  }, [params, router]);
  return (
    <div className="pt-0 md:pt-20 pb-[232px]">
      <h1 className="uppercase text-5xl font-bold text-brand-dark font-heading">
        ACCOUNT SETTINGS
      </h1>
      <div className="xl:grid xl:grid-cols-12 gap-5 mt-5 text-xl md:text-2xl">
        <div className="bg-brand-eucalyptus pt-[46px] px-10 pb-[90px] col-span-6 text-brand-olive-green font-bold">
          {info?.avatar ? <Avatar
            src={`${SERVER_LOCAL_IP}/api/file/download/${info?.avatar}`}
            className="w-[180px] h-[180px]"
          /> : <Avatar
            src={``}
            className="w-[180px] h-[180px]"
          />}
          <h3 className="mt-[22px]">{info?.fullName}</h3>
          <div className="flex flex-col gap-6 mt-8 md:mt-[60px]">
            <h3 className="pb-[14px] border-b border-b-brand-olive-green/20">
              <span className="opacity-70">Name:</span> {info?.fullName}
            </h3>
            <h3 className="pb-[14px] border-b border-b-brand-olive-green/20">
              <span className="opacity-70">Email:</span> {info?.email}
            </h3>
            <h3 className="pb-[14px] border-b border-b-brand-olive-green/20">
              <span className="opacity-70">Phone:</span> {info?.phoneNumber}
            </h3>
            <h3 className="pb-[14px] border-b border-b-brand-olive-green/20">
              <span className="opacity-70">Address:</span> {info?.address}
            </h3>
          </div>
        </div>
        <div className="bg-brand-lemon-yellow pt-[46px] px-10 pb-[90px] col-span-6 text-brand-olive-green/70 font-bold mt-8 xl:mt-0">
          <h2 className="text-3xl md:text-4xl">ACTIONS</h2>
          <div className="flex flex-col gap-6 mt-[38px]">
            <div className="flex justify-between pb-[14px] border-b border-b-brand-olive-green/20">
              <h3>Edit Profile</h3>
              <button onClick={() => handleOpenModal(1)}>
                <Image src="/images/edit.svg" width={24} height={24} alt="Edit Icon" />
              </button>
            </div>
            <div className="flex justify-between pb-[14px] border-b border-b-brand-olive-green/20">
              <h3>Change Password</h3>
              <button onClick={() => handleOpenModal(2)}>
                <Image src="/images/lock.svg" width={24} height={24} alt="Lock" />
              </button>
            </div>
            <div className="flex justify-between pb-[14px] border-b border-b-brand-olive-green/20">
              <h3>Change Email</h3>
              <button onClick={() => handleOpenModal(3)}>
                <Image src="/images/email.svg" width={24} height={24} alt="Email Icon" />
              </button>
            </div>
            <div className="flex justify-between pb-[14px] border-b border-b-brand-olive-green/20">
              <h3>Change Phone Number</h3>
              <button onClick={() => handleOpenModal(4)}>
                <Image src="/images/phone.svg" width={24} height={24} alt="Phone Icon" />
              </button>
            </div>
            <div onClick={() => logout()} className="flex justify-between pb-[14px] border-b border-b-brand-olive-green/20">
              <h3>Log Out</h3>
              <button>
                <Image src="/images/logout.svg" width={24} height={24} alt="Logout Icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {openModal === 1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-brand-lemon-yellow px-9 pt-10 pb-[50px] rounded-lg shadow-lg w-1/3 text-brand-olive-green">
            <h3 className="text-3xl font-bold mb-4">EDIT PROFILE</h3>
            <button
              onClick={handleCloseModal}
              className="absolute top-10 right-9 text-5xl hover:text-red-500"
            >
              &times;
            </button>
            <DragDropUpload
              acceptedFormats={{
                'image/*': ['.jpeg', '.png', '.jpg', '.gif']
              }}
              onChange={(e) => setFile(e)}
              isMultiple={true}
              label=""
            />
            <Input
              size="lg"
              variant="bordered"
              label="Name"
              radius="sm"
              value={info?.fullName}
              onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
              placeholder=""
              classNames={{
                inputWrapper:
                  'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark mt-4 h-full',
                input: 'py-1',
                label: 'font-bold text-xl'
              }}
            />
            <Input
              size="lg"
              variant="bordered"
              label="Address"
              radius="sm"
              value={info?.address}
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
              placeholder=""
              classNames={{
                inputWrapper:
                  'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark mt-4 h-full',
                input: 'py-1',
                label: 'font-bold text-xl'
              }}
            />
            <div className='flex items-center gap-2 mt-[58px]'>
              <button
                onClick={handleCloseModal}
                className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
              >
                <IoMdClose size={16} />
                Close
              </button>
              <button onClick={updateProfile} className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
              >
                <FaCheck size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {openModal === 2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-brand-lemon-yellow px-9 pt-10 pb-[50px] rounded-lg shadow-lg w-1/3 text-brand-olive-green">
            <h3 className="text-3xl font-bold mb-4">CHANGE PASSWORD</h3>
            <button
              onClick={handleCloseModal}
              className="absolute top-10 right-9 text-5xl hover:text-red-500"
            >
              &times;
            </button>
            <p className="mb-6 text-lg font-bold">Enter the previous password and then the new password to change your account password.</p>
            <div className='mt-[60px]'>
              <Input
                size="lg"
                variant="bordered"
                label="Previous Password"
                radius="sm"
                onChange={(e) => setCurrentPassword(e.target.value)}
                classNames={{
                  inputWrapper:
                    'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark mt-4 h-full',
                  input: 'py-1',
                  label: 'font-bold text-xl'
                }}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                      <MdOutlineVisibilityOff className="text-2xl pointer-events-none" />
                    ) : (
                      <MdOutlineVisibility className="text-2xl pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
              <Input
                size="lg"
                variant="bordered"
                label="New Password"
                radius="sm"
                onChange={(e) => setNewPassword(e.target.value)}
                classNames={{
                  inputWrapper:
                    'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark mt-4 h-full',
                  input: 'py-1',
                  label: 'font-bold text-xl'
                }}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                      <MdOutlineVisibilityOff className="text-2xl pointer-events-none" />
                    ) : (
                      <MdOutlineVisibility className="text-2xl pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
              <Input
                size="lg"
                variant="bordered"
                label="New Password(Again)"
                radius="sm"
                onChange={(e) => setNewConfirmPassword(e.target.value)}
                classNames={{
                  inputWrapper:
                    'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark mt-4 h-full',
                  input: 'py-1',
                  label: 'font-bold text-xl'
                }}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                      <MdOutlineVisibilityOff className="text-2xl pointer-events-none" />
                    ) : (
                      <MdOutlineVisibility className="text-2xl pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>
            <div className='flex items-center gap-2 mt-[129px]'>
              <button
                onClick={handleCloseModal}
                className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
              >
                <IoMdClose size={16} />
                Close
              </button>
              <button
                onClick={() => changePassword()}
                className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
              >
                <FaCheck size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {openModal === 3 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-brand-lemon-yellow px-9 pt-10 pb-[50px] rounded-lg shadow-lg w-1/3 text-brand-olive-green">
            <h3 className="text-3xl font-bold mb-4">CHANGE EMAIL</h3>
            <button
              onClick={handleCloseModal}
              className="absolute top-10 right-9 text-5xl hover:text-red-500"
            >
              &times;
            </button>
            <p className="mb-6 text-lg font-bold">Enter your new email address and then verify your email by adding the otp sent on your email address to change your account email.</p>
            <div className='mt-9'>
              <Input
                size="lg"
                variant="bordered"
                label="New Email Address"
                radius="sm"
                value={info?.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                placeholder=""
                classNames={{
                  inputWrapper:
                    'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark h-full',
                  input: 'py-1',
                  label: 'font-bold text-xl'
                }}
              />
              <Select
                placeholder="Select a reason why you're changing email"
                style={{ backgroundColor: 'transparent' }}
                className="border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark h-full font-bold text-xl rounded-lg mt-4 py-1"
              >
                <SelectItem>
                  Lost the previous email account.
                </SelectItem>
              </Select>
            </div>
            {/* <button
              onClick={() => handleOpenModal(5)}
              className="mt-6 w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green hover:text-red-500 hover:border-red-500"
            >
              Send OTP
            </button> */}
            <button
              onClick={() => changeEmail()}
              className="mt-6 w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green hover:text-red-500 hover:border-red-500"
            >
              Send OTP
            </button>
            <p className='text-xl font-bold mt-36 text-nowrap'>A notification will be sent on your previous email about this.</p>
          </div>
        </div>
      )}
      {openModal === 4 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-brand-lemon-yellow px-9 pt-10 pb-[50px] rounded-lg shadow-lg w-1/3 text-brand-olive-green">
            <h3 className="text-3xl font-bold mb-4">CHANGE PHONE NUMBER</h3>
            <button
              onClick={handleCloseModal}
              className="absolute top-10 right-9 text-5xl hover:text-red-500"
            >
              &times;
            </button>
            <p className="mb-6 text-lg font-bold">Enter your new phone and then verify your phone by adding the otp sent on your phone to change your account phone.</p>
            <div className='mt-9'>
              <Input
                size="lg"
                variant="bordered"
                label="New Phone Number"
                radius="sm"
                placeholder=""
                classNames={{
                  inputWrapper:
                    'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark h-full',
                  input: 'py-1',
                  label: 'font-bold text-xl'
                }}
              />
              <Select
                placeholder="Select a reason why you're changing phone number"
                style={{ backgroundColor: 'transparent' }}
                className="border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark h-full font-bold text-xl rounded-lg mt-4 py-1"
              >
                <SelectItem>
                  Lost the previous phone number.
                </SelectItem>
              </Select>
            </div>
            <button
              onClick={() => handleOpenModal(6)}
              className="mt-6 w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green hover:text-red-500 hover:border-red-500"
            >
              Send OTP
            </button>
            <p className='text-xl font-bold mt-36 text-nowrap'>A notification will be sent on your previous phone about this.</p>
          </div>
        </div>
      )}
      {openModal === 5 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-brand-lemon-yellow px-9 pt-10 pb-[50px] rounded-lg shadow-lg w-1/3 text-brand-olive-green">
            <h3 className="text-3xl font-bold mb-4">VERIFY NEW EMAIL ADDRESS</h3>
            <button
              onClick={handleCloseModal}
              className="absolute top-10 right-9 text-5xl hover:text-red-500"
            >
              &times;
            </button>
            <p className="text-lg font-bold">
              We have sent an one time password on your email address, fill it in below and move to the next step.
            </p>
            <p className="mt-14 text-lg font-bold">
              One Time Password
            </p>
            <div className="mt-6">
              <InputOTP
                containerClassName="w-full"
                maxLength={6}
              // onChange={(v) => setOtpValue(v.toString())}
              >
                <InputOTPGroup className="w-full flex gap-2">
                  <InputOTPSlot className="flex-grow h-12" index={0} />
                  <InputOTPSlot className="flex-grow h-12" index={1} />
                  <InputOTPSlot className="flex-grow h-12" index={2} />
                  <InputOTPSlot className="flex-grow h-12" index={3} />
                  <InputOTPSlot className="flex-grow h-12" index={4} />
                  <InputOTPSlot className="flex-grow h-12" index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex gap-1 mt-12 max-w-full font-bold">
              <div className="opacity-70">Have not received the OTP yet?</div>
              <button>Resend OTP</button>
            </div>
            <button
              className="mt-9 w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green hover:text-red-500 hover:border-red-500"
            >
              Verify
            </button>
            <p className="mt-[105px] text-lg font-bold">A notification will be sent on your previous email about this.</p>
          </div>
        </div>
      )}

      {openModal === 6 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-brand-lemon-yellow px-9 pt-10 pb-[50px] rounded-lg shadow-lg w-1/3 text-brand-olive-green">
            <h3 className="text-3xl font-bold mb-4">VERIFY NEW PHONE NUMBER</h3>
            <button
              onClick={handleCloseModal}
              className="absolute top-10 right-9 text-5xl hover:text-red-500"
            >
              &times;
            </button>
            <p className="text-lg font-bold">
              We have sent an one time password on your email address, fill it in below and move to the next step.
            </p>
            <p className="mt-14 text-lg font-bold">
              One Time Password
            </p>
            <div className="mt-6">
              <InputOTP
                containerClassName="w-full"
                maxLength={6}
              // onChange={(v) => setOtpValue(v.toString())}
              >
                <InputOTPGroup className="w-full flex gap-2">
                  <InputOTPSlot className="flex-grow h-12" index={0} />
                  <InputOTPSlot className="flex-grow h-12" index={1} />
                  <InputOTPSlot className="flex-grow h-12" index={2} />
                  <InputOTPSlot className="flex-grow h-12" index={3} />
                  <InputOTPSlot className="flex-grow h-12" index={4} />
                  <InputOTPSlot className="flex-grow h-12" index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex gap-1 mt-12 max-w-full font-bold">
              <div className="opacity-70">Have not received the OTP yet?</div>
              <button>Resend OTP</button>
            </div>
            <button
              className="mt-9 w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green hover:text-red-500 hover:border-red-500"
            >
              Verify
            </button>
            <p className="mt-[105px] text-lg font-bold">A notification will be sent on your previous email about this.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
