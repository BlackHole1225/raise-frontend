import React from 'react';
import Link from 'next/link';

const CampaignListComponent = () => {
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
        <CampaignItem
          title="Beekeeping Community Development Zimbabwe"
          amountRaised="400 SOL"
          progressPercentage={80}
          imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/793c80c23e08cf30921f97c1e260306f28c41ce2839846dc1ecfd8f2bded4309"
        />
        <hr className="border-stone-700 my-4" />
        <CampaignItem
          title="Donations for the Rare species of tigers"
          amountRaised="300 SOL"
          progressPercentage={60}
          imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/4f0c57db4ea9de3b60f8464c7b8548c66f2006903996ebf3006a8c761e32cabe"
        />
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

const CampaignItem = ({ title, amountRaised, progressPercentage, imageUrl }) => (
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
        <ActionButton
          label="View"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/ffdd7597123ffc9d10d0fd934db1e42628cb4430c63c6bf659e29eb31f1a4e2c"
        />
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
