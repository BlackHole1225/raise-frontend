'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation'
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import BrandDropdown from '@/components/ui/brandDropdown';
// data/blogTree.js
import styles from './blogTree.module.css';
import CreateComments from './createComments';
import { usePostContext } from './page';
import { SERVER_LOCAL_IP } from '@/utils/constants';
import { formatTimeAgo } from '@/utils/formartTime';

// Flat list of blog data
const blogData = [
    { _id: 1, accessTime: 10, votes: 30, reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__", reporterName: 'Lara Peterson', parentId: null, description: 'The fundraiser, if there is one, has a communications, marketing, events, or sales background. They get by on events, grants, government funding or service contracts, a few sponsorships, and luck.' },
    { _id: 2, accessTime: 10, votes: 30, reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__", reporterName: 'Lara Peterson', parentId: 1 },
    { _id: 3, accessTime: 10, votes: 30, reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__", reporterName: 'Lara Peterson', parentId: 2, description: 'The fundraiser, if there is one, has a communications, marketing, events, or sales background. They get by on events, grants, government funding or service contracts, a few sponsorships, and luck.' },
    { _id: 4, accessTime: 10, votes: 30, reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__", reporterName: 'Lara Peterson', parentId: 1 },
    { _id: 5, accessTime: 10, votes: 30, reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__", reporterName: 'Lara Peterson', parentId: 4, description: 'The fundraiser, if there is one, has a communications, marketing, events, or sales background. They get by on events, grants, government funding or service contracts, a few sponsorships, and luck.' },
    { _id: 6, accessTime: 10, votes: 30, reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__", reporterName: 'Lara Peterson', parentId: null },
    { _id: 7, accessTime: 10, votes: 30, reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__", reporterName: 'Lara Peterson', parentId: 6 },
    { _id: 8, accessTime: 10, votes: 30, reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__", reporterName: 'Lara Peterson', parentId: 7, description: 'The fundraiser, if there is one, has a communications, marketing, events, or sales background. They get by on events, grants, government funding or service contracts, a few sponsorships, and luck.' },
    { _id: 9, accessTime: 10, votes: 30, reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__", reporterName: 'Lara Peterson', parentId: 6 },
    { _id: 10, accessTime: 10, votes: 30, reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__", reporterName: 'Lara Peterson', parentId: 9, description: 'The fundraiser, if there is one, has a communications, marketing, events, or sales background. They get by on events, grants, government funding or service contracts, a few sponsorships, and luck.' }
];
const buildTree = (data) => {
    console.log(data);
    const map = {}; // Dictionary to hold references to each node
    const tree = [];

    data?.forEach((item) => {
        map[item._id] = { ...item, children: [] }; // Initialize each node with empty children array
    });

    data?.forEach((item) => {
        if (item.parentId === null) {
            // Top-level blogs
            tree.push(map[item._id]);
        } else {
            // Add to the parent's children array
            map[item.parentId].children.push(map[item._id]);
        }
    });

    return tree;
};

const blogTree = buildTree(blogData);
console.log(JSON.stringify(blogTree, null, 2));

const BlogTree = ({ nodes }) => {
    return (
        <div>
            {nodes.map((node, index) => (
                <TreeNode node={node} key={index} isFirst={index === 0} />
            ))}
        </div>
    );
};

const TreeNode = ({ node, isFirst }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isReply, setIsReply] = useState(false);

    const hasChildren = node.children && node.children.length > 0;

    return (
        <div style={{ marginLeft: 20, position: 'relative' }}>
            <div
                className={`${styles.node} ${node.parentId && isFirst ? styles.firstChild : ''}`}
                style={{ cursor: 'pointer' }}
            >
                <CommentItem
                    isOpen={isOpen}
                    isReply={isReply}
                    setIsReply={(e) => setIsReply(e)}
                    setIsOpen={(e) => setIsOpen(e)}
                    parentId={node._id}
                    hasChildren={hasChildren}
                    {...node}

                />
            </div>

            {isOpen && hasChildren && (
                <div style={{ marginLeft: 20 }}>
                    {node.children.map((childNode, index) => (
                        <TreeNode node={childNode} key={index} isFirst={index === 0} />
                    ))}
                </div>
            )}
            {/* {!hasChildren && <div style={{ marginLeft: 20 }}>{node.content}</div>} */}
        </div>
    );
};
const FeedComments = ({ comments }) => {
    // const hasData = true;
    // const commentsCounts = 10;
    console.log(comments);
    return (
        <>
            <div className='items-center my-12'>
                <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-8 ">
                    <Button
                        variant="bordered"
                        radius="full"
                        size="lg"
                        className="min-w-36 font-medium text-brand-olive-green border-brand-olive-green basis-[30%]"
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
                        Sort by
                    </Button>
                    <div className="basis-[20%] ">
                        <BrandDropdown
                            label={`Comment (${comments?.length})`}
                            // data={categories.map((cat) => ({ key: cat._id, label: cat.name }))}
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
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div>
                {/* <BlogTree nodes={blogTree} /> */}
                <BlogTree nodes={buildTree(comments)} />
            </div>
        </>
    );
};
const CommentItem = ({ description, votes, date, reporterPhoto, reporterName, hasChildren, isOpen, isReply, setIsOpen, setIsReply, _id }) => {
    const params = useParams();
    const { setVotedComment } = usePostContext();

    const voteOnComment = async (isVote) => {
        console.log(isVote);
        try {
            const response = await axios.put(`${SERVER_LOCAL_IP}/api/post/comment/${_id}/vote`, { isVote, postId: params.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage?.getItem("authToken")}`, // JWT token for auth
                },
            });
            setVotedComment(response.data.comment)
            //   setPost((d)=>({
            //     ...d,
            //     votes:response.data.votes
            //   }));
            console.log(response.data.votes);
            const data = await response.json();

            if (response.ok) {
                console.log(data.message); // "Vote successful"
                console.log(`Total Votes: ${data.votes}`);
            } else {
                console.error(data.message); // Handle error messages (e.g., "You have already voted")
            }
        } catch (error) {
            console.error('Error voting on blog:', error);
        }
    };
    return (<>
        <article className='pb-9' onClick={() => { setIsOpen(!isOpen); setIsReply(false) }}>
            <div className='flex gap-2 items-center'>
                <img
                    src={reporterPhoto ? ` ${SERVER_LOCAL_IP}/api/file/download/${reporterPhoto}` : `https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__`}

                    alt={reporterPhoto} className="w-[30px] h-[30px] object-cover rounded-full" />
                <div className='flex items-center gap-2'>
                    <h2 className=" font-bold text-2xl tracking-wider uppercase text-brand-olive-green font-heading" >
                        {reporterName}
                    </h2>
                    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.7" cx="2.5" cy="2.5" r="2.5" fill="#25282B" />
                    </svg>
                    <p className="text-base font-bold tracking-wider text-brand-olive-green flex items-center gap-1">
                        {formatTimeAgo(date)}</p>
                </div>
            </div>
            <p className="text-base font-bold tracking-wider text-brand-olive-green flex items-center gap-1 pl-8 mt-1 pt-3 pb-6 mb-[-2px] border-brand-dark border-opacity-50 ml-[15px] border-l">
                {description}</p>
            <div className='flex gap-3 '>
                <div className='w-[30px] flex items-center justify-center'>
                    {hasChildren ? (isOpen ? <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.35" y="0.749902" width="16.02" height="15.3" rx="7.65" stroke="#25282B" strokeWidth="0.7" />
                        <path d="M11.72 8.3999H8.36M8.36 8.3999H5M8.36 8.3999H8.40039" stroke="black" strokeWidth="0.63" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                        : <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.35" y="0.35" width="17.22" height="17.22" rx="8.61" stroke="#25282B" strokeWidth="0.7" />
                            <path d="M12.3196 8.9601H8.95961M8.95961 8.9601H5.59961M8.95961 8.9601V5.6001M8.95961 8.9601V12.3201" stroke="black" strokeWidth="0.63" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : ' '}
                </div>

                <Button
                    variant="bordered"
                    radius="full"
                    size="sm"
                    onClick={() => voteOnComment(true)}
                    className="font-bold text-brand-olive-green border-brand-olive-green h-[30px] "
                    startContent={
                        <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg" className='pb-[1px] border-b-1 border-[black]'>
                            <path d="M4.75 11.615V11.865H5H6H6.25V11.615V3.48573L8.94239 6.17295L9.11904 6.34926L9.29565 6.1729L9.98465 5.4849L10.1617 5.30813L9.98478 5.13122L5.67678 0.823223L5.5 0.646447L5.32322 0.823223L1.01522 5.13122L0.838447 5.308L1.01522 5.48478L1.70322 6.17278L1.8798 6.34935L2.05658 6.17298L4.75 3.4856V11.615Z" fill="black" stroke="black" strokeWidth="0.5" />
                        </svg>

                    }
                >
                    Upvote ({votes})
                </Button>
                <Button
                    variant="bordered"
                    radius="full"
                    size="sm"
                    onClick={() => voteOnComment(false)}
                    className="font-bold text-brand-olive-green border-brand-olive-green h-[30px] "
                    startContent={
                        <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg" className='pt-[1px] border-t-1 border-[black]'>
                            <path d="M6.25 3.385V3.135H6L5 3.135H4.75V3.385L4.75 11.5143L2.05761 8.82705L1.88096 8.65074L1.70435 8.8271L1.01535 9.5151L0.838318 9.69187L1.01522 9.86878L5.32322 14.1768L5.5 14.3536L5.67678 14.1768L9.98478 9.86878L10.1616 9.692L9.98478 9.51522L9.29678 8.82722L9.1202 8.65065L8.94342 8.82702L6.25 11.5144L6.25 3.385Z" fill="black" stroke="black" strokeWidth="0.5" />
                        </svg>

                    }
                >
                    Downvote
                </Button>
                <Button
                    onClick={() => { setIsReply(true), setIsOpen(false) }}
                    variant="bordered"
                    radius="full"
                    size="sm"
                    className="font-bold text-brand-olive-green border-brand-olive-green h-[30px] "
                    startContent={
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.90078 1.63722C2.6223 1.63722 2.35523 1.74784 2.15832 1.94476C1.96141 2.14167 1.85078 2.40874 1.85078 2.68722V6.88722C1.85078 7.1657 1.96141 7.43277 2.15832 7.62968C2.35523 7.82659 2.6223 7.93722 2.90078 7.93722H3.95078V9.05722L5.39768 8.03382L5.53348 7.93722H9.90078C10.1793 7.93722 10.4463 7.82659 10.6432 7.62968C10.8402 7.43277 10.9508 7.1657 10.9508 6.88722V2.68722C10.9508 2.40874 10.8402 2.14167 10.6432 1.94476C10.4463 1.74784 10.1793 1.63722 9.90078 1.63722H2.90078ZM0.800781 2.68722C0.800781 2.13026 1.02203 1.59612 1.41586 1.20229C1.80968 0.808469 2.34383 0.587219 2.90078 0.587219H9.90078C10.4577 0.587219 10.9919 0.808469 11.3857 1.20229C11.7795 1.59612 12.0008 2.13026 12.0008 2.68722V6.88722C12.0008 7.44417 11.7795 7.97832 11.3857 8.37214C10.9919 8.76597 10.4577 8.98722 9.90078 8.98722H5.86808L3.72888 10.5006L2.90078 11.0872V8.98722C2.34383 8.98722 1.80968 8.76597 1.41586 8.37214C1.02203 7.97832 0.800781 7.44417 0.800781 6.88722L0.800781 2.68722Z" fill="black" />
                        </svg>
                    }
                >
                    Reply
                </Button>
                <Button
                    variant="bordered"
                    radius="full"
                    size="sm"
                    className="font-bold text-brand-olive-green border-brand-olive-green h-[30px] "
                    startContent={
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1_2588)">
                                <path d="M8 0.0998535V3.29985C1.6 3.29985 0 6.57985 0 11.2999C0.832 8.13185 3.2 6.49985 6.4 6.49985H8V9.69985L12.8 4.64385L8 0.0998535Z" fill="#25282B" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_2588">
                                    <rect width="12.8" height="12.8" fill="white" transform="translate(0 0.0999756)" />
                                </clipPath>
                            </defs>
                        </svg>

                    }
                >
                    Share
                </Button>
            </div>

        </article>
        {isReply && <CreateComments setIsReply={setIsReply} setIsOpen={setIsOpen} parentId={_id} />}

    </>
    )
};
export default FeedComments;
