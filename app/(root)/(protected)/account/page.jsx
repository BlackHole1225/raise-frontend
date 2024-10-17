"use client"
import React, { useEffect } from 'react';
// import { useRouter } from "next/navigation"
import DonationChart from './donationChart';
import DonationListComponent from './donationList';
import CampaignListComponent from '@/app/(root)/other/CampaignListComponent';
// import apiClient from '@/utils/api';

const Page = ({ params }) => {
  // const router = useRouter();
  const getUserInfo = async () => {
    try {
      console.log('here');
      // const response = await apiClient.get(`/api/tokenlogin/`);

    } catch (error) {
      // notifyError('Token expired, please login again');
      // localStorage.removeItem('authToken');
      // router.push('/login');
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div>
      <DonationChart />
      <div className="xl:grid xl:grid-cols-12 gap-8 my-12">
        <div className="xl:col-span-5">
          <DonationListComponent />
        </div>
        <div className="xl:col-span-7 mt-8 xl:mt-0">
          <CampaignListComponent params={params} />
        </div>
      </div>
    </div>
  );
};

export default Page;
