'use client';
import React, { useState } from 'react';
import FeedAdvertising from '../feedAdvertising';
import FeedGetStart from '../feedGetStart';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from "@nextui-org/select";
import DragDropUpload from '@/components/ui/dragDropUpload';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
// Dynamically import ReactQuill for client-side rendering only
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Page = () => {
  const [value, setValue] = useState('<p>Content</p>');
  const modules = {
    toolbar: {
      container: [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['image'],
        ['blockquote'],
        ['calendar']
      ],
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-8 my-12">
        <div className="col-span-7">
          <div className='px-8 py-11 bg-brand-lemon-yellow text-brand-olive-green'>
            <h3 className='text-3xl font-bold'>CREATE A POST</h3>
            <p className='mt-4 font-bold text-lg'>
              Share your thoughts, ideas, or project updates with the Raise community. Engage with others and contribute to meaningful discussions that drive the future of crowdfunding on Web3.
            </p>
            <div className='mt-8'>
              <div className='flex gap-3'>
                <div className='w-1/2'>
                  <Input
                    size="lg"
                    variant="bordered"
                    label="Title"
                    radius="sm"
                    classNames={{
                      inputWrapper:
                        'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark h-full',
                      input: 'py-1',
                      label: 'font-bold text-xl'
                    }}
                  />
                  <Select
                    placeholder="Select a Category"
                    style={{ backgroundColor: 'transparent' }}
                    className="border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark font-bold text-xl rounded-lg mt-4 py-1"
                  >
                    <SelectItem>
                      Lost the previous email account.
                    </SelectItem>
                  </Select>
                  <Input
                    size="lg"
                    variant="bordered"
                    label="Associated a Campaign"
                    radius="sm"
                    classNames={{
                      inputWrapper:
                        'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark mt-4 h-full',
                      input: 'py-1',
                      label: 'font-bold text-xl'
                    }}
                  />
                </div>
                <div className='w-1/2'>
                  <DragDropUpload
                    acceptedFormats={{
                      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
                    }}
                    isMultiple={false}
                    label="Image"
                  />
                </div>
              </div>
              <div className="quill-container rounded-lg border border-brand-olive-green mt-3">
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  modules={modules}
                />
              </div>
              <div className='flex justify-end items-center gap-2 mt-8'>
                <button
                  className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
                >
                  <IoMdClose size={16} />
                  Close
                </button>
                <button className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
                >
                  <FaCheck size={16} />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-6">
          <FeedAdvertising />
          <FeedGetStart />
        </div>
      </div>
    </div>
  );
};

export default Page;
