import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div className="flex overflow-hidden flex-col px-16 pt-20 pb-14 bg-brand-olive-green max-md:px-5 font-heading">
      <div className="flex gap-3 self-start text-5xl font-bold text-amber-50 whitespace-nowrap max-md:text-4xl">
        <Image width={45} height={45} src="/images/logo.png" alt="footter-logo" />
        <p className="font-bold text-inherit text-white text-4xl mt-2">Raise</p>
      </div>
      <div className="flex flex-wrap gap-5 justify-between mt-8 font-bold text-amber-50 uppercase max-md:mr-1 max-md:max-w-full">
        <div className="text-6xl tracking-[2.56px] leading-[140%] max-md:max-w-full max-md:text-4xl ">
          We are here for you. <br /> Let’s get Started!
        </div>
        <div className="flex flex-col items-end text-3xl tracking-wider text-right whitespace-nowrap">
          <div>About</div>
          <div className="mt-1.5">Pricing</div>
          <div className="mt-1.5">Forum</div>
          <div className="mt-1.5">Campaigns</div>
        </div>
      </div>
      <div className="shrink-0 mt-10 max-w-full h-px border border-amber-50 border-solid w-full max-md:mr-1" />
      <div className="flex flex-wrap gap-5 justify-between mt-6 w-full max-md:max-w-full">
        <div className="text-3xl font-bold tracking-widest text-amber-50 uppercase">
          2024 © All rights reserved
        </div>
        <div className="flex gap-8 items-center self-start mt-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/df6f575bdd2bf72ccc88c033011338f34bfaf5cb07a58d913434638417bb598f?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
            alt="lazy"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe585ecbf9c997be3746f2367b2c949aaaf887bdb92296e38102b8615de1b0e4?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
            alt="lazy"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/993cd7dca3065de200b93e8de24d9c1051a8e5a03147d466e5dcf6ce7f229f86?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
            alt="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
