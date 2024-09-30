import React from 'react';
import DonationChart from './donationChart';
import DonationListComponent from './donationList';
import CampaignListComponent from '../../other/CampaignListComponent';

const page = () => {
  return (
    <div>
      <DonationChart />
      <div className="grid grid-cols-12 gap-8 my-12">
        <div className="col-span-5">
          <DonationListComponent />
        </div>
        <div className="col-span-7">
          <CampaignListComponent />
        </div>
      </div>
    </div>
  );
};

export default page;
