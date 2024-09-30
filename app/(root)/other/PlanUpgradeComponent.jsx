import React from 'react';

const PlanUpgradeComponent = () => {
  return (
    <main className="font-bold bg-yellow-200 max-w-[500px] text-stone-700 p-9">
      <header className="flex justify-between items-start">
        <h1 className="text-3xl tracking-widest uppercase">Upgrade to Basic Plan</h1>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f7c4954a87c9db5c5b1f18a652ea436ac4780676e585beae629026e59f5182e"
          alt="Close"
          className="w-7 h-7"
        />
      </header>

      <section className="flex justify-between items-baseline mt-11 uppercase">
        <h2 className="text-6xl tracking-[2.56px]">BASIC</h2>
        <p className="text-7xl tracking-[2.84px]">
          <span className="text-5xl">10.00</span> <span className="text-xl">SOL</span>
        </p>
      </section>

      <p className="mt-7 text-2xl">These features are Included in the basic plan of Raise.</p>

      <ul className="mt-10 space-y-4">
        <FeatureItem text="Basic Analytics" />
        <FeatureItem text="General Campaign Visibility" />
        <FeatureItem text="General Campaigns Rendering" />
        <FeatureItem text="General Campaigns Rendering" />
      </ul>

      <button className="w-full px-6 py-3.5 mt-11 text-sm border border-solid border-stone-700 rounded-full">
        Upgrade Now
      </button>
    </main>
  );
};

const FeatureItem = ({ text }) => (
  <li className="flex items-start gap-1.5 text-xl tracking-wider">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f8f8930ab195d8f31d806539350577484a1967ef7ff00fa588bffadba60125"
      alt="feature"
      className="w-5 h-5"
    />
    <span>{text}</span>
  </li>
);

export default PlanUpgradeComponent;
