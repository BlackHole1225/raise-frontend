'use client';

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Avatar } from '@nextui-org/avatar';
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import DragDropUpload from '@/components/ui/dragDropUpload';

const Setting = () => {
  const [openModal, setOpenModal] = useState(null);

  const handleOpenModal = (modalNumber) => {
    setOpenModal(modalNumber);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const uploadFile = async (files) => {
    const formData = new FormData();

    // If multiple files, append them
    if (Array.isArray(files)) {
      files.forEach((file, index) => formData.append('file_' + index, file));
    } else {
      formData.append('files', files); // Single file
    }

    try {
      const response = await axios.post(`${FSERVER_IP}/api/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Ensure the response contains the uploaded file information
      const uploadedFiles = response.data.uploaded;
      console.log('Uploaded Files:', uploadedFiles);

      if (uploadedFiles != undefined) {
        // Map the file IDs
        const fileIds = uploadedFiles.map((file) => file._id);
        return fileIds;
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };
  // Function to handle the campaign image upload
  const handleCamImg = (img) => {
    setCampaignImage(img);
    if (typeof window !== 'undefined' && img != undefined) {
      const campaignImgReader = new FileReader();
      campaignImgReader.onloadend = function () {
        setCamImgFile(campaignImgReader.result);
      };
      campaignImgReader.readAsDataURL(img); // Trigger onloadend
    }
  };

  return (
    <div className="pt-20 pb-[232px]">
      <h1 className="uppercase text-5xl font-bold text-brand-dark font-heading">
        ACCOUNT SETTINGS
      </h1>
      <div className="grid grid-cols-12 gap-5 mt-5">
        <div className="bg-brand-eucalyptus pt-[46px] px-10 pb-[90px] col-span-6 text-brand-olive-green text-2xl font-bold">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className="w-[180px] h-[180px]"
          />
          <h3 className="mt-[22px]">SHUDDEESHA PATNAYAK</h3>
          <div className="flex flex-col gap-6 mt-[60px]">
            <h3 className="pb-[14px] border-b border-b-brand-olive-green/20">
              <span className="opacity-70">Name:</span> Sudeesha Patnayak
            </h3>
            <h3 className="pb-[14px] border-b border-b-brand-olive-green/20">
              <span className="opacity-70">Email:</span> mesudeesha@outlook.com
            </h3>
            <h3 className="pb-[14px] border-b border-b-brand-olive-green/20">
              <span className="opacity-70">Phone:</span> +91-9837398489
            </h3>
            <h3 className="pb-[14px] border-b border-b-brand-olive-green/20">
              <span className="opacity-70">Address:</span> 1A, 115 C-Scheme, Jaipur, Rajasthan (302016)
            </h3>
          </div>
        </div>
        <div className="bg-brand-lemon-yellow pt-[46px] px-10 pb-[90px] col-span-6 text-brand-olive-green/70 text-2xl font-bold">
          <h2 className="text-4xl">ACTIONS</h2>
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
            <div className="flex justify-between pb-[14px] border-b border-b-brand-olive-green/20">
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
          <div className="relative bg-brand-lemon-yellow px-9 pt-10 pb-[50px] rounded-lg shadow-lg w-1/3 text-brand-dark">
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
              isMultiple={false}
              label=""
            />
            <div className='flex items-center gap-2 mt-[58px]'>
              <button
                onClick={handleCloseModal}
                className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
              >
                <IoMdClose size={16} />
                Close
              </button>
              <button
                onClick={handleCloseModal}
                className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
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
          <div className="relative bg-brand-lemon-yellow px-9 pt-10 pb-[50px] rounded-lg shadow-lg w-1/3 text-brand-dark">
            <h3 className="text-3xl font-bold mb-4">CHANGE PASSWORD</h3>
            <button
              onClick={handleCloseModal}
              className="absolute top-10 right-9 text-5xl hover:text-red-500"
            >
              &times;
            </button>
            <p className="mb-4">Change your password here.</p>
            <div className='flex items-center gap-2 mt-[58px]'>
              <button
                onClick={handleCloseModal}
                className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
              >
                <IoMdClose size={16} />
                Close
              </button>
              <button
                onClick={handleCloseModal}
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
          <div className="relative bg-brand-lemon-yellow px-9 pt-10 pb-[50px] rounded-lg shadow-lg w-1/3 text-brand-dark">
            <h3 className="text-3xl font-bold mb-4">CHANGE EMAIL</h3>
            <button
              onClick={handleCloseModal}
              className="absolute top-10 right-9 text-5xl hover:text-red-500"
            >
              &times;
            </button>
            <p className="mb-4">Change your Email here.</p>

            <div className='flex items-center gap-2'>
            </div>          <div className='flex items-center gap-2 mt-[58px]'>
              <button
                onClick={handleCloseModal}
                className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
              >
                <IoMdClose size={16} />
                Close
              </button>
              <button
                onClick={handleCloseModal}
                className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
              >
                <FaCheck size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {openModal === 4 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-brand-lemon-yellow px-9 pt-10 pb-[50px] rounded-lg shadow-lg w-1/3 text-brand-dark">
            <h3 className="text-3xl font-bold mb-4">CHANGE PHONE NUMBER</h3>
            <button
              onClick={handleCloseModal}
              className="absolute top-10 right-9 text-5xl hover:text-red-500"
            >
              &times;
            </button>
            <p className="mb-4">Change your Phone here.</p>

            <div className='flex items-center gap-2'>
            </div>          <div className='flex items-center gap-2 mt-[58px]'>
              <button
                onClick={handleCloseModal}
                className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
              >
                <IoMdClose size={16} />
                Close
              </button>
              <button
                onClick={handleCloseModal}
                className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
              >
                <FaCheck size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
