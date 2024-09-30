import React from 'react';

const layout = ({ children }) => {
  return (
    <div className="overflow-hidden p-8 lg:py-14 lg:pr-7 lg:pl-20 bg-brand-ivory max-md:px-5 lg:h-screen">
      <div className="flex gap-5 max-lg:flex-col-reverse h-full">
        <div className="flex flex-col w-[35%] max-md:ml-0 max-lg:w-full">
          <div className="flex flex-col self-stretch my-auto w-full text-xl font-bold text-zinc-800 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 self-start text-5xl whitespace-nowrap max-md:text-4xl">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2dc00ade95da09b368c1fef8bf0b3dc9966c324e821b245532ac1b2f21e73e3d?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
                className="object-contain shrink-0 rounded-lg aspect-square w-[60px]"
                alt="lazy"
              />
              <div className="self-start mt-2.5 basis-auto max-md:text-4xl">Raise.</div>
            </div>
            {children}
          </div>
        </div>
        <div className="flex flex-col lg:ml-5 w-[65%] max-md:ml-0 max-lg:w-full h-full">
          <div className="flex overflow-hidden relative flex-col items-end grow text-2xl font-bold text-amber-50 rounded-3xl max-md:max-w-full h-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a2846126ea60dff5330f24631ee622ef87f7eb9be682a41444620bdd1e674324?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
              className="object-cover absolute inset-0 size-full"
              alt="lazy"
            />
            <div className="min-h-[450px] flex overflow-hidden relative flex-col px-11 pb-11 rounded-3xl max-md:px-5 max-md:max-w-full h-full justify-end">
              <div className="max-md:max-w-full">
                Raise allows you to create online fundraising campaigns effortlessly with the
                powerful Solona based backend system. Verify your campaign and get started raising
                funds.
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/22c8ad87f4b256492c05fa36c78c87c98c6bf82f7f35eba404a7872b4e00ca7a?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
                className="object-contain self-center mt-7 rounded-lg aspect-[5] w-[50px]"
                alt="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
