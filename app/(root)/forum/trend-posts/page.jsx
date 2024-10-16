'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from "axios";
import { Button } from '@nextui-org/button';
import FeedList from '@/app/(root)/forum/feedList';
import FeedAdvertising from '@/app/(root)/forum/feedAdvertising';
import FeedGetStart from '@/app/(root)/forum/feedGetStart';
import { SERVER_LOCAL_IP } from '@/utils/constants';

const page = () => {
    const [posts, setPosts] = useState([]);
    const getPost = async () => {
        const response = await axios.get(`${SERVER_LOCAL_IP}/api/post/all`);
        setPosts(response.data.Posts)
    }
    useEffect(() => {
        getPost();
    }, [])
    return (
        <div>
            <div>
                <h1 className="uppercase text-5xl font-bold text-brand-dark mb-8 font-heading ">
                    TRENDING POSTS WORLDWIDE
                </h1>
            </div>
            <div className="xl:grid xl:grid-cols-12 gap-8 my-12">
                <div className="xl:col-span-7">
                    <FeedList isPagination={true} feeds={posts} feedfontSize={32} height={205} />
                </div>
                <div className="xl:col-span-5 flex flex-col gap-6 mt-8 xl:mt-0">
                    <div className='xl:flex justify-end hidden'>
                        <Link href='/forum/create-post' passHref>
                            <Button
                                variant="bordered"
                                radius="full"
                                size="lg"
                                className="font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 basis-[10%]"
                            >
                                Create a post
                            </Button>
                        </Link>
                    </div>
                    <FeedAdvertising />
                    <FeedGetStart />
                </div>
            </div>
        </div>
    );
};

export default page;
