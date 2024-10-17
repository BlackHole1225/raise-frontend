'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import { Button } from '@nextui-org/button';
import apiClient from '@/utils/api';
import { usePostContext } from './page';

const CreateComments = ({ setIsReply, setIsOpen, parentId }) => {

    const params = useParams();
    const { setSentComment } = usePostContext();
    const [commentData, setCommentData] = useState({
        accessTime: 0,
        votes: 0,
        reporterPhoto: "https://s3-alpha-sig.figma.com/img/8356/7f57/7a03ba13dd8974f6b817895895bc8831?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KP2pgcg4S~3p2-wjbg46I~Abxyy4kq9t3G5uMpMjEcS~kUuiYmJEi5TnOgD7TO4DiD80YFV1B9xI1eRDOytA368yRxoNOGWgzn9gkdRXsGKj4JxdEoFkplVRvKRoHwmbWruAl1r6vzGkHgwjqQ5JGXJuY-19UVPg8q10GL9OkAjYia6KMtS8-I2r-z4iRfrKl2BORJ7aOe7HsziHoZxYOCZiDxKlpSlZrFcOoFaC2jxWzy8WHMEnKrM0j48ArHguEof5vGW~bPfBFw~kvrqhvhzFfovFIGk-7Kxttzm9erMX38AwtDA7j98rXT3Jd7mt0APGwRS-HuOu6U8DrOP0sg__",
        reporterName: 'ddd',
        parentId,
        description: ''
    });
    const newComment = async () => {
        try {
            console.log(parentId);
            const response = await apiClient.post(`/api/post/${params.id}/comment`, commentData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } });
            // setBlog(response.data.blog);
            setSentComment(response.data.comment);
            setCommentData({
                accessTime: 0,
                votes: 0,
                reporterPhoto: '',
                reporterName: '',
                parentId: 'null',
                description: ''
            });
            // addSentComment(commentData);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    useEffect(() => {
        setCommentData((prev) => ({
            ...prev,
            parentId
        }))
    }, [parentId])
    return (
        <div className='py-5 px-4 relative  border border-brand-dark rounded-2xl ml-4 mb-[24px] mt-[-16px]' onClick={() => setIsOpen(false)}>
            <textarea
                value={commentData.description}
                onChange={(e) => setCommentData({ ...commentData, description: e.target.value })}
                required
                className='w-full outline-none border-none resize-none' placeholder='Type something here....'></textarea>
            <div className="absolute right-3 bottom-3 flex gap-2">
                <Button
                    onClick={() => setIsReply(false)}
                    variant="bordered"
                    radius="full"
                    size="sm"
                    className="font-bold text-brand-olive-green border-brand-olive-green h-[30px] "
                    startContent={
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.55316 0.851094L3.70211 3.70215M3.70211 3.70215L0.851055 6.5532M3.70211 3.70215L0.851055 0.851094M3.70211 3.70215L6.55316 6.5532" stroke="#25282B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                >
                    Cancel
                </Button>
                <Button
                    variant="bordered"
                    radius="full"
                    size="sm"
                    onClick={() => newComment()}
                    className="font-bold text-brand-olive-green border-brand-olive-green h-[30px] "
                    startContent={
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.90469 1.93965C2.62621 1.93965 2.35914 2.05027 2.16223 2.24719C1.96531 2.4441 1.85469 2.71117 1.85469 2.98965V7.18965C1.85469 7.46813 1.96531 7.7352 2.16223 7.93211C2.35914 8.12902 2.62621 8.23965 2.90469 8.23965H3.95469V9.35965L5.40159 8.33625L5.53739 8.23965H9.90469C10.1832 8.23965 10.4502 8.12902 10.6472 7.93211C10.8441 7.7352 10.9547 7.46813 10.9547 7.18965V2.98965C10.9547 2.71117 10.8441 2.4441 10.6472 2.24719C10.4502 2.05027 10.1832 1.93965 9.90469 1.93965H2.90469ZM0.804688 2.98965C0.804688 2.43269 1.02594 1.89855 1.41976 1.50472C1.81359 1.1109 2.34773 0.889648 2.90469 0.889648H9.90469C10.4616 0.889648 10.9958 1.1109 11.3896 1.50472C11.7834 1.89855 12.0047 2.43269 12.0047 2.98965V7.18965C12.0047 7.7466 11.7834 8.28075 11.3896 8.67457C10.9958 9.0684 10.4616 9.28965 9.90469 9.28965H5.87199L3.73279 10.803L2.90469 11.3896V9.28965C2.34773 9.28965 1.81359 9.0684 1.41976 8.67457C1.02594 8.28075 0.804688 7.7466 0.804688 7.18965L0.804688 2.98965Z" fill="#25282B" />
                        </svg>
                    }
                >
                    Comment
                </Button>
            </div>
        </div>
    )
}
export default CreateComments;