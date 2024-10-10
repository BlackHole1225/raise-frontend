'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SERVER_IP, SERVER_LOCAL_IP } from '@/utils/constants';
const CampaignListComponent = ({params}) => {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [filters, setFilters] = useState({
    category: new Set([]),
    location: new Set([]),
    closeToGoal: new Set([])
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 16;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(">>> server IP = ", SERVER_IP)
        const [categoriesRes, locationsRes, campaignsRes] = await Promise.all([
          axios.get(`${SERVER_IP}/api/category`),
          axios.get(`${SERVER_IP}/api/location`),
          axios.get(`${SERVER_LOCAL_IP}/api/campaign`)
        ]);

        setCategories(categoriesRes.data.category);
        setLocations(locationsRes.data.country);
        setCampaigns(campaignsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
        return 'v3';
      case 3:
        return 'v4';
    }
  }

  // Filter and search campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesCategory =
        filters.category.size === 0 || filters.category.has(campaign.categoryId);
      const matchesLocation =
        filters.location.size === 0 || filters.location.has(campaign.countryId);
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesLocation && matchesSearch;
    });
  }, [filters, searchTerm, campaigns]);

  // Sort campaigns by how close they are to their goal
  const sortedCampaigns = useMemo(() => {
    return [...filteredCampaigns].sort((a, b) => {
      const aProgress = a.totalAmount / a.amount;
      const bProgress = b.totalAmount / b.amount;
      return bProgress - aProgress;
    });
  }, [filteredCampaigns]);

  // Paginate campaigns
  const paginatedCampaigns = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCampaigns.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCampaigns, currentPage]);

  const totalPages = Math.ceil(sortedCampaigns.length / itemsPerPage);

  const handleFilterChange = (filterType, selectedKeys) => {
    setFilters((prev) => ({ ...prev, [filterType]: new Set(selectedKeys) }));
  };

  console.log('>>> categories : ', categories);
  console.log('>>> locations : ', locations);
  console.log('>>> campaigns : ', campaigns);
  return (
    <main className="bg-stone-300 max-w-[771px] p-8 pb-28">
      <header className="flex justify-between items-center font-bold">
        <h1 className="text-3xl tracking-widest uppercase text-zinc-800">Your Campaigns</h1>
        <Link
          className="px-6 py-3.5 text-base text-amber-50 bg-stone-700 rounded-full"
          href="/account/create-a-campaign"
        >
          Create a Campaign
        </Link>
      </header>

      <FilterSection />

      <section className="mt-10">
        {filteredCampaigns?.map((d) => (
          <>
            <CampaignItem
              title={d.title}
              params={params}
              id={d._id}
              amountRaised={d.totalAmount}
              progressPercentage={d.amount / d.totalAmount * 100}
              imageUrl={d?.file ? ` ${SERVER_LOCAL_IP}/api/file/download/${d?.file}` : `https://cdn.builder.io/api/v1/image/assets/TEMP/793c80c23e08cf30921f97c1e260306f28c41ce2839846dc1ecfd8f2bded4309`}
            />
            <hr className="border-stone-700 my-4" />
          </>
        ))}


      </section>
    </main>
  );
};

const FilterSection = () => (
  <section className="flex flex-wrap gap-2 mt-7 text-base font-bold text-stone-700">
    <FilterButton
      label="Category"
      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/31beb790828a3f42a470f2bd19e2ad707fb9b193c42723ef663f0efc324a0753"
    />
    <FilterButton
      label="Close to goal"
      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f0661d16d72b07aff81cbdbe915cc912656774658fe96b306711ce4b3959add4"
    />
    <SearchButton />
  </section>
);

const FilterButton = ({ label, icon }) => (
  <button className="flex items-center py-2.5 px-6 border border-stone-700 rounded-full">
    {label}
    <img src={icon} alt="icon" className="w-4 h-4 ml-1.5" />
  </button>
);

const SearchButton = () => (
  <button className="flex items-center py-2.5 px-6 border border-stone-700 rounded-full min-w-[240px]">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3afaa808a1186e7756ccb078928bf966e3ceee6913b165cb3cb797a3e5bd81ea"
      alt="search"
      className="w-[19px] h-[19px] mr-2.5"
    />
    Search
  </button>
);

const CampaignItem = ({ title, amountRaised, progressPercentage, imageUrl,params, id }) => (
  <article className="flex gap-5">
    <img src={imageUrl} alt={imageUrl} className="w-[121px] h-[111px] object-cover" />
    <div className="flex-1">
      <h2 className="text-2xl font-bold tracking-wider uppercase text-stone-700">{title}</h2>
      <p className="text-base font-bold tracking-wider text-stone-700">Raised {amountRaised}</p>
      <ProgressBar percentage={progressPercentage} />
      <div className="flex gap-1.5 mt-3.5 text-sm font-bold">
        <ActionButton
          label="Edit"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/8625ca56f29f59699991011c4fc201619ea99d62c7578481ae856563a9fde052"
        />
        <Link href={`/account/my-campaigns/${id}`}>
          <ActionButton
            label="View"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/ffdd7597123ffc9d10d0fd934db1e42628cb4430c63c6bf659e29eb31f1a4e2c"
          /></Link>
        <ActionButton
          label="Share"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bd0d3c016418a4b43cfc53e9c726afa01ec894ed8f455a5be43d275527e37c29"
        />
      </div>
    </div>
  </article>
);

const ProgressBar = ({ percentage }) => (
  <div className="mt-1.5 border border-stone-700">
    <div className="bg-stone-700 bg-opacity-80 h-[7px]" style={{ width: `${percentage}%` }} />
  </div>
);

const ActionButton = ({ label, icon }) => (
  <button className="flex items-center px-5 py-2 border border-stone-700 rounded-full">
    <img src={icon} alt="icon" className="w-3 h-3 mr-1.5" />
    {label}
  </button>
);

export default CampaignListComponent;
