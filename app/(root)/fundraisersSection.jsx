'use client';

import React from 'react';
import CampaignCard from '../../components/ui/campainCard';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_IP } from '../../utils/constants';

const FundraisersSection = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_IP}/api/campaign`);
        setCampaigns(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  function getValueBasedOnIndex(i) {
    switch (i % 4) {
      case 0:
        return 'v1';
      case 1:
        return 'v2';
      case 2:
        return 'v5';
      case 3:
        return 'v4';
      default:
        return 'v1';
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data. Please try again later.</div>;
  }
  return (
    <section className="min-h-screen bg-brand-eucalyptus px-14 py-20 flex flex-col justify-center">
      <div className="w-full flex justify-between items-end mb-8">
        <h1 className=" text-brand-olive-green main-heading">
          Discover fundraisers
          <br /> inspired by what you care
        </h1>
        <Link href="/campaigns">
          <Button
            variant="bordered"
            radius="full"
            size="lg"
            className="mb-4 font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7"
          >
            Browse All Campaigns
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-4 grid-rows-1 grid-flow-row gap-6 overflow-x-auto flex-nowrap">
        {campaigns.length > 0 ? (
          campaigns.map((campaign, i) => (
            <Link href={`/campaigns/${campaign._id}`} key={campaign._id}>
              <CampaignCard
                // imgUrl={campaign.file}
                imgUrl="./images/tiger.png"
                title={campaign.title}
                amount={campaign.totalAmount}
                type={getValueBasedOnIndex(i)}
              />
            </Link>
          ))
        ) : (
          <div>No campaigns available.</div>
        )}
      </div>
    </section>
  );
};

export default FundraisersSection;
