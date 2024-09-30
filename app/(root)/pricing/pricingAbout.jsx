import * as React from 'react';

const PricingCard = ({ title, price, description, bgColor, textColor }) => (
  <div className={`${bgColor} ${textColor} p-8 lg:p-12 flex flex-col h-full`}>
    <h3 className="text-3xl lg:text-4xl font-bold tracking-widest uppercase mb-20 font-heading">
      {title}
    </h3>
    <div className="text-5xl lg:text-9xl font-bold uppercase tracking-wider mb-4 font-heading">
      {price}
    </div>
    <p className="text-lg lg:text-xl tracking-wide">{description}</p>
  </div>
);

function PricingAbout() {
  return (
    <section className="bg-brand-ivory overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 pt-[140px]">
          <h2 className="text-4xl pl-10 lg:text-7xl font-bold uppercase text-brand-dark tracking-wider mb-12 font-heading">
            Simple Pricing,
            <br />
            Effective fundraising
          </h2>

          <div className="bg-brand-lemon-yellow px-12 pb-8 pt-20">
            <div className="flex flex-col lg:flex-row items-end justify-between">
              <h3 className="text-5xl lg:text-8xl font-bold uppercase text-brand-olive-green tracking-wider font-heading">
                NO Fee
              </h3>
              <p className="text-2xl lg:text-4xl font-bold tracking-wide uppercase mb-2 text-brand-olive-green font-heading">
                To start a campaign
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <PricingCard
              title="Transaction Fee"
              price="3.0%"
              description="Automatically deducted from each donation, so you never have to worry about paying a bill"
              bgColor="bg-brand-olive-green"
              textColor="text-brand-ivory"
            />
            <PricingCard
              title="Success Fee"
              price="1.8%"
              description="Automatically deducted after your campaign reaches its goal."
              bgColor="bg-brand-ivory"
              textColor="text-brand-olive-green"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/40dd8c64df7588e9947e396e807917032005ce86cfab35657ed2a3ff159af573"
            alt="Fundraising illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

export default PricingAbout;
