'use client';

import React from 'react';
import Link from 'next/link';
import HeroSection from './hero';
import FundraisersSection from './fundraisersSection';
import FAQComponent from './faq';
import { Button } from '@nextui-org/button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_IP } from '../../utils/constants';
import { TbWorld, TbCurrencyDollarOff } from "react-icons/tb";
import { BsFillPeopleFill } from "react-icons/bs";
import { SlEarphonesAlt } from "react-icons/sl";

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

  const values = [
    {
      icon: <TbWorld className="text-7xl xl:text-9xl rounded-2xl xl:rounded-[32px] p-3 xl:p-6 bg-brand-olive-green text-amber-50" />,
      title: 'Based on Web3',
    },
    {
      icon: <TbCurrencyDollarOff className="text-7xl xl:text-9xl rounded-2xl xl:rounded-[32px] p-3 xl:p-6 bg-brand-olive-green text-amber-50" />,
      title: 'No Fee for Campaigns',
    },
    {
      icon: <BsFillPeopleFill className="text-7xl xl:text-9xl rounded-2xl xl:rounded-[32px] p-3 xl:p-6 bg-brand-olive-green text-amber-50" />,
      title: 'Worldwide Community',
    },
    {
      icon: <SlEarphonesAlt className="text-7xl xl:text-9xl rounded-2xl xl:rounded-[32px] p-3 xl:p-6 bg-brand-olive-green text-amber-50" />,
      title: 'Active Support',
    }
  ];


  return (
    <>
      <HeroSection
        imgUrl="/images/home-hero-banner.jpeg"
        title={
          <h1 className="text-5xl md:text-7xl xl:text-9xl text-brand-ivory main-heading">
            TOGETHER WE <br /> CAN MAKE A CHANGE
          </h1>
        }
        action={
          <>
            <Link href="/campaigns/">
              <Button
                variant="bordered"
                radius="full"
                size="lg"
                className="font-medium text-brand-ivory border-brand-ivory py-1 md:py-6 md:px-7"
              >
                Browse Campaigns
              </Button>
            </Link>
            <Link href="/account/create-a-campaign">
              <Button
                variant="bordered"
                radius="full"
                size="lg"
                className="font-medium text-brand-ivory border-brand-ivory md:py-6 md:px-7"
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
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold uppercase text-brand-dark tracking-wider mt-4 lg:mt-8">
                Raise allows you to create trusted campaigns easily
              </h1>
            </div>
            <div className="w-full md:w-2/3">
              <div className="relative">
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/12a1b07640395ca10913b819c0dfad898ea7f734c2cc73843f029c28f01757fb"
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover"
                /> */}
                <div className="relative flex items-center justify-center h-full">
                  <video
                    src="/1.mp4"
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
              <div className="bg-brand-lemon-yellow p-8 xl:p-32 2xl:p-44">
                <div className="max-w-3xl mx-auto">
                  <div className="flex flex-wrap gap-[60px] justify-center text-center">
                    {values.map((value, index) => (
                      <div key={index} className="flex flex-col items-center text-center max-w-32">
                        {value.icon}
                        <h3 className="text-xl font-bold tracking-wide text-brand-olive-green mt-4">{value.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-brand-olive-green text-amber-50 p-8 md:p-16 flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-5xl xl:text-6xl font-bold uppercase tracking-wider mb-6 font-heading">
                    ENGAGE WITH <br /> RAISE COMMUNTITY
                  </h2>
                  <Link href="/forum" className="px-8 py-4 text-xl font-medium border border-amber-50 rounded-full hover:bg-amber-50 hover:text-stone-700 transition-colors">
                    Go to Forum
                  </Link>
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
