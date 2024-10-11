'use client';
import React from 'react';
import FeedGetStart from "../feedGetStart";
import FeedComments from '../[id]/comments';
import FeedList2 from '../feedList2';

export default function Page() {
    return (<div className="grid grid-cols-12 gap-8 my-12">
        <div className="col-span-7 overflow-auto h-screen scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-600 pr-1">
            <FeedComments />
        </div>
        <div className="col-span-5 flex flex-col  gap-6">
            <FeedGetStart />
            <FeedList2/>
        </div>
    </div>)
}