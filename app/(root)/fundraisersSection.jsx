'use client';

import React from 'react';
import CampaignCard from '../../components/ui/campainCard';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import apiClient from '../../utils/api';
import { SERVER_IP, SERVER_LOCAL_IP } from '../../utils/constants';

const FundraisersSection = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/api/campaign`);
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
    <section className="min-h-screen bg-brand-eucalyptus p-6 md:px-14 md:pt-32 md:pb-36 flex flex-col justify-center">
      <div className="w-full flex flex-col md:flex-row justify-between items-end">
        <h1 className="text-6xl xl:text-8xl text-brand-dark main-heading">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1 grid-flow-row gap-6 overflow-x-auto flex-nowrap mt-11">
        {campaigns.length > 0 ? (
          campaigns.slice(0, 4).map((campaign, i) => (
            <Link href={`/campaigns/${campaign._id}`} key={campaign._id}>
              <CampaignCard
                imgUrl={campaign?.file ? `${SERVER_LOCAL_IP}/api/file/download/${campaign?.file}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
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
