import React from 'react';

const HeroSection = ({ imgUrl, title, action }) => {
  return (
    <section
      className="h-screen bg-fixed bg-center bg-no-repeat bg-cover w-full flex items-end"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className="px-14 pb-14 w-full flex flex-col md:flex-row gap-8 justify-between items-center md:items-end">
        {title}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-4">{action}</div>
      </div>
    </section>
  );
};

export default HeroSection;
