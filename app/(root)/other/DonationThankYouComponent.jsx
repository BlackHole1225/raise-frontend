import React from 'react';

const DonationThankYouComponent = () => {
  return (
    <main className="bg-yellow-200 p-8 max-w-[500px]">
      <header>
        <h1 className="text-3xl font-bold tracking-widest uppercase text-stone-700">
          Thank you for your donation
        </h1>
      </header>

      <section className="mt-7 flex gap-5">
        <CampaignImage />
        <CampaignDetails />
      </section>

      <hr className="border-stone-700 my-4" />

      <section className="text-center">
        <img
          src="/api/placeholder/80/80"
          alt="Donation received icon"
          className="mx-auto mt-10 w-20 h-20 rounded-full"
        />
        <h2 className="mt-5 text-xl font-bold tracking-wider text-stone-700">Donation Received</h2>
        <p className="mt-9 text-base font-bold tracking-wider text-stone-700">
          Thank you Mr. Donor for helping our camp in saving rare species of tigers.
        </p>
      </section>

      <footer className="mt-4">
        <p className="text-base font-bold tracking-wider text-stone-700">
          Transaction Hash: 34jkl.............4343
        </p>
        <p className="mt-2 text-base font-bold tracking-wider text-stone-700">
          We guarantee you a full refund for up to a year in the rare case that fraud occurs.
        </p>
      </footer>
    </main>
  );
};

const CampaignImage = () => (
  <figure className="w-32 aspect-[1.182] relative">
    <img
      src="/api/placeholder/130/110"
      alt="Campaign"
      className="object-cover absolute inset-0 w-full h-full"
    />
  </figure>
);

const CampaignDetails = () => (
  <article className="flex-1">
    <h2 className="text-3xl font-bold tracking-widest uppercase text-stone-700">
      Campaign for the <br />
      Rare species of tigers
    </h2>
    <p className="mt-2.5 text-base font-bold tracking-wider text-stone-700">
      Your donation will benefit Jenelle Marie
    </p>
  </article>
);

export default DonationThankYouComponent;
