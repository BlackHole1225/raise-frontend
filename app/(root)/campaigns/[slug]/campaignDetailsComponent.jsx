'use client';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import DonateNowComp from './donateNowComp';
import CampaignDetailsContent from './campaignDetailsContent';

const UserProfile = ({ creater }) => (
  <div className="flex items-center gap-3">
    <Avatar
      showFallback
      name={creater.fullName}
      src={creater?.avatar ? ` ${creater?.avatar}` : `https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__`}
      alt={creater?.avatar ? ` ${creater?.avatar}` : `https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__`}

    />
    <div>
      <h3 className="text-xl font-heading font-bold">{creater.fullName}</h3>
      <div className="text-sm flex gap-4">
        <span>Owner</span>
        <span>{creater.address}</span>
      </div>
    </div>
  </div>
);

const DonationItem = ({ image, name, amount, label }) => (
  <div className="mb-4 pb-4 border-b border-zinc-800">
    <div className="flex items-center gap-3">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <Avatar showFallback name={name} src={image} />
      <div>
        <h4 className="text-xl font-heading font-bold !tracking-wide">{name}</h4>
        <div className="text-sm font-medium flex gap-4">
          <span>{amount} SOL</span>
          <span className="opacity-50">{label}</span>
        </div>
      </div>
    </div>
  </div>
);

const ShareButton = ({ icon }) => (
  <img src={icon} alt="Share" className="w-10 h-10 rounded-full object-cover" />
);

function CampaignDetailsComponent({ campaignData }) {
  const {
    isOpen: donationListIsOpen,
    onOpen: donationListOnOpen,
    onOpenChange: donationListOnOpenChange
  } = useDisclosure();
  const {
    isOpen: donateIsOpen,
    onOpen: donateOnOpen,
    onOpenChange: donateOnOpenChange
  } = useDisclosure();
  console.log(campaignData);
  const progressPercentage = (campaignData.totalAmount / campaignData.amount) * 100;

  const [donorListType, setDonorListType] = useState('top');

  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row bg-brand-ivory">
      <main className="w-full lg:w-1/2 flex-grow pt-[140px]">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-8 px-8">
            <h1 className="main-heading text-5xl xl:text-[92px] max-w-3xl uppercase ">
              {campaignData.title}
            </h1>
            <div className="mb-4">
              <UserProfile
                creater={campaignData?.createrId}
              />
            </div>
          </div>
          <img
            src={campaignData?.file ? `${campaignData?.file}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
            alt="Campaign"
            className="w-full mt-8 object-cover max-h-[450px]"
          />
        </div>
        <CampaignDetailsContent campaignData={campaignData} />
      </main>

      <aside className="w-full lg:w-[350px] bg-brand-lemon-yellow p-8 md:pt-[150px] h-fit md:h-screen sticky top-0 overflow-auto">
        <div className="">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-stone-700 mb-4">
            {campaignData.totalAmount} <span className="text-2xl font-body">SOL</span>
          </h2>
          <p className="text-xl font-bold text-stone-700 mb-2">
            raised of {campaignData.amount} SOL.
          </p>
          <div className="w-full bg-stone-300 rounded-full h-2 mb-8">
            <div
              className="bg-stone-700 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <h3 className="text-xl font-bold text-stone-700 mb-4">Donations for this Campaign</h3>
          {/* {campaignData.filteredDonors.recentDonors
      .slice(0, 3)
      .map((donor, index) => (
        <DonationItem
          key={index}
          image={`https://example.com/avatars/user${index + 1}.jpg`}
          name={donor.name}
          amount={donor.amount}
          label={
            index === 0
              ? "Recent Donation"
              : index === 1
                ? "Top Donation"
                : "First Donation"
          }
        />
      ))} */}

          <Button
            onClick={donationListOnOpen}
            variant="bordered"
            radius="full"
            size="lg"
            className="mb-4 font-medium text-brand-olive-green w-full border-brand-olive-green xl:py-6 xl:px-7"
          >
            See All
          </Button>

          <h3 className="text-xl font-bold text-stone-700 mb-4">Share this Fundraiser</h3>
          <div className="flex gap-2 mb-8">
            <ShareButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/37e35f709513915e58e6aed26be95bb58c09d1e71d0c8c5d8b89b50f032fdc52" />
            <ShareButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/20a90ca2e1f62331b0310ba6e1f2b992773ba80b82c3979f2f965eeb9415ceda" />
            <ShareButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/852b456c4e97273a25b0e639deba115fc5d18cc49bf40948a0bf2fe1ae5ef959" />
            <ShareButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/14dfc892fdd2eab02bc8e09098eb2c8a382331ca9ef31bac42043b6cede3b1e6" />
          </div>

          <Button
            onClick={donateOnOpen}
            variant="solid"
            radius="full"
            size="lg"
            className="mb-4 font-medium bg-brand-olive-green w-full border-brand-olive-green text-white xl:py-6 xl:px-7"
          >
            Donate Now
          </Button>
        </div>
      </aside>

      <Modal
        isOpen={donationListIsOpen}
        onOpenChange={donationListOnOpenChange}
        size="2xl"
        classNames={{
          base: 'rounded-none bg-brand-lemon-yellow py-4 px-2',
          closeButton: 'top-2.5 right-2.5 hover:bg-brand-transparent'
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 heading-2 text-brand-olive-green">
                Donations ({campaignData.donated.length})
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2 mb-8">
                  <Button
                    variant={donorListType === 'top' ? 'solid' : 'bordered'}
                    radius="full"
                    size="sm"
                    className={
                      donorListType === 'top'
                        ? 'mb-4 font-medium bg-brand-olive-green border-brand-olive-green text-brand-lemon-yellow xl:py-6 xl:px-7'
                        : 'mb-4 font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7'
                    }
                    onClick={() => setDonorListType('top')}
                  >
                    Recent Donations
                  </Button>
                  <Button
                    variant={donorListType === 'recent' ? 'solid' : 'bordered'}
                    radius="full"
                    size="sm"
                    className={
                      donorListType === 'recent'
                        ? 'mb-4 font-medium bg-brand-olive-green border-brand-olive-green text-brand-lemon-yellow xl:py-6 xl:px-7'
                        : 'mb-4 font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7'
                    }
                    onClick={() => setDonorListType('recent')}
                  >
                    Top Donations
                  </Button>
                </div>

                <div className="mb-14">
                  {donorListType === 'top'
                    ? campaignData.donated.topDonors.map((donor, index) => (
                      <DonationItem
                        key={index}
                        image={`https://example.com/avatars/user${index + 1}.jpg`}
                        name={donor.name}
                        amount={donor.amount}
                        label={new Date(donor.dateTime).toLocaleString()}
                      />
                    ))
                    : campaignData.filteredDonors.recentDonors.map((donor, index) => (
                      <DonationItem
                        key={index}
                        image={`https://example.com/avatars/user${index + 1}.jpg`}
                        name={donor.name}
                        amount={donor.amount}
                        label={new Date(donor.dateTime).toLocaleString()}
                      />
                    ))}
                </div>

                <h3 className="text-xl font-bold text-stone-700 mb-4">Share this Fundraiser</h3>

                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <ShareButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/37e35f709513915e58e6aed26be95bb58c09d1e71d0c8c5d8b89b50f032fdc52" />
                    <ShareButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/20a90ca2e1f62331b0310ba6e1f2b992773ba80b82c3979f2f965eeb9415ceda" />
                    <ShareButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/852b456c4e97273a25b0e639deba115fc5d18cc49bf40948a0bf2fe1ae5ef959" />
                    <ShareButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/14dfc892fdd2eab02bc8e09098eb2c8a382331ca9ef31bac42043b6cede3b1e6" />
                  </div>
                  <Button
                    onClick={() => {
                      onClose();
                      donateOnOpen();
                    }}
                    variant="bordered"
                    radius="full"
                    size="lg"
                    className="mb-4 font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7"
                  >
                    Donate Now
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={donateIsOpen}
        onOpenChange={donateOnOpenChange}
        size="2xl"
        classNames={{
          base: 'rounded-none bg-brand-lemon-yellow py-4 px-2',
          closeButton: 'top-2.5 right-2.5 hover:bg-brand-transparent'
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 heading-2 text-brand-olive-green">
                {isSubmitted ? 'Thank you for your donation From' : "You're supporting"}
              </ModalHeader>
              <ModalBody>
                <DonateNowComp
                  campaignData={campaignData}
                  isSubmitted={isSubmitted}
                  setSubmitted={() => setIsSubmitted(true)}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CampaignDetailsComponent;
