'use client';
import React from 'react';



const FeedAdvertising = () => {
    const hasData = true;
    const imageUrl = 'https://s3-alpha-sig.figma.com/img/0764/0e74/c3cc16c46ebbd2b4a437d37bb8badf18?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=phJVxjm9X8-6Q86ASXWceMIoD~O9nCb0WJdWKXEDX8f71Xgx5Xzo7Wzstem7mGiuDkuhQdM56LgW3AQ41Fya5MYPgObqAylotIy5423sCTb7iYXf5taRMOLI9Ik5cTsUfXnhAQ8verBoHHQ0LfsGUrjhf4i57RZkS~Sv~XoJBNn4UILXefpIWaswZRkm9Wy2ntPDN4TtIMd-RGBptJ-dZuQK882UT-kgTfRS8ihAC8Nl6BiVmjC1pKYRI83Szwx1deFPBLaFTdmXtsVXKCNc--4WK~GtpPM9C9I85SDBs1gz8QNyA6nwaNweaoIbjDMSxMyeUbZ4OTwvHGfrlK2U5w__'
    return (
        <div className='flex w-full'>
            <img src={imageUrl} alt={imageUrl} className="w-[329px] h-[432px] object-cover" />
            <div className='h-[432px] w-full bg-brand-weak-green flex flex-col justify-between'>
                <div className='px-[21px] pt-12 '>
                    <h2 className="text-[40px] font-bold tracking-wider uppercase text-brand-olive-green font-heading">
                        GET started with the Raise Forum
                    </h2>
                    <h2 className="text-[16px] font-bold tracking-wider  text-brand-olive-green font-heading">
                        Our mission is to ensure that these majestic animals continue to thrive in the wild for generations to come.
                    </h2>
                </div>
                <div className='h-[88px] bg-brand-olive-green px-[21px] flex gap-2 items-center'>
                    <img src={'/images/raise.svg'} alt={'/images/raise.svg'} className="w-7 h-7 object-cover" />
                    <h2 className="text-2xl font-bold tracking-wider  text-brand-ivory ">
                        Raise
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default FeedAdvertising;
