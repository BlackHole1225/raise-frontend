'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/button';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import DonationListComponent from '@/app/(root)/(protected)/account/donationList';
import { notifySuccess } from '@/components/notification';
import { SERVER_LOCAL_IP } from '@/utils/constants';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
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
const Page = ({ params }) => {
  const [isDelete, setIsDelete] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState(null);
  // const [update, setUpdate] = useState({});
  const [isCUModal, setIsCUModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);
  const [item, setItem] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignsRes = await axios.get(`${SERVER_LOCAL_IP}/api/campaign/${params.slug}`);
        setCampaignData(campaignsRes.data.data); // Assuming the response has "data"
        console.log('Fetched Campaign:', campaignsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setError('Failed to fetch campaign data');
      } finally {
        // setLoading(false); // Whether success or failure, loading stops
      }
    };
    fetchData();
  }, [params.slug]);
  useEffect(() => {
    console.log('item', item)
  }, [item])

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="heading-2 w-1/2 flex-grow">{campaignData?.campaign.title}</h1>
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <Button
            variant="bordered"
            radius="full"
            size="lg"
            className="font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7"
            startContent={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9688 15.5195V18.75C17.9688 18.8743 17.9194 18.9935 17.8315 19.0815C17.7435 19.1694 17.6243 19.2188 17.5 19.2188C17.3757 19.2188 17.2565 19.1694 17.1685 19.0815C17.0806 18.9935 17.0312 18.8743 17.0312 18.75V15.5195C17.0285 14.6367 16.8311 13.7652 16.453 12.9674C16.0748 12.1696 15.5254 11.465 14.8438 10.9039V15.8055C14.8431 15.9059 14.8103 16.0035 14.75 16.0839C14.6897 16.1642 14.6052 16.2231 14.509 16.2518C14.4127 16.2805 14.3097 16.2775 14.2153 16.2433C14.1209 16.2091 14.0399 16.1454 13.9844 16.0617L13.15 14.7883C13.1451 14.781 13.1407 14.7734 13.1367 14.7656C12.993 14.5136 12.7551 14.3289 12.4752 14.2523C12.1954 14.1757 11.8966 14.2133 11.6445 14.357C11.3925 14.5007 11.2078 14.7387 11.1312 15.0185C11.0546 15.2983 11.0922 15.5972 11.2359 15.8492L12.9688 18.493C13.0269 18.5964 13.0436 18.718 13.0156 18.8333C12.9876 18.9486 12.9169 19.049 12.8178 19.1142C12.7187 19.1794 12.5985 19.2046 12.4815 19.1847C12.3646 19.1649 12.2595 19.1013 12.1875 19.007L10.4484 16.3508C10.4438 16.343 10.4391 16.3359 10.4352 16.3281C10.192 15.8696 10.1336 15.3354 10.2719 14.8352C10.4102 14.335 10.7347 13.9067 11.1788 13.6382C11.6229 13.3697 12.153 13.2814 12.6602 13.3914C13.1674 13.5014 13.6132 13.8013 13.9062 14.2297V5C13.9062 4.95856 13.8898 4.91882 13.8605 4.88951C13.8312 4.86021 13.7914 4.84375 13.75 4.84375H12.5C12.3757 4.84375 12.2565 4.79436 12.1685 4.70646C12.0806 4.61855 12.0312 4.49932 12.0312 4.375C12.0312 4.25068 12.0806 4.13145 12.1685 4.04354C12.2565 3.95564 12.3757 3.90625 12.5 3.90625H13.75C14.0401 3.90625 14.3183 4.02148 14.5234 4.2266C14.7285 4.43172 14.8438 4.70992 14.8438 5V9.74141C15.8011 10.3718 16.5875 11.2293 17.1327 12.2376C17.678 13.2458 17.9652 14.3733 17.9688 15.5195ZM6.71875 4.375C6.71875 4.25068 6.66936 4.13145 6.58146 4.04354C6.49355 3.95564 6.37432 3.90625 6.25 3.90625H5C4.70992 3.90625 4.43172 4.02148 4.2266 4.2266C4.02148 4.43172 3.90625 4.70992 3.90625 5V15.625C3.90625 15.7493 3.95564 15.8685 4.04354 15.9565C4.13145 16.0444 4.25068 16.0938 4.375 16.0938C4.49932 16.0938 4.61855 16.0444 4.70646 15.9565C4.79436 15.8685 4.84375 15.7493 4.84375 15.625V5C4.84375 4.95856 4.86021 4.91882 4.88951 4.88951C4.91882 4.86021 4.95856 4.84375 5 4.84375H6.25C6.37432 4.84375 6.49355 4.79436 6.58146 4.70646C6.66936 4.61855 6.71875 4.49932 6.71875 4.375ZM12.2063 7.79375C12.1184 7.70597 11.9992 7.65666 11.875 7.65666C11.7508 7.65666 11.6316 7.70597 11.5437 7.79375L9.84375 9.49297V1.25C9.84375 1.12568 9.79436 1.00645 9.70646 0.918544C9.61855 0.830636 9.49932 0.78125 9.375 0.78125C9.25068 0.78125 9.13145 0.830636 9.04354 0.918544C8.95564 1.00645 8.90625 1.12568 8.90625 1.25V9.49297L7.20625 7.79375C7.11739 7.71095 6.99986 7.66587 6.87842 7.66802C6.75699 7.67016 6.64112 7.71935 6.55524 7.80524C6.46935 7.89112 6.42016 8.00699 6.41802 8.12842C6.41587 8.24986 6.46095 8.36739 6.54375 8.45625L9.04375 10.9563C9.13164 11.044 9.25078 11.0933 9.375 11.0933C9.49922 11.0933 9.61836 11.044 9.70625 10.9563L12.2063 8.45625C12.294 8.36836 12.3433 8.24922 12.3433 8.125C12.3433 8.00078 12.294 7.88164 12.2063 7.79375Z"
                  fill="black"
                />
              </svg>
            }
          >
            Withdraw Funds
          </Button>
          <Button
            variant="bordered"
            radius="full"
            size="lg"
            onClick={() => router.push(`/account/edit-a-campaign/${campaignData.campaign._id}`)}
            className="font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7"
            startContent={
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_371_2517)">
                  <path
                    d="M8.22731 0.588099C8.45234 0.363134 8.75751 0.236755 9.07571 0.236755C9.39391 0.236755 9.69908 0.363134 9.92411 0.588099L11.4091 2.0731C11.5206 2.18454 11.609 2.31684 11.6694 2.46247C11.7297 2.60809 11.7608 2.76417 11.7608 2.9218C11.7608 3.07943 11.7297 3.23551 11.6694 3.38113C11.609 3.52675 11.5206 3.65906 11.4091 3.7705L4.27331 10.9063L0.445312 11.5519L1.09151 7.7239L8.22731 0.588099ZM8.08991 2.4223L9.57491 3.9073L10.5607 2.9215L9.07571 1.4371L8.08991 2.4223ZM8.72591 4.7563L7.24151 3.2713L2.21111 8.3017L1.90931 10.0879L3.69551 9.7867L8.72591 4.7563Z"
                    fill="#3D4630"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_371_2517">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
          >
            Edit
          </Button>
          <Button
            variant="bordered"
            radius="full"
            size="lg"
            className="font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7"
            startContent={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.99081 4.10749C5.10785 4.22468 5.17359 4.38353 5.17359 4.54916C5.17359 4.71479 5.10785 4.87364 4.99081 4.99083C4.33304 5.64858 3.81126 6.42945 3.45528 7.28885C3.09929 8.14826 2.91607 9.06936 2.91607 9.99958C2.91607 10.9298 3.09929 11.8509 3.45528 12.7103C3.81126 13.5697 4.33304 14.3506 4.99081 15.0083C5.1046 15.1263 5.16752 15.2842 5.16602 15.448C5.16452 15.6119 5.09872 15.7686 4.98278 15.8845C4.86685 16.0003 4.71006 16.0659 4.54618 16.0673C4.38231 16.0686 4.22446 16.0056 4.10664 15.8917C0.852474 12.6375 0.852474 7.36166 4.10664 4.10749C4.22383 3.99045 4.38268 3.92471 4.54831 3.92471C4.71393 3.92471 4.87362 3.99045 4.99081 4.10749ZM15.8916 4.10749C19.1458 7.36166 19.1458 12.6375 15.8916 15.8925C15.7732 16.0029 15.6165 16.063 15.4545 16.0601C15.2926 16.0573 15.1381 15.9917 15.0236 15.8772C14.9091 15.7627 14.8435 15.6082 14.8407 15.4463C14.8378 15.2843 14.8979 15.1276 15.0083 15.0092C15.6662 14.3514 16.1881 13.5705 16.5441 12.711C16.9002 11.8515 17.0835 10.9303 17.0835 9.99999C17.0835 9.06968 16.9002 8.14848 16.5441 7.289C16.1881 6.42952 15.6662 5.64859 15.0083 4.99083C14.9469 4.93361 14.8976 4.86461 14.8635 4.78794C14.8293 4.71128 14.811 4.62851 14.8095 4.5446C14.808 4.46068 14.8234 4.37732 14.8549 4.2995C14.8863 4.22167 14.9331 4.15098 14.9924 4.09163C15.0518 4.03228 15.1225 3.98549 15.2003 3.95406C15.2781 3.92262 15.3615 3.90719 15.4454 3.90867C15.5293 3.91015 15.6121 3.92852 15.6888 3.96268C15.7654 3.99684 15.8344 4.04609 15.8916 4.10749ZM7.34747 6.46416C7.46452 6.58135 7.53026 6.7402 7.53026 6.90583C7.53026 7.07145 7.46452 7.23031 7.34747 7.34749C6.99912 7.69573 6.72279 8.10918 6.53426 8.56423C6.34573 9.01928 6.24869 9.50702 6.24869 9.99958C6.24869 10.4921 6.34573 10.9799 6.53426 11.4349C6.72279 11.89 6.99912 12.3034 7.34747 12.6517C7.45787 12.7701 7.51798 12.9268 7.51512 13.0888C7.51226 13.2507 7.44667 13.4052 7.33216 13.5197C7.21765 13.6342 7.06316 13.6998 6.90124 13.7026C6.73933 13.7055 6.58262 13.6454 6.46414 13.535C5.52653 12.5973 4.99979 11.3256 4.99979 9.99958C4.99979 8.67355 5.52653 7.40183 6.46414 6.46416C6.58133 6.34712 6.74018 6.28138 6.90581 6.28138C7.07143 6.28138 7.23029 6.34712 7.34747 6.46416ZM13.535 6.46416C14.4726 7.40183 14.9993 8.67355 14.9993 9.99958C14.9993 11.3256 14.4726 12.5973 13.535 13.535C13.4773 13.5947 13.4084 13.6424 13.3322 13.6752C13.2559 13.7079 13.1739 13.7252 13.0909 13.726C13.008 13.7267 12.9256 13.711 12.8488 13.6796C12.772 13.6482 12.7022 13.6018 12.6435 13.5432C12.5848 13.4845 12.5383 13.4147 12.5069 13.3379C12.4754 13.2612 12.4596 13.1789 12.4602 13.0959C12.4609 13.0129 12.4781 12.9309 12.5108 12.8546C12.5436 12.7783 12.5911 12.7093 12.6508 12.6517C12.999 12.3034 13.2753 11.89 13.4637 11.4351C13.6522 10.9801 13.7492 10.4925 13.7492 9.99999C13.7492 9.50753 13.6522 9.01989 13.4637 8.56492C13.2753 8.10995 12.999 7.69655 12.6508 7.34833C12.5404 7.22985 12.4803 7.07314 12.4832 6.91122C12.486 6.74931 12.5516 6.59482 12.6661 6.48031C12.7806 6.3658 12.9351 6.3002 13.097 6.29735C13.259 6.29449 13.4157 6.35459 13.5341 6.46499L13.535 6.46416ZM9.99914 8.74999C10.3307 8.74999 10.6486 8.88169 10.883 9.11611C11.1174 9.35053 11.2491 9.66847 11.2491 9.99999C11.2491 10.3315 11.1174 10.6495 10.883 10.8839C10.6486 11.1183 10.3307 11.25 9.99914 11.25C9.66762 11.25 9.34968 11.1183 9.11526 10.8839C8.88084 10.6495 8.74914 10.3315 8.74914 9.99999C8.74914 9.66847 8.88084 9.35053 9.11526 9.11611C9.34968 8.88169 9.66762 8.74999 9.99914 8.74999Z"
                  fill="#25282B"
                />
              </svg>
            }
          >
            Live Page
          </Button>
        </div>
      </div>
      <div className="xl:grid xl:grid-cols-12 gap-8 my-12 ">
        <div className="col-span-7 ">
          <img
            src={campaignData?.campaign ? `${campaignData?.campaign.file}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
            alt="Campaign"
            className="w-full object-cover h-[484px]"
          />
        </div>
        <div className="col-span-5 h-full xl:h-[484px] mt-8 xl:mt-0">
          <DonationListComponent compFor="campaign" />
        </div>
      </div>
      <div className='w-full flex flex-col gap-2 bg-brand-weak-green px-8 py-11  mb-8'>
        <div className='flex flex-col md:flex-row gap-2 justify-between w-full mb-10'>
          <h1 className="text-2xl md:text-[32px] font-bold w-1/2 flex-grow">UPDATES</h1>
          <Button
            variant="bordered"
            radius="full"
            size="lg"
            onClick={() => {
              setIsCUModal(true)
              setIsUpdate(false)
            }}
            className="font-medium text-brand-olive-green border-brand-olive-green xl:y-10 xl:px-6"
          >
            Add an Update
          </Button>
        </div>
        {campaignData?.formattedContent?.map((d, index) => (
          index > 0 && <UpdateItem key={index} isUpdate={isUpdate} setIsUpdate={setIsUpdate} params={params} item={d} setItem={setItem} isDelete={isDelete} isCUModal={isCUModal} setIsCUModal={setIsCUModal} setUpdates={setCampaignData} setIsDelete={setIsDelete} />
        ))}
      </div>
      <DeleteUpdate params={params} setUpdates={setCampaignData} isDelete={isDelete} setIsDelete={setIsDelete} item={item} />
      <AddNewUpdate isUpdate={isUpdate} setIsUpdate={setIsUpdate} params={params} setItem={setItem} item={item} setUpdates={setCampaignData} isCUModal={isCUModal} setIsCUModal={setIsCUModal} />

    </div>
  );
};
const UpdateItem = ({ item, setIsDelete, setIsUpdate, setIsCUModal, setItem }) => {
  return (<div className='border-b border-brand-dark w-full pb-1'>
    <div className='flex flex-col md:flex-row gap-2 w-full justify-between '>
      <p className="text-2xl font-bold w-full md:w-1/2 flex-grow text-brand-dark">{item?.formattedDate}</p>
      <div className='flex gap-2'>
        <Button
          variant="bordered"
          radius="full"
          size="sm"
          onClick={() => {
            setIsCUModal(true)
            setIsUpdate(true)
            setItem(item)
          }}
          startContent={
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_371_2517)">
                <path
                  d="M8.22731 0.588099C8.45234 0.363134 8.75751 0.236755 9.07571 0.236755C9.39391 0.236755 9.69908 0.363134 9.92411 0.588099L11.4091 2.0731C11.5206 2.18454 11.609 2.31684 11.6694 2.46247C11.7297 2.60809 11.7608 2.76417 11.7608 2.9218C11.7608 3.07943 11.7297 3.23551 11.6694 3.38113C11.609 3.52675 11.5206 3.65906 11.4091 3.7705L4.27331 10.9063L0.445312 11.5519L1.09151 7.7239L8.22731 0.588099ZM8.08991 2.4223L9.57491 3.9073L10.5607 2.9215L9.07571 1.4371L8.08991 2.4223ZM8.72591 4.7563L7.24151 3.2713L2.21111 8.3017L1.90931 10.0879L3.69551 9.7867L8.72591 4.7563Z"
                  fill="#3D4630"
                />
              </g>
              <defs>
                <clipPath id="clip0_371_2517">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
          className="font-medium text-brand-olive-green border-brand-olive-green xl:h-8 xl:px-5"
        >
          Edit
        </Button>
        <Button
          variant="bordered"
          radius="full"
          size="sm"
          onClick={() => { setIsDelete(true); setItem(item) }}
          startContent={
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.75 0.5H7.25V2H10V3H8.9855L8.7355 11.5H1.2645L1.0145 3H0V2H2.75V0.5ZM3.75 2H6.25V1.5H3.75V2ZM2.015 3L2.2355 10.5H7.7645L7.985 3H2.015ZM5.5 4V9.5H4.5V4H5.5Z" fill="#3D4630" />
            </svg>
          }
          className="font-medium text-brand-olive-green border-brand-olive-green xl:h-8 xl:px-5"
        >
          Delete
        </Button>
      </div>

    </div>
    <p className='mt-2 text-6 font-semibold text-brand-olive-green' dangerouslySetInnerHTML={{ __html: item.text }}>
    </p>

  </div>)
}
const DeleteUpdate = ({ isDelete, setIsDelete, item, setUpdates, params }) => {
  const deleteAUpdate = async () => {
    await axios.delete(`${SERVER_LOCAL_IP}/api/campaign/update/${params.slug}/${item._id}`);
    notifySuccess(`Update was deleted successfully.`);
    setIsDelete(false);
    setUpdates((d) => ({ ...d, formattedContent: [...d.formattedContent.filter((e) => (e._id !== item._id))] }))
  }
  return (
    <Modal
      isOpen={isDelete}
      onOpenChange={() => setIsDelete(false)}
      size="4xl"
      classNames={{
        base: 'rounded-none bg-brand-lemon-yellow py-4 px-2',
        closeButton: 'top-2.5 right-2.5 hover:bg-brand-transparent'
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 heading-2 text-brand-olive-green">
              Are you sure you want to delete this Fundraiser?
            </ModalHeader>
            <ModalBody>
              <p className='mt-2 text-6' dangerouslySetInnerHTML={{ __html: item.text }}>
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="bordered"
                radius="full"
                size="sm"
                startContent={<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.55316 1.14895L3.70211 4M3.70211 4L0.851055 6.85105M3.70211 4L0.851055 1.14895M3.70211 4L6.55316 6.85105" stroke="#3D4630" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                }
                onClick={() => setIsDelete(false)}
                className="font-medium text-brand-olive-green border-brand-olive-green xl:y-8 xl:px-75basis-[10%]"
              >
                Cancel
              </Button>
              <Button
                variant="bordered"
                radius="full"
                size="sm"
                onClick={() => deleteAUpdate()}
                startContent={
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.75 0.5H7.25V2H10V3H8.9855L8.7355 11.5H1.2645L1.0145 3H0V2H2.75V0.5ZM3.75 2H6.25V1.5H3.75V2ZM2.015 3L2.2355 10.5H7.7645L7.985 3H2.015ZM5.5 4V9.5H4.5V4H5.5Z" fill="#3D4630" />
                  </svg>
                }
                className="font-medium text-brand-olive-green border-brand-olive-green xl:y-8 xl:px-75basis-[10%]"
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
const AddNewUpdate = ({ isUpdate, isCUModal, setIsCUModal, setUpdates, params, item }) => {
  const [content, setContent] = useState('');
  const addUpdate = async () => {
    const result = await axios.post(`${SERVER_LOCAL_IP}/api/campaign/update`, {
      text: content,
      campaignId: params.slug
    });
    notifySuccess(`New update was created successfully.`);
    setUpdates((e) => ({ ...e, formattedContent: [...e.formattedContent, result.data.newContent] }))
    setIsCUModal(false);
  }
  const editUpdate = async () => {
    try {
      // Make an API request to update the campaign's content
      const result = await axios.put(`${SERVER_LOCAL_IP}/api/campaign/update`, {
        text: content,
        campaignId: params.slug,   // Assuming `params.slug` is the campaign ID
        updateId: item._id         // Assuming `item._id` is the update ID
      });

      // Notify the user of success
      notifySuccess(`Update was updated successfully.`);

      // Update the updates state to reflect the new content
      setUpdates((e) => ({
        ...e,
        formattedContent: [
          ...e.formattedContent.filter(f => f._id !== item._id),  // Remove the old update
          result.data.newContent  // Add the updated content
        ]
      }));

      // Close the modal after successful update
      setIsCUModal(false);
    } catch (error) {
      console.error("Error updating the update:", error);
      // Handle errors (optional: add a user-friendly notification)
    }
  };

  useEffect(() => {
    setContent(isUpdate ? item.text : '')
    console.log(item)

  }, [isUpdate, item])
  return (
    <Modal
      isOpen={isCUModal}
      onOpenChange={() => { setIsCUModal(false) }}
      size="4xl"
      classNames={{
        base: 'rounded-none bg-brand-lemon-yellow py-4 px-2',
        closeButton: 'top-2.5 right-2.5 hover:bg-brand-transparent'
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 heading-2 text-brand-olive-green">
              Add an update
            </ModalHeader>
            <ModalBody>
              {/* <RichTextEditor
                value="{description}"
                placeholder="Hello Everyone, We are raising funds for..........."
              /> */}
              <div className="quill-container rounded-lg border border-brand-olive-green mt-3">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={(e) => setContent(e)}
                  modules={modules}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="bordered"
                radius="full"
                size="sm"
                startContent={<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.55316 1.14895L3.70211 4M3.70211 4L0.851055 6.85105M3.70211 4L0.851055 1.14895M3.70211 4L6.55316 6.85105" stroke="#3D4630" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                }
                onClick={() => setIsCUModal(false)}
                className="font-medium text-brand-olive-green border-brand-olive-green xl:y-8 xl:px-75basis-[10%]"
              >
                Cancel
              </Button>
              <Button
                variant="bordered"
                radius="full"
                size="sm"
                onClick={() => { isUpdate ? editUpdate() : addUpdate() }}
                startContent={
                  <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1543 4.75L4.6543 8.25L11.6543 0.75" stroke="#3D4630" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                }
                className="font-medium text-brand-olive-green border-brand-olive-green xl:y-8 xl:px-75basis-[10%]"
              >
                {isUpdate ? 'Update' : 'Post'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Page;