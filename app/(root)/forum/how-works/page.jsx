'use client';
import React from 'react';
import FeedGetStart from "../feedGetStart";
import FeedList from '../feedList';
import { Button } from '@nextui-org/button';
import axios from "axios";
import { useState, useEffect } from 'react';

import { SERVER_IP, SERVER_LOCAL_IP } from '@/utils/constants';
export default function Page() {
    const [posts, setPosts] = useState([]);
    const getPost = async () => {
        const response = await axios.get(`${SERVER_LOCAL_IP}/api/post/all`);
        setPosts(response.data.Posts)
    }
    useEffect(() => {
        getPost();
    }, [])
    const data = {
        title: 'About Raise forum and how it works?',
        summary: "Raise Forum is your gateway to participating in the future of crowdfunding on Web3. Here's how you can get involved:",
        contents: [
            {
                subTitle: "Sign Up & Join the Community",
                subContent: "Start by creating an account on Raise Forum. Our platform is designed for both project creators and supporters. Once you're registered, you'll have access to a wealth of information, discussions, and resources. "
            },
            {
                subTitle: "Discover Innovative Projects",
                subContent: "Browse through a curated list of crowdfunding projects powered by the Raise ecosystem. Whether you're interested in supporting new startups, innovative tech, or creative endeavors, you'll find projects that align with your passions."
            },
            {
                subTitle: "Engage with Creators",
                subContent: "Join discussions, ask questions, and provide feedback directly to project creators. The Raise Forum allows for transparent communication, ensuring that you can engage with creators and understand the vision behind each project."
            },
            {
                subTitle: "Support & Invest",
                subContent: "Once you've found a project you believe in, you can contribute directly through the platform. Raise leverages the power of Web3, enabling secure, transparent transactions using blockchain technology."
            },

            {
                subTitle: "Stay Updated",
                subContent: "Keep track of project milestones and updates through the forum. Our platform ensures that you're always in the loop, with real-time notifications and detailed progress reports."
            },
        ]
    };
    return (<div className="grid grid-cols-12 gap-8 my-12">
        <div className='col-span-7'>
            <h1 className="uppercase text-5xl font-bold text-brand-dark mb-8 font-heading">
                {data.title}
            </h1>
            <p className="text-2xl font-bold text-brand-dark mb-8 text-opacity-70 font-heading">
                {data.summary}
            </p>
            {data.contents?.map((content, index) => (
                <div className='ml-1'>
                    <p className="text-2xl font-bold text-black text-opacity-70 font-heading">
                        {index+1+". "+ content.subTitle}
                    </p>
                    <p className="text-2xl font-bold text-brand-dark mb-7 text-opacity-70 font-heading ml-4">
                        {content.subContent}
                    </p>
                </div>
            ))}

        </div>
        <div className="col-span-5 flex flex-col  gap-6">
            <FeedGetStart />
            <FeedList feeds={posts} feedfontSize={24} height={168} />
        </div>
    </div>)
}