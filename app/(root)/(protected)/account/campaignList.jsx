'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import React from 'react';
import BrandDropdown from '@/components/ui/brandDropdown';

const CampaignListComponent = () => {
  const hasData = true;
  return (
    <main className="bg-brand-eucalyptus p-8 h-full">
      <header className="flex justify-between items-center font-bold">
        <h1 className="text-3xl tracking-widest uppercase text-brand-dark font-heading">
          Your Campaigns
        </h1>
        <Button
          variant="solid"
          radius="full"
          className="font-medium bg-brand-olive-green border-brand-olive-green text-white"
        >
          Donate Now
        </Button>
      </header>

      <FilterSection />
      {hasData ? (
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
      ) : (
        <div className="border border-dashed border-brand-dark border-opacity-50 rounded-xl h-[350px] flex flex-col gap-0 items-center justify-center">
          <h4 className="uppercase text-3xl font-bold text-brand-dark font-heading">
            Nothing to show here{' '}
          </h4>
          <p>You have not received any donations yet.</p>
        </div>
      )}
    </main>
  );
};

const FilterSection = () => (
  <div className="flex gap-4 items-center mt-4 mb-8">
    <div className="basis-[40%]">
      <BrandDropdown
        label="Category"
        data={[
          { key: 'cat', label: 'Cat' },
          { key: 'dog', label: 'Dog' },
          { key: 'elephant', label: 'Elephant' },
          { key: 'lion', label: 'Lion' },
          { key: 'tiger', label: 'Tiger' },
          { key: 'giraffe', label: 'Giraffe' },
          { key: 'dolphin', label: 'Dolphin' },
          { key: 'penguin', label: 'Penguin' },
          { key: 'zebra', label: 'Zebra' },
          { key: 'shark', label: 'Shark' },
          { key: 'whale', label: 'Whale' },
          { key: 'otter', label: 'Otter' },
          { key: 'crocodile', label: 'Crocodile' }
        ]}
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.25 0H3.7425V19.8913H1.25V0ZM5.07 0.65V10.1188C5.07 10.1188 7.08375 8.33 11.555 10C16.025 11.6725 16.9362 11.2175 18.695 10.9275C18.695 10.9275 16.135 9.83875 14.6675 5.89125C14.6675 5.89125 18.4012 2.4475 18.695 0.54875C18.695 0.54875 14.07 2.06375 11.5063 0.85C8.94 -0.36625 6.2425 -0.11125 5.07 0.65Z"
              fill="#3D4630"
            />
          </svg>
        }
      />
    </div>
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
      classNames={{
        inputWrapper: 'border-brand-olive-green'
      }}
    />
  </div>
);

const CampaignItem = ({ title, amountRaised, progressPercentage, imageUrl }) => (
  <article className="flex gap-5">
    <img src={imageUrl} alt={imageUrl} className="w-[121px] h-[111px] object-cover" />
    <div className="flex-1">
      <h2 className="text-2xl font-bold tracking-wider uppercase text-brand-dark font-heading">
        {title}
      </h2>
      <p className="text-base font-bold tracking-wider text-brand-dark">Raised {amountRaised}</p>
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
