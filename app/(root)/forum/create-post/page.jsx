'use client';
import React, { useState, useEffect } from 'react';
import FeedAdvertising from '@/app/(root)/forum/feedAdvertising';
import FeedGetStart from '@/app/(root)/forum/feedGetStart';
import { Input } from '@nextui-org/input';
import DragDropUpload from '@/components/ui/dragDropUpload';
import dynamic from 'next/dynamic';
import { notifySuccess } from '@/components/notification';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { SERVER_LOCAL_IP, SERVER_IP } from '@/utils/constants';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';

import axios from "axios";
// Dynamically import ReactQuill for client-side rendering only
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Page = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const [categories, setCategories] = useState([]);
  const [campaigns, setCampains] = useState([
    { _id: 0, name: 'Popular Donations' },
  ]);
  const [category, setCategory] = useState();

  // const [donation, setDonation] = useState('');
  const [campaign, setCampagin] = useState('');
  const [content, setContent] = useState('');
  // const [image, setImage] = useState();
  const imageUpload = async () => {
    const formData = new FormData();
    Array.from(file).forEach(f => {
      formData.append('files', f);
    });

    try {
      const response = await axios.post(`${SERVER_LOCAL_IP}/api/file/upload`, formData, {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, campaignRes] = await Promise.all([
          axios.get(`${SERVER_IP}/api/category`),
          axios.get(`${SERVER_LOCAL_IP}/api/campaign/`),
          // axios.get(`${SERVER_IP}/api/campaign/category`),
        ]);
        // axios.get(`${SERVER_IP}/api/campaign`)

        setCategories(categoriesRes.data.category || [{ _id: 0, name: 'Popular Donations' },
        { _id: 1, name: 'Popular Donations' },
        { _id: 2, name: 'Popular Donations' },]);
        // console.log(campaignRes.data);
        setCampains(campaignRes.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const createPost = async () => {
    console.log(title, category, campaign, content);
    const file = await imageUpload();
    if (title && category && campaign && content) {
      try {
        const response = await axios.post(`${SERVER_LOCAL_IP}/api/post/create`, {
          title,
          categoryId: category,
          campaignId: campaign,
          content,
          file
        }, {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("authToken")}`, // JWT token for auth
          },
        });

        notifySuccess("Post created successfully");
        // setTitle('');
        // setDonation('');
        // setCampagin('');
        // setContent('');
        router.push('/forum');

      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('The values was not input correctly');
      return;
    }
  }

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
                    value={title}
                    radius="sm"
                    onChange={(e) => setTitle(e.target.value)}
                    classNames={{
                      inputWrapper:
                        'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark h-full',
                      input: 'py-1',
                      label: 'font-bold text-xl'
                    }}
                  />
                  <Autocomplete
                    label="Select a Category"
                    radius="sm"
                    className='mt-4 border-black  border rounded-md '
                    onSelectionChange={(key) => {
                      setCategory(key);
                    }}>
                    {categories?.map((item) => (
                      <AutocompleteItem key={item._id} value={item.name}>
                        {item.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    label="Associated a Campaign"
                    value={campaign}
                    onSelectionChange={(key) => {
                      setCampagin(key);
                    }}
                    radius="sm"
                    className='mt-4 border-black  border rounded-md '
                  >
                    {campaigns?.map((item) => (
                      <AutocompleteItem key={item._id} value={item.title}>
                        {item.title}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
                <div className='w-1/2'>
                  <DragDropUpload
                    acceptedFormats={{
                      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
                    }}
                    onChange={(e) => setFile(e)}
                    isMultiple={true}
                    label="Image"
                  />
                </div>
              </div>
              <div className="quill-container rounded-lg border border-brand-olive-green mt-3">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={(e) => setContent(e)}
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
                <button onClick={() => createPost()} className="w-fit px-[18px] py-[10px] text-sm font-bold border border-brand-olive-green rounded-full text-brand-olive-green flex items-center gap-1 hover:text-red-500 hover:border-red-500"
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
