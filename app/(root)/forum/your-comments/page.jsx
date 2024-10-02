'use client';
import React from 'react';
import FeedGetStart from "../feedGetStart";
import FeedList from '../feedList';
import { Button } from '@nextui-org/button';
import FeedComments from '../[id]/comments';

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
           
            <FeedComments />
        </div>
        <div className="col-span-5 flex flex-col  gap-6">
            <FeedGetStart />
            <FeedList feedfontSize={24} height={168} />
        </div>
    </div>)
}