'use client';
import React from 'react';

import { Button } from '@nextui-org/button';


const FeedGetStart = () => {
    return (
        <article className="flex h-[205px] w-full flex-col bg-brand-olive-green  py-[30px] px-[22px] gap-2">
            <h2 className="text-[32px] font-bold tracking-wider uppercase text-brand-lemon-yellow font-heading">
                increase your campaign’s visibility today with raise’s simple pricing
            </h2>
            <Button
                variant="bordered"
                radius="full"
                size="lg"
                className="font-medium text-brand-lemon-yellow xl:py-6 xl:px-7 w-[185px] h-[43px] border border-brand-lemon-yellow "
            >
                Get started now
            </Button>

        </article>
    );
};

export default FeedGetStart;
