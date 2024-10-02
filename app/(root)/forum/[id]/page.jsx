'use client';
import React from 'react';
import FeedGetStart from "../feedGetStart";
import FeedList from '../feedList';
import { Button } from '@nextui-org/button';
import FeedComments from './comments';

export default function Page() {
    const feed = {
        title: 'Firefighters saved the girl from a burning house.',
        reporterName: 'Diana Roobert',
        reporterCountry: 'England',
        imageUrl: 'https://s3-alpha-sig.figma.com/img/c16b/542d/e5fa8b0de5e8ddcbdf415a920651cd28?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W9gzZeOdAgk5r97KZ7DQoRkO1p47sBZ6egzGg8TxFNAfqWyfy6v0y4FvrrPIqrfnCYM55Oe2F-aaby2WspFy7Kknyl7XdVLXxA7w~Jm-9xKBRIbatW8uK~kSnHKBrynKQd7FgfI6JHzMhqAWjknQrIKT4V6eIAnYnkV-tEegOVcBIjbipwuwzlxT2gRddi8iNZ7wtpFBj1BPTY1qFalVkp6FweCp9LtnmzIpb6pPMvNAGCX9wT8jRAz~NRjmO2VgHS2mYqMEpseDIQjRgEM999U8BVoV2aJyGpqBb1HUy8jDHLR9salkT1IsJGcG2Hs5ZrQFnF4emYoGLWtr2b5AXQ__',
        description: 'Connor and I are so grateful to have shared a snippet of life with you. We love you so. Care and condolences to Matt and your family.',
        reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__"
    };
    return (<div className="grid grid-cols-12 gap-8 my-12">
        <div className="col-span-7 overflow-auto h-screen scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-600 pr-1">
            <h1 className="uppercase text-5xl font-bold text-brand-dark mb-8 font-heading">
                {feed.title}
            </h1>
            <img src={feed.imageUrl} alt={feed.imageUrl} className="w-full object-cover" />
            <p className="text-[24px] font-bold tracking-wider  text-brand-olive-green font-heading mt-8 mb-10">
                {feed.description}
            </p>
            <div className='flex justify-between items-center my-12'>
                <div className='flex gap-2'>
                    <img src={feed.reporterPhoto} alt={feed.reporterPhoto} className="w-[50px] h-[50px] object-cover rounded-full" />
                    <div className='flex flex-col '>
                        <h2 className=" font-bold text-2xl tracking-wider uppercase text-brand-olive-green font-heading" >
                            {feed.reporterName}
                        </h2>
                        <p className="text-base font-bold tracking-wider text-brand-olive-green flex items-center gap-1">Owner
                            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle opacity="0.7" cx="2.5" cy="2.5" r="2.5" fill="#25282B" />
                            </svg>
                            {feed.reporterCountry}</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <Button
                        variant="bordered"
                        radius="full"
                        size="lg"
                        className="font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 "
                        startContent={
                            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg" className='pb-[2px] border-b-1 border-[black]'>
                                <path d="M4.75 11.615V11.865H5H6H6.25V11.615V3.48573L8.94239 6.17295L9.11904 6.34926L9.29565 6.1729L9.98465 5.4849L10.1617 5.30813L9.98478 5.13122L5.67678 0.823223L5.5 0.646447L5.32322 0.823223L1.01522 5.13122L0.838447 5.308L1.01522 5.48478L1.70322 6.17278L1.8798 6.34935L2.05658 6.17298L4.75 3.4856V11.615Z" fill="black" stroke="black" stroke-width="0.5" />
                            </svg>

                        }
                    >
                        Upvote
                    </Button>
                    <Button
                        variant="bordered"
                        radius="full"
                        size="lg"
                        className="font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 "
                        startContent={
                            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg" className='pt-[2px] border-t-1 border-[black]'>
                                <path d="M6.25 3.385V3.135H6L5 3.135H4.75V3.385L4.75 11.5143L2.05761 8.82705L1.88096 8.65074L1.70435 8.8271L1.01535 9.5151L0.838318 9.69187L1.01522 9.86878L5.32322 14.1768L5.5 14.3536L5.67678 14.1768L9.98478 9.86878L10.1616 9.692L9.98478 9.51522L9.29678 8.82722L9.1202 8.65065L8.94342 8.82702L6.25 11.5144L6.25 3.385Z" fill="black" stroke="black" stroke-width="0.5" />
                            </svg>

                        }
                    >
                        Downvote
                    </Button>
                    <Button
                        variant="bordered"
                        radius="full"
                        size="lg"
                        className="font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 "
                        startContent={
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1_2588)">
                                    <path d="M8 0.0998535V3.29985C1.6 3.29985 0 6.57985 0 11.2999C0.832 8.13185 3.2 6.49985 6.4 6.49985H8V9.69985L12.8 4.64385L8 0.0998535Z" fill="#25282B" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_2588">
                                        <rect width="12.8" height="12.8" fill="white" transform="translate(0 0.0999756)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        }
                    >
                        Share
                    </Button>
                </div>

            </div>
            <FeedComments />
        </div>
        <div className="col-span-5 flex flex-col  gap-6">
            <FeedGetStart />
            {/* <FeedList feedfontSize={24} height={168} /> */}
        </div>
    </div>)
}