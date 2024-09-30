import React from 'react';
import PricingAbout from './pricingAbout';
import PricingPlans from './pricingPlans';
import FeatureListingComponent from './featureListingComponent';
const page = () => {
  return (
    <>
      <PricingAbout />
      <PricingPlans />
      <FeatureListingComponent />
    </>
  );
};

export default page;
