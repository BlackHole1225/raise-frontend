'use client';

import React, { useState, useEffect } from 'react';
import CampaignDetailsComponent from './campaignDetailsComponent';
import axios from 'axios';
import apiClient from '@/utils/api';
import { SERVER_IP, SERVER_LOCAL_IP } from '@/utils/constants';

const Page = ({ params }) => {
  // State to store a single campaign (not an array)
  const [campaignData, setCampaignData] = useState(null);
  const [error, setError] = useState(null); // To handle errors
  const [loading, setLoading] = useState(true); // Loading state

  console.log(`API URL: ${SERVER_IP}/api/campaign/${params.slug}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignsRes = await apiClient.get(`/api/campaign/${params.slug}`);
        setCampaignData(campaignsRes.data.data); // Assuming the response has "data"
        console.log('Fetched Campaign:', campaignsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch campaign data');
      } finally {
        setLoading(false); // Whether success or failure, loading stops
      }
    };

    fetchData();
  }, [params.slug]); // Add params.slug as a dependency

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  if (!campaignData) {
    return <div>No campaign found</div>; // Handle case when no campaign data is found
  }

  return <CampaignDetailsComponent campaignData={{...campaignData.campaign, content: campaignData.formattedContent}} />;
};

export default Page;
