'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import React from 'react';
import DragDropUpload from '../../../../components/ui/dragDropUpload';

const page = () => {
  return (
    <>
      <div className="self-start mt-12 text-6xl uppercase max-md:mt-10 max-md:max-w-full max-md:text-4xl font-heading mb-8">
        Let’s know more about you
      </div>
      <DragDropUpload
        acceptedFormats={{
          'image/*': ['.jpeg', '.png', '.jpg', '.gif']
        }}
        isMultiple={false}
        label="Profile Picture"
      />
      <Input
        size="lg"
        variant="bordered"
        label="Phone No"
        radius="sm"
        className="my-5"
        classNames={{
          inputWrapper: 'border border-brand-dark'
        }}
      />
      <Input
        size="lg"
        variant="bordered"
        label="Residential Address"
        radius="sm"
        className="mb-5"
        classNames={{
          inputWrapper: 'border border-brand-dark'
        }}
      />
      <Button
        size="lg"
        className="bg-brand-lemon-yellow py-7 border border-brand-dark w-full font-bold"
        variant="solid"
      >
        Submit
      </Button>
    </>
  );
};

export default page;
