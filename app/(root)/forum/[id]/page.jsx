'use client';
import React from 'react';
import FeedGetStart from "../feedGetStart";
import FeedList from '../feedList';
import { Button } from '@nextui-org/button';
import FeedComments from './comments';
import { useState, useEffect } from 'react';
import { SERVER_IP, SERVER_LOCAL_IP } from '@/utils/constants';

export default function Page() {
    const [isReply, setIsReply] = useState(false);
    const [post, setPost] = useState([]);
    const getPosts = async () => {
        const response = await axios.get(`${SERVER_LOCAL_IP}/api/post/get`);
        setPost(response.data.Post)
    }
    useEffect(() => {
        getPosts();
    }, [])
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
                        onClick={() => { setIsReply(true), setIsOpen(false) }}
                        variant="bordered"
                        radius="full"
                        size="lg"
                        className="font-bold text-brand-olive-green border-brand-olive-green  xl:py-6 xl:px-7"
                        startContent={
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.90078 1.63722C2.6223 1.63722 2.35523 1.74784 2.15832 1.94476C1.96141 2.14167 1.85078 2.40874 1.85078 2.68722V6.88722C1.85078 7.1657 1.96141 7.43277 2.15832 7.62968C2.35523 7.82659 2.6223 7.93722 2.90078 7.93722H3.95078V9.05722L5.39768 8.03382L5.53348 7.93722H9.90078C10.1793 7.93722 10.4463 7.82659 10.6432 7.62968C10.8402 7.43277 10.9508 7.1657 10.9508 6.88722V2.68722C10.9508 2.40874 10.8402 2.14167 10.6432 1.94476C10.4463 1.74784 10.1793 1.63722 9.90078 1.63722H2.90078ZM0.800781 2.68722C0.800781 2.13026 1.02203 1.59612 1.41586 1.20229C1.80968 0.808469 2.34383 0.587219 2.90078 0.587219H9.90078C10.4577 0.587219 10.9919 0.808469 11.3857 1.20229C11.7795 1.59612 12.0008 2.13026 12.0008 2.68722V6.88722C12.0008 7.44417 11.7795 7.97832 11.3857 8.37214C10.9919 8.76597 10.4577 8.98722 9.90078 8.98722H5.86808L3.72888 10.5006L2.90078 11.0872V8.98722C2.34383 8.98722 1.80968 8.76597 1.41586 8.37214C1.02203 7.97832 0.800781 7.44417 0.800781 6.88722L0.800781 2.68722Z" fill="black" />
                            </svg>
                        }
                    >
                        Reply
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
            {isReply && <div className='py-5 px-4 relative  border border-brand-dark rounded-2xl ml-4 mb-[24px] mt-[-16px]' onClick={() => setIsOpen(false)}>
                <textarea className='w-full outline-none border-none resize-none' placeholder='Type something here....'></textarea>
                <div className="absolute right-3 bottom-3 flex gap-2">
                    <Button
                        onClick={() => setIsReply(false)}
                        variant="bordered"
                        radius="full"
                        size="sm"
                        className="font-bold text-brand-olive-green border-brand-olive-green h-[30px] "
                        startContent={
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.55316 0.851094L3.70211 3.70215M3.70211 3.70215L0.851055 6.5532M3.70211 3.70215L0.851055 0.851094M3.70211 3.70215L6.55316 6.5532" stroke="#25282B" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        }
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="bordered"
                        radius="full"
                        size="sm"
                        className="font-bold text-brand-olive-green border-brand-olive-green h-[30px] "
                        startContent={
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.90469 1.93965C2.62621 1.93965 2.35914 2.05027 2.16223 2.24719C1.96531 2.4441 1.85469 2.71117 1.85469 2.98965V7.18965C1.85469 7.46813 1.96531 7.7352 2.16223 7.93211C2.35914 8.12902 2.62621 8.23965 2.90469 8.23965H3.95469V9.35965L5.40159 8.33625L5.53739 8.23965H9.90469C10.1832 8.23965 10.4502 8.12902 10.6472 7.93211C10.8441 7.7352 10.9547 7.46813 10.9547 7.18965V2.98965C10.9547 2.71117 10.8441 2.4441 10.6472 2.24719C10.4502 2.05027 10.1832 1.93965 9.90469 1.93965H2.90469ZM0.804688 2.98965C0.804688 2.43269 1.02594 1.89855 1.41976 1.50472C1.81359 1.1109 2.34773 0.889648 2.90469 0.889648H9.90469C10.4616 0.889648 10.9958 1.1109 11.3896 1.50472C11.7834 1.89855 12.0047 2.43269 12.0047 2.98965V7.18965C12.0047 7.7466 11.7834 8.28075 11.3896 8.67457C10.9958 9.0684 10.4616 9.28965 9.90469 9.28965H5.87199L3.73279 10.803L2.90469 11.3896V9.28965C2.34773 9.28965 1.81359 9.0684 1.41976 8.67457C1.02594 8.28075 0.804688 7.7466 0.804688 7.18965L0.804688 2.98965Z" fill="#25282B" />
                            </svg>
                        }
                    >
                        Comment
                    </Button>
                </div>
            </div>}
            <FeedComments />
        </div>
        <div className="col-span-5 flex flex-col  gap-6">
            <FeedGetStart />
            {/* <FeedList feedfontSize={24} height={168} /> */}
        </div>
    </div>)
}