'use client';
import React from 'react';
import FeedAdvertising from "../feedAdvertising";
import FeedGetStart from "../feedGetStart";
import FeedComments from '../[id]/comments';
import FeedList from '../feedList';
import { useState, useEffect } from 'react';
import apiClient from '@/utils/api';
import Link from 'next/link';
import { Button } from '@nextui-org/button';



export default function Page() {
    const [posts, setPosts] = useState([]);
    const getPosts = async () => {
        const response = await apiClient.get(`/api/post/commented`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
        setPosts(response.data.Posts);
    }
    useEffect(() => {
        getPosts();
    }, [])
    return (<div className="grid grid-cols-12 gap-8 my-12">
        <div className="col-span-7">
            <FeedList isPagination={true} feeds={posts} feedfontSize={32} height={205} isPagination={true} />
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
    </div>)
}