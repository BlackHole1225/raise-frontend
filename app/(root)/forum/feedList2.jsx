'use client';
import React from 'react';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { Pagination } from '@nextui-org/pagination';
import { SERVER_LOCAL_IP, SERVER_IP } from '@/utils/constants';
import BrandDropdown from '@/components/ui/brandDropdown';

import axios from 'axios';
import Link from 'next/link';
const FeedList2 = () => {
    const [posts, setPosts] = useState([]);
    const feedfontSize = 24;
    const height = 168;
    const getPost = async () => {
        const response = await axios.get(`${SERVER_LOCAL_IP}/api/post/all`);
        setPosts(response.data.Posts)
    }
    useEffect(() => {
        getPost();
    }, [])
    // const hasData = true;
    return (
        <>
            {posts?.length ? (<>
                <section className="flex flex-col gap-6">
                    {posts.slice(0,3).map((feed, index) => (
                        <Link href={`/forum/${feed._id}`}>
                            <FeedItem
                                height={height}
                                title={feed.title}
                                comments={10}
                                votes={feed.votes}
                                accessTime={feed.accessTime}
                                fontSize={feedfontSize}
                                onClick
                                imageUrl={feed?.file ? `${SERVER_LOCAL_IP}/api/file/download/${feed?.file}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
                                reporterPhoto="https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__"
                            />
                        </Link>

                    ))}
                </section>
            </>
            ) : (
                <div className="border border-dashed border-brand-dark border-opacity-50 rounded-xl h-full flex flex-col gap-0 items-center justify-center">
                    <h4 className="uppercase text-3xl font-bold text-brand-dark font-heading">
                        Nothing to show here{' '}
                    </h4>
                    <p>You have not created any posts yet.</p>
                    <Button
                        variant="bordered"
                        radius="full"
                        size="lg"
                        className="font-medium text-brand-olive-green border-brand-olive-green mt-3 "
                    >
                        Create a post now
                    </Button>
                </div>
            )
            }
        </>
    );
};
const FeedItem = ({ title, comments, votes, imageUrl, fontSize, accessTime, reporterPhoto, reporterName, height }) => (
    <article className="flex">
        <img src={imageUrl || 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'} alt={imageUrl} className="w-[260px] object-cover" style={{ height }} />
        <div className="flex flex-col bg-[#FAFF7D] pt-[30px] px-[22px] w-full pb-6 justify-between">
            <h2 className=" font-bold tracking-wider uppercase text-brand-olive-green font-heading" style={{ fontSize: fontSize }}>
                {title}
            </h2>
            <div className=' '>
                <div className='flex gap-2 pb-2 items-center'>
                    <p className="text-base font-bold  tracking-wider text-brand-olive-green">{comments}Comments</p>
                    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.7" cx="2.5" cy="2.5" r="2.5" fill="#25282B" />
                    </svg>
                    <p className="text-base font-bold  tracking-wider text-brand-olive-green">{votes}Votes</p>
                    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.7" cx="2.5" cy="2.5" r="2.5" fill="#25282B" />
                    </svg>
                    <p className="text-base font-bold  tracking-wider text-brand-olive-green">{accessTime}min ago</p>
                </div>
                <div className='flex gap-2'>
                    <img src={reporterPhoto} alt={reporterPhoto} className="w-[34px] h-[28px] object-cover rounded-lg" />
                    <p className="text-base font-bold tracking-wider text-brand-dark">{reporterName}</p>
                </div>
            </div>

        </div>

    </article>
);
export default FeedList2;
