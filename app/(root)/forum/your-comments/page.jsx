'use client';
import React from 'react';
import FeedAdvertising from "@/app/(root)/forum/feedAdvertising";
import FeedGetStart from "@/app/(root)/forum/feedGetStart";
import FeedList from '@/app/(root)/forum/feedList';
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
    return (<div className="xl:grid xl:grid-cols-12 flex flex-col gap-6 my-8 xl:mt-0">
        <div className="col-span-7">
            <FeedList isPagination={true} feeds={posts} feedfontSize={32} height={205} />
        </div>
        <div className="col-span-5 flex flex-col gap-6">
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