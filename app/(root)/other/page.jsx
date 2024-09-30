import React from 'react';
import DonationsComponent from './DonationsComponent';
import DonateComp from './DonateComp';
import DonationThankYouComponent from './DonationThankYouComponent';
import FileUploadComponent from './FileUploadComponent';
import DonationListComponent from './DonationListComponent';
import CampaignListComponent from './CampaignListComponent';
import PricingPlansComponent from './PricingPlansComponent';
import PlanUpgradeComponent from './PlanUpgradeComponent';
import AccountSettingsComponent from './AccountSettingsComponent';
const page = () => {
  return (
    <div className="flex flex-col gap-8 py-[100px]">
      <DonationsComponent />
      <DonateComp />
      <DonationThankYouComponent />
      <FileUploadComponent />
      <DonationListComponent />
      <CampaignListComponent />
      <PricingPlansComponent />
      <PlanUpgradeComponent />
      <AccountSettingsComponent />
    </div>
  );
};

export default page;
