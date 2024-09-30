import * as React from 'react';

const PartnerLogo = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={`object-contain ${className}`} />
);

function PartnersComponent() {
  const partners = [
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/40786fd34508689654c55182397628a3a7f1a60835260b7dd9dec7c1446cd139',
      alt: 'Partner 1',
      className: 'w-14 aspect-[1.32]'
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/237084fa27c047705fdd10c8327665108e4ad3f0e078c62ae27aeb1d5253bd48',
      alt: 'Partner 2',
      className: 'w-20 aspect-[2.6]'
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/caa2ed4145663cbd552416c217418b2a1af9c3ccaf23e1c438788b6d53637228',
      alt: 'Partner 3',
      className: 'w-21 aspect-[2.1]'
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/321df10c393069d409978444e887ede4899a0e4f5a48e9b7681ade6ff87fcfcb',
      alt: 'Partner 4',
      className: 'w-[105px] aspect-[2.62]'
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3f1efe555b333ca79a84e3a9b14dfdf8153ed8b64fd95819328720ad299fab98',
      alt: 'Partner 5',
      className: 'w-15 aspect-[1.5]'
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ee35257ca1d560af0389684736a638818e1618d02854927281faef8d8803e0ad',
      alt: 'Partner 6',
      className: 'w-[42px] aspect-[1.2]'
    }
  ];

  return (
    <section className="bg-brand-lemon-yellow relative px-6 py-12 lg:px-16 lg:py-20 overflow-hidden">
      <h2 className="text-4xl lg:text-6xl font-bold uppercase text-stone-700 tracking-wider mb-4 font-heading">
        Our partners in 84+ countries
      </h2>
      <p className="text-lg lg:text-xl font-bold tracking-wide text-stone-700 max-w-2xl mb-12">
        Raise allows you to highlight your campaign by increasing its visibility. You can feature
        your listed campaign from your user dashboard.
      </p>
      <div className="flex flex-wrap gap-10 items-center justify-start">
        {partners.map((partner, index) => (
          <PartnerLogo key={index} {...partner} />
        ))}
      </div>
      <img src="/images/globe.png" alt="globe" className="w-[35%] absolute -bottom-3 -right-3" />
    </section>
  );
}

export default PartnersComponent;
