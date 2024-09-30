import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import * as React from 'react';

const ContactInfo = () => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold tracking-widest uppercase mb-4 font-heading">Contact Info</h2>
    <p className="text-xl">Email Address: contact@raise.social</p>
    <p className="text-xl mt-2">Phone Number: +91-98232893732</p>
    <p className="text-xl mt-2">Address: 3-2-1/d, Beside Kumar Theatre, Kachiguda</p>
  </div>
);

const ContactForm = () => (
  <form className="bg-brand-lemon-yellow p-8">
    <h2 className="text-3xl font-bold tracking-widest uppercase mb-4 font-heading">Contact Form</h2>
    <p className="text-xl mb-6">
      If you have any questions or queries feel free to fill this form. Our team will respond to
      your message within a short period of time.
    </p>
    <Input
      size="lg"
      variant="bordered"
      label="Email"
      type="email"
      radius="sm"
      className="mb-5"
      classNames={{
        inputWrapper: 'border border-brand-dark'
      }}
    />
    <div className="grid grid-cols-2 mb-5 gap-5">
      <Input
        size="lg"
        variant="bordered"
        label="First Name"
        type="text"
        radius="sm"
        classNames={{
          inputWrapper: 'border border-brand-dark'
        }}
      />
      <Input
        size="lg"
        variant="bordered"
        label="Last Name"
        type="text"
        radius="sm"
        classNames={{
          inputWrapper: 'border border-brand-dark'
        }}
      />
    </div>
    <Textarea
      variant="bordered"
      label="Message"
      radius="sm"
      className="mb-5"
      classNames={{
        inputWrapper: 'border border-brand-dark'
      }}
    />
    <div className="flex justify-end">
      <Button
        variant="bordered"
        radius="full"
        size="lg"
        className="font-medium text-brand-dark border-brand-dark xl:py-6 xl:px-7"
      >
        Submit
      </Button>
    </div>
  </form>
);

function ContactComponent() {
  return (
    <section className="bg-brand-ivory">
      <div className="grid grid-cols-2">
        <div className="w-full pt-[140px] flex flex-col justify-between">
          <div className="px-6">
            <h1 className="text-5xl lg:text-7xl font-bold uppercase text-zinc-800 tracking-wider mb-12 font-heading">
              Contact Us
            </h1>
            <ContactInfo />
          </div>
          <ContactForm />
        </div>
        <div className="w-full h-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/09118c984a5834dc514b621966abb77e02519dd249a46aa1a3ba1dd969e724a9"
            alt="Contact illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default ContactComponent;
