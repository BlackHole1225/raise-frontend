import React from 'react';

const PricingPlansComponent = () => {
  return (
    <main className="bg-amber-50 px-10 pt-20 pb-80">
      <h1 className="text-4xl font-bold tracking-widest uppercase text-zinc-800">Account Plans</h1>
      <p className="mt-4 text-2xl font-bold text-stone-700 max-w-[997px]">
        We have introduced four plans for users to increase the visibility of their campaigns which
        allows users to make their fundraiser popular around the globe to achieve their goal sooner.
      </p>
      <section className="mt-11 flex gap-5 flex-wrap">
        <PlanCard
          title="Default plan"
          price="Free"
          description="Automatically deducted after your campaign reaches to it's goal."
          features={[
            'Basic Analytics',
            'General Campaign Visibility',
            'General Campaigns Rendering'
          ]}
          buttonText="Current Plan"
          isCurrentPlan={true}
        />
        <PlanCard
          title="Basic Plan"
          price={
            <>
              <span className="text-5xl">10.00</span> <span className="text-xl">SOL/month</span>
            </>
          }
          description="Automatically deducted after your campaign reaches to it's goal."
          features={[
            'Basic Analytics',
            'General Campaign Visibility',
            'General Campaigns Rendering'
          ]}
          buttonText="Upgrade"
        />
        <PlanCard
          title="Premium plan"
          price={
            <>
              <span className="text-5xl">18.25</span> <span className="text-xl">SOL/month</span>
            </>
          }
          description="Automatically deducted after your campaign reaches to it's goal."
          features={[
            'Basic Analytics',
            'General Campaign Visibility',
            'General Campaigns Rendering'
          ]}
          buttonText="Upgrade"
        />
        <PlanCard
          title="Enterprise Plan"
          price={
            <>
              <span className="text-5xl">42.00</span> <span className="text-xl">SOL/month</span>
            </>
          }
          description="Automatically deducted after your campaign reaches to it's goal."
          features={[
            'Basic Analytics',
            'General Campaign Visibility',
            'General Campaigns Rendering'
          ]}
          buttonText="Upgrade"
        />
      </section>
    </main>
  );
};

const PlanCard = ({
  title,
  price,
  description,
  features,
  buttonText
  // isCurrentPlan,
}) => (
  <article className="flex flex-col w-full sm:w-3/12 font-bold bg-yellow-50 border border-solid border-black border-opacity-20 text-stone-700">
    <header className="px-4 pt-6 pb-3.5 text-2xl tracking-wider uppercase bg-yellow-200">
      {title}
    </header>
    <div className="flex flex-col items-start p-4 mt-2 w-full text-base">
      <div className="text-5xl sm:text-7xl uppercase tracking-widest mb-2.5">{price}</div>
      <p className="mb-8">{description}</p>
      {features.map((feature, index) => (
        <FeatureItem key={index} text={feature} />
      ))}
      <button className="w-full px-6 py-3.5 mt-11 border border-solid border-stone-700 rounded-full">
        {buttonText}
      </button>
    </div>
  </article>
);

const FeatureItem = ({ text }) => (
  <div className="flex gap-2 mt-2 tracking-wider">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/813e7e83f6d6decdf154c6e8bdb98fc44a01626f95d257f3981a13f1f4239406"
      alt="feature"
      className="w-4 h-4"
    />
    <span>{text}</span>
  </div>
);

export default PricingPlansComponent;
