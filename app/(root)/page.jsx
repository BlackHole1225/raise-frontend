'use client';

import React from 'react';
import HeroSection from './hero';
import FundraisersSection from './fundraisersSection';
import FAQComponent from './faq';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_IP } from '../../utils/constants';

const Page = () => {
  const [campaigns, setCampaigns] = useState([]);
  const fetchData = async () => {
    console.log(`>>> axios get ${SERVER_IP}/api/campaign`)
    try {
      const campaignsRes = await axios.get(`${SERVER_IP}/api/campaign`);
      // const campaignsRes = await Promise(
      //   axios.get(`${}/api/campaign`),
      // );
      setCampaigns(campaignsRes.data.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  console.log(campaigns);

  // const createPlatform = async () => {
  //   try {
  //     const response = await axios.post(`${SERVER_IP}/api/platform/create`);

  //     console.log('Platform created successfully', response);
  //   } catch (error) {
  //     console.log('Error creating platform:', error);
  //   }
  // };
  // const setPlatformFee = async () => {
  //   try {
  //     const response = await axios.post(`${SERVER_IP}/api/platform/setFee`, {
  //       feeToBeChanged: 0.02,
  //     });

  //     console.log('Platform fee set successfully', response);
  //   } catch (error) {
  //     console.log('Error platform fee set: ', error);
  //   }
  // };

  useEffect(() => {
    fetchData();
    // setPlatformFee()
  }, []);

  return (
    <>
      <HeroSection
        imgUrl="/images/home-hero-banner.jpeg"
        title={
          <h1 className="text-brand-ivory main-heading">
            localhost <br /> Can Make a Change
          </h1>
        }
        action={
          <>
            <Link href="/campaigns/">
              <Button
                variant="bordered"
                radius="full"
                size="lg"
                className="font-medium text-brand-ivory border-brand-ivory xl:py-6 xl:px-7"
              >
                Browse Campaigns
              </Button>
            </Link>
            <Link href="/account/create-a-campaign">
              <Button
                variant="bordered"
                radius="full"
                size="lg"
                className="font-medium text-brand-ivory border-brand-ivory xl:py-6 xl:px-7"
              >
                Start a Campaign
              </Button>
            </Link>
          </>
        }
      />
      <FundraisersSection />
      <div className="bg-amber-50">
        <header className="">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 p-10">
              <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase text-brand-dark tracking-wider mt-8">
                Raise allows you to create trusted campaigns easily
              </h1>
            </div>
            <div className="w-full md:w-2/3">
              <div className="relative min-h-[559px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/12a1b07640395ca10913b819c0dfad898ea7f734c2cc73843f029c28f01757fb"
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative flex items-center justify-center h-full">
                  <video
                    src="https://videos.pexels.com/video-files/6646687/6646687-hd_1920_1080_24fps.mp4"
                    autoPlay
                    controls={false}
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section className="flex flex-wrap">
            <div className="w-full md:w-2/3">
              <div className="bg-yellow-200 p-8 md:p-16">
                <div className="max-w-3xl mx-auto">
                  <div className="flex flex-wrap justify-center text-center">
                    {campaigns.map((item, index) => (
                      <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-4">
                        <img
                          loading="lazy"
                          src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${item.file}`}
                          alt={item.title}
                          className="w-32 h-32 mx-auto rounded-3xl object-contain"
                        />
                        <h3 className="mt-4 text-xl font-bold tracking-wide text-stone-700">
                          {item.title}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-stone-700 text-amber-50 p-8 md:p-16 flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-6 font-heading">
                    Have any Doubts?
                  </h2>
                  <button className="px-8 py-4 text-xl font-medium border border-amber-50 rounded-full hover:bg-amber-50 hover:text-stone-700 transition-colors">
                    Check FAQs
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <FAQComponent />
    </>
  );
};

export default Page;
