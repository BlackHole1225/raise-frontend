import * as React from 'react';

const ValueItem = ({ imgSrc, title }) => (
  <div className="flex flex-col items-center text-center">
    <img
      loading="lazy"
      src={imgSrc}
      alt={title}
      className="w-24 h-24 object-contain rounded-3xl mb-4"
    />
    <h3 className="text-xl font-bold tracking-wide text-zinc-800">{title}</h3>
  </div>
);

function ValuesMissionAndVision() {
  const values = [
    {
      imgSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/479b4e5db135d39767a5fe05d2b666bbcd0e2ad9eca785961d631c04c27987c5',
      title: 'Based on Web3'
    },
    {
      imgSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/01ab03e8ca601468ef72b14b782a0ed9de6a6e1d5740e47639a367bb6dca0754',
      title: 'No Fee for Campaigns'
    },
    {
      imgSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/a951f03168017459f6d88d1bb73e5e93b4df18d602e6dcbb62921f3e65fef30e',
      title: 'Worldwide Community'
    },
    {
      imgSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/10a2467151efeca5aee1c3098918fbc58284c1de38b6c82743d1fdea694fff41',
      title: 'Active Support'
    }
  ];

  return (
    <div className="flex flex-wrap justify-between">
      <section className="w-full lg:w-1/2 bg-amber-50 p-8 lg:p-16">
        <h2 className="text-4xl lg:text-6xl font-bold uppercase text-zinc-800 tracking-wider mb-4 font-heading">
          Our Values
        </h2>
        <p className="text-xl lg:text-2xl font-bold tracking-wide text-zinc-800 mb-12">
          See what makes raise different from others and why you should choose raise for your
          campaign.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueItem key={index} {...value} />
          ))}
        </div>
      </section>

      <section className="w-full lg:w-1/2 bg-brand-lemon-yellow p-8 lg:p-16 text-stone-700">
        <h2 className="text-4xl lg:text-6xl font-bold uppercase tracking-wider mb-8 font-heading">
          Mission and Vision
        </h2>
        <p className="text-xl lg:text-2xl font-bold tracking-wide">
          Together, we are building a future where everyone has the ability to make a meaningful
          difference for the people, causes, and communities they care about most.
          <br />
          <br />
          Flesh that out the horse is out of the barn. We need to button up our approach who&apos;s
          responsible for the ask for this request? waste of resources.
        </p>
      </section>
    </div>
  );
}

export default ValuesMissionAndVision;
