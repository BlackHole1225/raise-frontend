'use client';
import { Input } from '@nextui-org/input';
import React from 'react';
import BrandDropdown from '@/components/ui/brandDropdown';
const DonationListComponent = ({ compFor = 'home' }) => {
  const hasData = true;
  return (
    <main className="font-bold bg-brand-pale-lemon w-full text-brand-dark p-8 h-full">
      <h1 className="text-3xl tracking-widest uppercase font-heading">
        {compFor === 'campaign' ? 'Received Donations' : 'All Donations'}
      </h1>
      {compFor === 'campaign' && (
        <>
          <div className={`text-xl font-bold tracking-wider text-brand-dark`}>Raised $ 232232</div>
          <div
            className={`flex overflow-hidden flex-col items-start mt-1.5 w-full border border-solid border-brand-dark`}
          >
            <div className={`flex max-w-full bg-brand-dark min-h-[10px] w-1/2`} />
          </div>
        </>
      )}

      <FilterSection compFor={compFor} />

      {hasData ? (
        <section>
          <DonationItem
            name="Diana ROOBERT"
            amount="$ 500"
            time="5 min ago"
            transactionHash="er3kl......3joj43"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/800c932755c7bc3849ae8eed6ce497c46b8421b967fbc1e9da3d1fd7e59c6ee1?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
            expanded={true}
          />
          <DonationItem
            name="Anonymous User"
            amount="$ 240"
            time="2 days ago"
            transactionHash="er3kl......3joj43"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/2eb9ff84b86a2b1e747ffe7afc36c3935cec51cc5f75392f19c3454944edce68?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
            expanded={false}
          />
          <DonationItem
            name="Anonymous User"
            amount="$ 240"
            time="2 days ago"
            transactionHash="er3kl......3joj43"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/2eb9ff84b86a2b1e747ffe7afc36c3935cec51cc5f75392f19c3454944edce68?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
            expanded={false}
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

const FilterSection = ({ compFor }) => (
  <div className="flex gap-4 items-center mt-4 mb-8">
    <div className="basis-[40%]">
      {compFor === 'campaign' ? (
        <BrandDropdown
          label="Short by"
          data={[
            { key: 'all', label: 'All' },
            { key: 'top-donor', label: 'Top donor' },
            { key: 'latest-donor', label: 'Latest donor' }
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
      ) : (
        <BrandDropdown
          label="Campaign"
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
      )}
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

const DonationItem = ({ name, amount, time, transactionHash, imageUrl, expanded }) => (
  <>
    <div className="flex justify-between items-start mt-8">
      <div className="flex items-start gap-3">
        <img src={imageUrl} alt={imageUrl} className="w-[50px] h-[50px] rounded-full" />
        <div>
          <h2 className="text-3xl tracking-wider uppercase font-heading">{name}</h2>
          <div className="flex gap-3.5 text-base">
            <span>{amount}</span>
            <span className="opacity-60">{time}</span>
            <span className="opacity-60">{transactionHash}</span>
          </div>
        </div>
      </div>
      <button>
        <img
          src={
            expanded
              ? 'https://cdn.builder.io/api/v1/image/assets/TEMP/a91228f6ddc373ddc213c1ace6df31c7940a272b0d1a20b6e240a1dcd0c15982?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded'
              : 'https://cdn.builder.io/api/v1/image/assets/TEMP/44316956e0a7ad01d201b711b748606fd22e6d4311b56265c1ecc7f1a77d3228?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded'
          }
          alt={expanded ? 'Collapse' : 'Expand'}
          className="w-5 h-5"
        />
      </button>
    </div>
    <hr className="border-zinc-800 mt-3" />
  </>
);

export default DonationListComponent;
