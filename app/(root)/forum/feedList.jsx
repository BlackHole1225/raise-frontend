'use client';
import React from 'react';

import { Button } from '@nextui-org/button';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { Pagination } from '@nextui-org/pagination';

import axios from 'axios';
import Link from 'next/link';
const FeedList = ({ feedfontSize, height, feeds }) => {
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [filters, setFilters] = useState({
        category: new Set([]),
        location: new Set([]),
        closeToGoal: new Set([])
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // const hasData = true;
    const filteredFeeds = useMemo(() => {
        return feeds.filter((feed) => {
            const matchesCategory =
                filters.category.size === 0 || filters.category.has(feed.categoryId);
            const matchesLocation =
                filters.location.size === 0 || filters.location.has(feed.countryId);
            const matchesSearch = feed.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesLocation && matchesSearch;
        });
    }, [filters, searchTerm, feeds]);
    const storedFeeds = useMemo(() => {
        return [...filteredFeeds].sort((a, b) => {
            const aProgress = a.totalAmount / a.amount;
            const bProgress = b.totalAmount / b.amount;
            return bProgress - aProgress;
        });
    }, [filteredFeeds]);

    // Paginate campaigns
    const paginatedFeeds = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return storedFeeds.slice(startIndex, startIndex + itemsPerPage);
    }, [storedFeeds, currentPage]);

    const totalPages = Math.ceil(storedFeeds.length / itemsPerPage);

    const handleFilterChange = (filterType, selectedKeys) => {
        setFilters((prev) => ({ ...prev, [filterType]: new Set(selectedKeys) }));
    };
    return (
        <>
            {paginatedFeeds?.length ? (<>
                <section className="flex flex-col gap-6">
                    {paginatedFeeds.map((feed, index) => (
                        <Link href={`/forum/${feed._id}`}>
                            <FeedItem
                                height={height}
                                title={feed.title}
                                comments={10}
                                votes={5}
                                accessTime={10}
                                fontSize={feedfontSize}
                                onClick
                                imageUrl="https://s3-alpha-sig.figma.com/img/55a2/582c/74201026b0fe42f528e1e3709ed824b7?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WFCJt36rlhoxY4vHrBoECck4ErKYZLBJBLhOF2t02Gg3vVHX1fOSEW9tRfUpj5T3rP7lFe6Ms1lRGCssdIUYCzVE85hrs~tsoZcBYEAilsSPwlgZUk45aMfs5KROGKFxjwHVqIANFz~pOThvT6zQojzJGQ1MDxPcA6zAm-Yb~TxlfbG9GGVqV2xliF69l~VTRwioRy9FVeAB7bRw7QyBLHcvAh~sJifKxnUSXzLB7EnMdGxiM8Mo7WwQxHq~wPRbKWN36MHkEI9524B~1lu5YuKLIfJ6qB4QKj2kTHvda0zVw-37Hi5GG2f44CTdXxszAsp6SxgA9pF31Tsa~3Hf0A__"
                                reporterPhoto="https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__"
                            />
                        </Link>

                    ))}
                </section>
                <div className="flex justify-end mt-8">
                    <Pagination
                        total={totalPages}
                        initialPage={1}
                        page={currentPage}
                        onChange={setCurrentPage}
                        size="lg"
                        classNames={{
                            item: '!rounded-none border border-brand-olive-green bg-transparent hover:!bg-transparent',
                            cursor: '!rounded-none bg-brand-olive-green'
                        }}
                    />
                </div>
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
        <img src={imageUrl} alt={imageUrl} className="w-[260px] object-cover" style={{ height }} />
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
export default FeedList;
