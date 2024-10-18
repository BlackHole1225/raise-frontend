'use client';
import React from 'react';

const FeedAdvertising = () => {

    return (
        <div className='flex flex-col md:flex-row w-full'>
            <img src='/images/image 51.png' alt='/images/image 51.png' className="w-full md:w-[329px] h-[432px] object-cover" />
            <div className='md:h-[432px] w-full bg-brand-weak-green flex flex-col justify-between'>
                <div className='px-5 py-7 md:py-12 '>
                    <h2 className="text-3xl md:text-4xl 2xl:text-[40px] font-bold tracking-wider uppercase text-brand-olive-green font-heading">
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
