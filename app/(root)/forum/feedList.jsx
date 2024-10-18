'use client';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Pagination } from '@nextui-org/pagination';
import apiClient from '@/utils/api';
import { formatTimeAgo } from '@/utils/formartTime';
import { SERVER_LOCAL_IP, SERVER_IP } from '@/utils/constants';
import BrandDropdown from '@/components/ui/brandDropdown';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';

const FeedList = ({ feedfontSize, height, feeds, isPagination, setPosts }) => {

    const [filters, setFilters] = useState({
        category: new Set([]),
        location: new Set([]),
        closeToGoal: new Set([])
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [feed, setFeed] = useState({});
    const [isDelete, setIsDelete] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [categories, setCategories] = useState([]);
    const [userId, setUserId] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                // setLoading(true);
                const [categoriesRes] = await Promise.all([
                    axios.get(`${SERVER_IP}/api/category`),
                    // axios.get(`${SERVER_IP}/api/campaign/category`),
                ]);
                // axios.get(`${SERVER_IP}/api/campaign`)

                setCategories(categoriesRes.data.category || [{ _id: 0, name: 'Popular Donations' },
                { _id: 1, name: 'Popular Donations' },
                { _id: 2, name: 'Popular Donations' },]);
                // console.log(campaignRes.data);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                // setError(error);
                // setLoading(false);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        setUserId(localStorage?.getItem('userID'));
    }, [])
    return (
        <>{isPagination && <div className="flex  flex-wrap md:flex-nowrap justify-between gap-2 md:gap-8 mb-6">
            <Button
                variant="bordered"
                radius="full"
                size="lg"
                className="min-w-36 max-w-36 font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 basis-[40%]"
                startContent={
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.7087 10.0002H7.41283M3.77866 10.0002H2.29199M3.77866 10.0002C3.77866 9.51842 3.97006 9.05635 4.31075 8.71566C4.65144 8.37497 5.11352 8.18357 5.59533 8.18357C6.07714 8.18357 6.53921 8.37497 6.8799 8.71566C7.22059 9.05635 7.41199 9.51842 7.41199 10.0002C7.41199 10.482 7.22059 10.9441 6.8799 11.2848C6.53921 11.6255 6.07714 11.8169 5.59533 11.8169C5.11352 11.8169 4.65144 11.6255 4.31075 11.2848C3.97006 10.9441 3.77866 10.482 3.77866 10.0002ZM17.7087 15.5061H12.9187M12.9187 15.5061C12.9187 15.988 12.7268 16.4506 12.386 16.7914C12.0453 17.1321 11.5831 17.3236 11.1012 17.3236C10.6193 17.3236 10.1573 17.1313 9.81658 16.7906C9.47589 16.45 9.28449 15.9879 9.28449 15.5061M12.9187 15.5061C12.9187 15.0241 12.7268 14.5624 12.386 14.2216C12.0453 13.8808 11.5831 13.6894 11.1012 13.6894C10.6193 13.6894 10.1573 13.8808 9.81658 14.2215C9.47589 14.5622 9.28449 15.0243 9.28449 15.5061M9.28449 15.5061H2.29199M17.7087 4.4944H15.1212M11.487 4.4944H2.29199M11.487 4.4944C11.487 4.01259 11.6784 3.55051 12.0191 3.20982C12.3598 2.86913 12.8218 2.67773 13.3037 2.67773C13.5422 2.67773 13.7785 2.72472 13.9989 2.81602C14.2193 2.90732 14.4195 3.04113 14.5882 3.20982C14.7569 3.37852 14.8907 3.57878 14.982 3.79919C15.0733 4.0196 15.1203 4.25583 15.1203 4.4944C15.1203 4.73297 15.0733 4.9692 14.982 5.18961C14.8907 5.41002 14.7569 5.61028 14.5882 5.77898C14.4195 5.94767 14.2193 6.08149 13.9989 6.17278C13.7785 6.26408 13.5422 6.31107 13.3037 6.31107C12.8218 6.31107 12.3598 6.11967 12.0191 5.77898C11.6784 5.43829 11.487 4.97621 11.487 4.4944Z"
                            stroke="#3D4630"
                            strokeWidth="1.25"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                        />
                    </svg>
                }
            >
                Filters
            </Button>
            <div className="basis-[20%]">
                <BrandDropdown
                    label="Category"
                    data={categories.map((cat) => ({ key: cat._id, label: cat.name }))}
                    icon={
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.89584 9.16667C6.57639 9.16667 6.33667 9.02417 6.17667 8.73917C6.01667 8.45417 6.02028 8.17306 6.1875 7.89583L9.29167 2.83333C9.45834 2.56944 9.69445 2.4375 10 2.4375C10.3056 2.4375 10.5417 2.56944 10.7083 2.83333L13.8125 7.89583C13.9792 8.17361 13.9828 8.455 13.8233 8.74C13.6639 9.025 13.4242 9.16722 13.1042 9.16667H6.89584ZM14.5833 18.3333C13.5417 18.3333 12.6561 17.9686 11.9267 17.2392C11.1972 16.5097 10.8328 15.6244 10.8333 14.5833C10.8333 13.5417 11.1981 12.6561 11.9275 11.9267C12.6569 11.1972 13.5422 10.8328 14.5833 10.8333C15.625 10.8333 16.5106 11.1981 17.24 11.9275C17.9694 12.6569 18.3339 13.5422 18.3333 14.5833C18.3333 15.625 17.9686 16.5106 17.2392 17.24C16.5097 17.9694 15.6244 18.3339 14.5833 18.3333ZM3.33334 17.9167C3.09723 17.9167 2.89917 17.8367 2.73917 17.6767C2.57917 17.5167 2.49945 17.3189 2.5 17.0833V12.0833C2.5 11.8472 2.58 11.6492 2.74 11.4892C2.9 11.3292 3.09778 11.2494 3.33334 11.25H8.33334C8.56945 11.25 8.7675 11.33 8.9275 11.49C9.0875 11.65 9.16723 11.8478 9.16667 12.0833V17.0833C9.16667 17.3194 9.08667 17.5175 8.92667 17.6775C8.76667 17.8375 8.56889 17.9172 8.33334 17.9167H3.33334Z"
                                fill="#3D4630"
                            />
                        </svg>
                    }
                    onSelectionChange={(keys) => handleFilterChange('category', keys)}
                />
            </div>
            <Input
                startContent={
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z"
                            stroke="#3D4630"
                            strokeWidth="2"
                        />
                        <path d="M20 20L17 17" stroke="#3D4630" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                }
                size="lg"
                variant="bordered"
                placeholder="Search"
                radius="full"
                classNames={{
                    inputWrapper: 'border-brand-olive-green'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>}
            {isDelete && <DeletePost key={feed._id} height={height} fontSize={feedfontSize} isDelete={isDelete} setIsDelete={setIsDelete} feed={feed} setPosts={setPosts} />}
            {paginatedFeeds?.length ? (<>
                <section className="flex flex-col gap-6">
                    {paginatedFeeds.map((feed, index) => (
                        <FeedItem
                            key={index}
                            setFeed={setFeed}
                            feed={feed}
                            height={height}
                            userId={userId}
                            setIsDelete={setIsDelete}
                            comments={10}
                            fontSize={feedfontSize}
                            onClick
                            imageUrl={feed?.file ? `${feed?.file}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
                            reporterPhoto={feed?.poster ? `${feed?.poster.avatar}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
                        />
                    ))}
                </section>
                <div className="flex justify-end mt-8">
                    {isPagination && (<Pagination
                        total={totalPages}
                        initialPage={1}
                        page={currentPage}
                        onChange={setCurrentPage}
                        size="lg"
                        classNames={{
                            item: '!rounded-none border border-brand-olive-green bg-transparent hover:!bg-transparent',
                            cursor: '!rounded-none bg-brand-olive-green'
                        }}
                    />)}
                </div>
            </>
            ) : (
                <div className="border border-dashed border-brand-dark border-opacity-50 rounded-xl h-full flex flex-col gap-0 items-center justify-center">
                    <h4 className="uppercase text-3xl font-bold text-brand-dark font-heading">
                        Nothing to show here{' '}
                    </h4>
                    <p>You have not created any posts yet.</p>
                    <Link href='/forum/create-post' passHref>
                        <Button
                            variant="bordered"
                            radius="full"
                            size="lg"
                            className="font-medium text-brand-olive-green border-brand-olive-green mt-3 "
                        >
                            Create a post now
                        </Button>
                    </Link>
                </div>
            )
            }
        </>
    );
};
const FeedItem = ({ userId, feed, setIsDelete, setFeed, imageUrl, fontSize, reporterPhoto, reporterName, height }) => {
    return (
        <article className="flex">
            <img src={imageUrl || 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'} alt={imageUrl} className="w-[100px] md:w-[260px] min-w-[100px] md:min-w-[260px] object-cover" style={{ height }} />
            <div className="flex flex-col bg-[#FAFF7D] pt-[30px] px-[22px] w-full pb-6 justify-between">
                <Link href={`/forum/${feed._id}`}>
                    <h2 className=" font-bold tracking-wider uppercase text-brand-olive-green font-heading" style={{ fontSize: fontSize }}>
                        {feed.title}
                    </h2>
                </Link>
                <div className=' '>
                    <div className='flex  flex-wrap md:flex-nowrap gap-1 md:gap-2 pb-2 items-center'>
                        <p className="text-base font-bold  tracking-wider text-brand-olive-green">{feed.comments.length} Comments</p>
                        <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.7" cx="2.5" cy="2.5" r="2.5" fill="#25282B" />
                        </svg>
                        <p className="text-base font-bold  tracking-wider text-brand-olive-green">{feed.votes || 0} Votes</p>
                        <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.7" cx="2.5" cy="2.5" r="2.5" fill="#25282B" />
                        </svg>
                        <p className="text-base font-bold  tracking-wider text-brand-olive-green">{formatTimeAgo(feed.createdAt)} </p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                            <img src={reporterPhoto} alt={reporterPhoto} className="w-[34px]  min-w-[34px] h-[28px] min-h-[28px] object-cover rounded-lg" />
                            <p className="text-base font-bold tracking-wider text-brand-dark">{reporterName}</p>
                        </div>
                        {userId === feed.poster._id && (<div className='flex gap-2'>
                            <Button
                                variant="bordered"
                                radius="full"
                                size="lg"
                                onClick={() => {
                                    setFeed(feed)
                                    setIsDelete(true)
                                }}
                                className="px-0 min-w-16 md:min-w-24 font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 basis-[10%]"
                            >
                                Delete
                            </Button>
                            <Link href={`/forum/edit-post/${feed._id}`} passHref>
                                <Button
                                    variant="bordered"
                                    radius="full"
                                    size="lg"
                                    className="px-0 min-w-16 md:min-w-24 font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 basis-[10%]"
                                >
                                    Edit
                                </Button>
                            </Link>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
const FeedItem2 = ({ title, id, comments, votes, imageUrl, fontSize, accessTime, reporterPhoto, reporterName, height }) => (
    <article className="flex">
        <img src={imageUrl || 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'} alt={imageUrl} className="w-[100px] md:w-[260px] object-cover" style={{ height }} />
        <div className="flex flex-col bg-opacity-60 bg-brand-olive-green pt-[30px] px-[22px] w-full pb-6 justify-between">
            <Link href={`/forum/${id}`}>
                <h2 className=" font-bold tracking-wider uppercase  text-brand-olive-green font-heading" style={{ fontSize: fontSize }}>
                    {title}
                </h2>
            </Link>
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
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <img src={reporterPhoto} alt={reporterPhoto} className="w-[34px] h-[28px] object-cover rounded-lg" />
                        <p className="text-base font-bold tracking-wider text-brand-dark">{reporterName}</p>
                    </div>
                </div>

            </div>

        </div>

    </article>
);
const DeletePost = ({ setIsDelete, feed, height, feedfontSize, setPosts }) => {
    const deletePost = async (id) => {
        await apiClient.delete(`/api/post/delete/${id}`)
        setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
    }
    return (
        <Modal
            isOpen={true}
            onOpenChange={() => setIsDelete(false)}
            size="4xl"
            classNames={{
                base: 'rounded-none bg-brand-lemon-yellow py-4 px-2',
                closeButton: 'top-2.5 right-2.5 hover:bg-brand-transparent'
            }}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 heading-2 text-brand-olive-green">
                            Are you sure you want to delete this Post?
                        </ModalHeader>
                        <ModalBody>
                            <FeedItem2
                                height={height}
                                setIsDelete={() => { }}
                                title={feed.title}
                                id={feed._id}
                                comments={10}
                                votes={feed.votes}
                                accessTime={feed.accessTime}
                                fontSize={feedfontSize}
                                imageUrl={feed?.file ? `${feed?.file}` : 'https://s3-alpha-sig.figma.com/img/69b4/9b7c/bea611754ba89c8c84900d1625376b57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WOrJ-rrwSA2dmaFOhbmf992ZTzm-JobuwQTbSJP7956dI2OOU1Gp999WJrjzlKtP8s1XhEZE4glIT3BHMF5n-cU0FVDLnX7pIsPB~pXbeknvTw4lIJjWSVwuGi4~6AUfBcTPi6NmNe2SDe52GkC9t0NspSOcNwkndeWaxS16o9WiQSVbLxMXQZw4iDrgHgNg8~JxThQeHk6aIjnHY5yQl8QHg6BFXZtxO8wUY0o~1Y2IVdEN1JDhsXkgur1V2ElagdCKQ7lJhp9gSNsyxZh-pBVtpziF89wKD7kMCaeNNLPPLpOpb~DDkofjJBi4w9uCuaW262W0Nc5HYn587ih10Q__'}
                                reporterPhoto="https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant="bordered"
                                radius="full"
                                size="lg"
                                onClick={() => setIsDelete(false)}
                                className="font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 basis-[10%]"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="bordered"
                                radius="full"
                                size="lg"
                                className="font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 basis-[10%]"
                                onClick={() => {
                                    setIsDelete(false)
                                    deletePost(feed._id)
                                }}
                            >
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
export default FeedList;
