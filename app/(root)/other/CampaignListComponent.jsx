'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/input';
import BrandDropdown from '@/components/ui/brandDropdown';
import { SERVER_IP, SERVER_LOCAL_IP } from '@/utils/constants';

const CampaignListComponent = ({ params }) => {
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
      <header className="flex flex-col md:flex-row gap-2 justify-between items-center font-bold">
        <h1 className="text-2xl md:text-3xl tracking-widest uppercase text-zinc-800">Your Campaigns</h1>
        <Link
          className="p-2 md:px-6 md:py-3.5 text-center text-sm md:text-base text-amber-50 bg-stone-700 rounded-full ml-auto"
          href="/account/create-a-campaign"
        >
          Create a Campaign
        </Link>
      </header>
      <section className="flex flex-wrap gap-2 mt-7 text-base font-bold text-stone-700">

        <div className="basis-[20%]">
          <BrandDropdown
            label="Category"
            data={categories.map((cat) => ({ key: cat._id, label: cat.name }))}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.89584 9.16667C6.57639 9.16667 6.33667 9.02417 6.17667 8.73917C6.01667 8.45417 6.02028 8.17306 6.1875 7.89583L9.29167 2.83333C9.45834 2.56944 9.69445 2.4375 10 2.4375C10.3056 2.4375 10.5417 2.56944 10.7083 2.83333L13.8125 7.89583C13.9792 8.17361 13.9828 8.455 13.8233 8.74C13.6639 9.025 13.4242 9.16722 13.1042 9.16667H6.89584ZM14.5833 18.3333C13.5417 18.3333 12.6561 17.9686 11.9267 17.2392C11.1972 16.5097 10.8328 15.6244 10.8333 14.5833C10.8333 13.5417 11.1981 12.6561 11.9275 11.9267C12.6569 11.1972 13.5422 10.8328 14.5833 10.8333C15.625 10.8333 16.5106 11.1981 17.24 11.9275C17.9694 12.6569 18.3339 13.5422 18.3333 14.5833C18.3333 15.625 17.9686 16.5106 17.2392 17.24C16.5097 17.9694 15.6244 18.3339 14.5833 18.3333ZM3.33334 17.9167C3.09723 17.9167 2.89917 17.8367 2.73917 17.6767C2.57917 17.5167 2.49945 17.3189 2.5 17.0833V12.0833C2.5 11.8472 2.58 11.6492 2.74 11.4892C2.9 11.3292 3.09778 11.2494 3.33334 11.25H8.33334C8.56945 11.25 8.7675 11.33 8.9275 11.49C9.0875 11.65 9.16723 11.8478 9.16667 12.0833V17.0833C9.16667 17.3194 9.08667 17.5175 8.92667 17.6775C8.76667 17.8375 8.56889 17.9172 8.33334 17.9167H3.33334Z"
                  fill="#3D4630"
                />
              </svg>
            }
            onSelectionChange={(keys) => handleFilterChange('category', keys)}
          />
        </div>
        <FilterButton
          label="Close to goal"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f0661d16d72b07aff81cbdbe915cc912656774658fe96b306711ce4b3959add4"
        />
        <Input
          startContent={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z"
                stroke="#3D4630"
                strokeWidth="2"
              />
              <path d="M20 20L17 17" stroke="#3D4630" strokeWidth="2" strokeLinecap="round" />
            </svg>
          }
          size="lg"
          variant="bordered"
          placeholder="Search"
          radius="full"
          className='w-fit'
          classNames={{
            inputWrapper: 'border-brand-olive-green'
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>
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

const CampaignItem = ({ title, amountRaised, progressPercentage, imageUrl, params, id }) => (
  <article className="flex gap-5">
    <div>
      <img src={imageUrl} alt={imageUrl} className="w-[121px] h-full md:h-[111px] object-cover" />
    </div>
    <div className="flex-1">
      <h2 className="text-2xl font-bold tracking-wider uppercase text-stone-700">{title}</h2>
      <p className="text-base font-bold tracking-wider text-stone-700">Raised {amountRaised}</p>
      <ProgressBar percentage={progressPercentage} />
      <div className="flex flex-wrap md:flex-nowrap gap-1.5 mt-3.5 text-sm font-bold">
        <Link href={`/account/edit-a-campaign/${id}`}>
          <ActionButton
            label="Edit"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/8625ca56f29f59699991011c4fc201619ea99d62c7578481ae856563a9fde052"
          />
        </Link>
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
