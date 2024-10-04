'use client';
import React from 'react';
import Link from 'next/link';
import FeedList from './feedList';
// import DonationListComponent from './donationList';
// import CampaignListComponent from '../../other/CampaignListComponent';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';

import BrandDropdown from '@/components/ui/brandDropdown';
import FeedAdvertising from './feedAdvertising';
import FeedGetStart from './feedGetStart';
import { SERVER_LOCAL_IP } from '@/utils/constants';
import axios from "axios";
const page = () => {
    const hasData = true;
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: new Set([]),
        location: new Set([]),
        closeToGoal: new Set([])
    });

    const handleFilterChange = (filterType, selectedKeys) => {
        setFilters((prev) => ({ ...prev, [filterType]: new Set(selectedKeys) }));
    };
    const getPost = async () => {
        const response = await axios.get(`${SERVER_LOCAL_IP}/api/post/all`);
        setPosts(response.data.Posts)
    }
    // Filter and search campaigns
    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesCategory =
                filters.category.size === 0 || filters.category.has(post.categoryId);
            const matchesLocation =
                filters.location.size === 0 || filters.location.has(post.countryId);
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesLocation && matchesSearch;
        });
    }, [filters, searchTerm, posts]);

    useEffect(() => {
        getPost();
    }, [])
    return (
        <div>
            <div>
                <h1 className="uppercase text-5xl font-bold text-brand-dark mb-8 font-heading ">
                    Recent feeds just for you!
                </h1>
                <div className='flex justify-between items-center my-12'>
                    <div className="flex gap-8 ">
                        <Button
                            variant="bordered"
                            radius="full"
                            size="lg"
                            className="font-medium text-brand-olive-green border-brand-olive-green xl:py-6 xl:px-7 basis-[40%]"
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
                    </div>
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

            </div>
            <div className="grid grid-cols-12 gap-8 my-12">
                <div className="col-span-7">
                    <FeedList feeds={posts} feedfontSize={32} height={205} />
                </div>
                <div className="col-span-5 flex flex-col  gap-6">
                    <FeedAdvertising />
                    <FeedGetStart />
                </div>
            </div>
        </div>
    );
};

export default page;
