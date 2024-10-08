'use client';
import React from 'react';
import Link from 'next/link';
import FeedList from './feedList';
import { Button } from '@nextui-org/button';
import { useState, useEffect } from 'react';
import FeedAdvertising from './feedAdvertising';
import FeedGetStart from './feedGetStart';
import { SERVER_LOCAL_IP, SERVER_IP } from '@/utils/constants';
import axios from "axios";
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
                    Recent feeds just for you!
                </h1>
            </div>
            <div className="grid grid-cols-12 gap-8 my-12">
                <div className="col-span-7">
                    <FeedList isPagination={true} setPosts={setPosts} feeds={posts} feedfontSize={32} height={205} />
                </div>
                <div className="col-span-5 flex flex-col  gap-6">
                    <div className='flex justify-between   flex-row-reverse'>

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
