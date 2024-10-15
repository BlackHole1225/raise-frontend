'use client';
import React from 'react';
import Link from 'next/link';
import FeedList from '@/app/(root)/forum/feedList';
import { Button } from '@nextui-org/button';
import { useState, useEffect } from 'react';
// import { SERVER_LOCAL_IP } from '@/utils/constants';
// import axios from "axios";
import apiClient from '@/utils/api';
import FeedAdvertising from '@/app/(root)/forum/feedAdvertising';
import FeedGetStart from '@/app/(root)/forum/feedGetStart';
const page = () => {
    const [posts, setPosts] = useState([]);
    const getPosts = async () => {
        const response = await apiClient.get(`/api/post/all/user`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        setPosts(response.data.Posts)
    }
    useEffect(() => {
        getPosts();
    }, [])
    return (
        <div>
            <div>
                <h1 className="uppercase text-5xl font-bold text-brand-dark mb-8 font-heading">
                    Posts created by you
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
