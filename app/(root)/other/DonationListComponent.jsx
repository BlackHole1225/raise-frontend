import React from 'react';

const DonationListComponent = () => {
  return (
    <main className="font-bold bg-yellow-50 max-w-[544px] text-zinc-800 p-8 pb-32">
      <h1 className="text-3xl tracking-widest uppercase">All Donations</h1>

      <FilterSection />

      <section className="mt-10">
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
    </main>
  );
};

const FilterSection = () => (
  <section className="flex gap-2 items-center mt-7 text-base">
    <FilterButton label="Campaign" />
    <FilterButton label="Received" active />
    <SearchButton />
  </section>
);

const FilterButton = ({ label, active }) => (
  <button
    className={`flex items-center py-2.5 px-6 rounded-full border border-zinc-800 ${active ? 'bg-zinc-800 text-yellow-50' : ''}`}
  >
    {label}
    <img
      src={
        active
          ? 'https://cdn.builder.io/api/v1/image/assets/TEMP/309201eb428e6f4d3dff3f34747a9435b5fe85326f479a8c6216b9e360efcf0c?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded'
          : 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccac278d0ef377e94054026d6c595c3b231b072f9b1b1075b887ced9771d1a8b?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded'
      }
      alt="filter"
      className="w-4 h-4 ml-1.5"
    />
  </button>
);

const SearchButton = () => (
  <button className="flex items-center py-2.5 px-6 rounded-full border border-zinc-800">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/27b2199c95b1798528d613c3222163966746018565969d2010395a997d638cb3?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
      alt="search"
      className="w-[19px] h-[19px] mr-2.5"
    />
    Search
  </button>
);

const DonationItem = ({ name, amount, time, transactionHash, imageUrl, expanded }) => (
  <>
    <div className="flex justify-between items-start mt-8">
      <div className="flex items-start gap-3">
        <img src={imageUrl} alt={imageUrl} className="w-[50px] h-[50px] rounded-full" />
        <div>
          <h2 className="text-2xl tracking-wider uppercase">{name}</h2>
          <div className="flex gap-3.5 text-base">
            <span>{amount}</span>
            <span>{time}</span>
            <span>{transactionHash}</span>
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
