import React from 'react';

const HeroSection = ({ imgUrl, title, action }) => {
  return (
    <section
      className="h-screen bg-fixed bg-center bg-no-repeat bg-cover w-full flex items-end"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className="px-14 pb-14 w-full flex justify-between items-end">
        {title}
        <div className="flex gap-8 mb-4">{action}</div>
      </div>
    </section>
  );
};

export default HeroSection;
