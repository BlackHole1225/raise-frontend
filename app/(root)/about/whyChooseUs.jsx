import * as React from 'react';

const ReasonCard = ({ number, title, description }) => (
  <div className="bg-brand-pale-lemon text-stone-700 h-full pb-10">
    <div className="bg-brand-lemon-yellow p-4 ">
      <h3 className="text-2xl font-bold tracking-widest uppercase">Reason {number}</h3>
    </div>
    <div className="p-6">
      <h4 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-widest uppercase mb-4 font-heading">
        {title}
      </h4>
      <p className="text-lg tracking-wide">{description}</p>
    </div>
  </div>
);

function WhyChooseUs() {
  const reasons = [
    {
      title: 'Broader Reach',
      description:
        'Accessible to anyone with an internet connection, enabling global participation and expanding the potential donor base significantly.'
    },
    {
      title: 'Enhanced Security',
      description:
        'Offers strong security with cryptographic encryption and smart contracts, ensuring funds are safely transferred and stored, reducing fraud risks.'
    },
    {
      title: 'Decentralization',
      description:
        'Blockchain technology ensures that no single entity controls the platform, increasing trust and transparency with an immutable ledger.'
    },
    {
      title: 'Ease of Use',
      description:
        'Fundraising applications simplify the donation process for both organizers and donors. They often provide user-friendly interfaces.'
    }
  ];

  return (
    <section className="bg-brand-eucalyptus px-6 py-16 lg:px-16 lg:py-28">
      <h2 className="text-4xl lg:text-6xl font-bold uppercase text-brand-dark tracking-wider mb-4 font-heading">
        Why Choose Us?
      </h2>
      <p className="text-lg lg:text-xl font-bold tracking-wide text-brand-dark max-w-4xl mb-12">
        These applications leverage blockchain technology to ensure decentralization, meaning no
        single entity has control, which fosters trust and transparency through an immutable ledger.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((reason, index) => (
          <ReasonCard
            key={index}
            number={index + 1}
            title={reason.title}
            description={reason.description}
          />
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
