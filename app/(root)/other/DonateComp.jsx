import React from 'react';

const DonateComp = () => {
  return (
    <main className="bg-yellow-200 p-8 max-w-[500px]">
      <header>
        <h1 className="text-3xl font-bold tracking-widest uppercase text-stone-700">
          You&apos;re supporting
        </h1>
      </header>
      <section className="mt-7 flex gap-5">
        <CampaignImage />
        <CampaignDetails />
      </section>
      <hr className="border-stone-700 my-4" />
      <DonationForm />
      <footer className="mt-6">
        <p className="text-base font-bold tracking-wider text-stone-700">
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

const DonationForm = () => (
  <form>
    <div className="mb-4">
      <button
        type="button"
        className="w-full p-4 flex justify-between items-center rounded-lg border border-stone-700 text-xl font-bold text-stone-700"
      >
        Connect Wallet
        <span className="material-icons">account_balance_wallet</span>
      </button>
    </div>
    <div className="mb-4">
      <label htmlFor="donationAmount" className="sr-only">
        Donation Amount
      </label>
      <div className="flex justify-between items-center p-4 rounded-lg border border-stone-700 text-xl font-bold text-stone-700">
        <input
          type="number"
          id="donationAmount"
          placeholder="Donation Amount"
          className="bg-transparent outline-none"
        />
        <span>SOL</span>
      </div>
    </div>
    <ConsentCheckboxes />
    <button
      type="submit"
      className="w-full py-3.5 mt-4 text-sm font-bold border border-stone-700 rounded-full text-stone-700"
    >
      Donate Now
    </button>
  </form>
);

const ConsentCheckboxes = () => (
  <fieldset className="mb-4">
    <legend className="sr-only">Consent Options</legend>
    <div className="flex items-center mb-2">
      <input type="checkbox" id="anonymousDonation" className="mr-2" />
      <label
        htmlFor="anonymousDonation"
        className="text-base font-bold tracking-wider text-stone-700"
      >
        Don&apos;t display my name publicly on the fundraiser.
      </label>
    </div>
    <div className="flex items-center">
      <input type="checkbox" id="marketingConsent" className="mr-2" />
      <label
        htmlFor="marketingConsent"
        className="text-base font-bold tracking-wider text-stone-700"
      >
        Get occasional marketing updates from Raise. You may unsubscribe at any time.
      </label>
    </div>
  </fieldset>
);

export default DonateComp;
