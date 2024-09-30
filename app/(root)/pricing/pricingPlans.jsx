import * as React from 'react';

const PlanFeature = ({ icon, text }) => (
  <div className="flex items-center gap-2 mt-2">
    <img src={icon} alt="icon" className="w-4 h-4" />
    <span className="text-base tracking-wide">{text}</span>
  </div>
);

const PricingCard = ({ title, price, description, features, bgColor }) => (
  <div className={`${bgColor} text-stone-700 overflow-hidden`}>
    <div className="bg-yellow-200 px-4 py-6">
      <h3 className="text-2xl font-bold tracking-widest uppercase">{title}</h3>
    </div>
    <div className="p-6">
      <div className="text-5xl font-bold uppercase tracking-wider mb-4">{price}</div>
      <p className="text-xl tracking-wide mb-8">{description}</p>
      {features.map((feature, index) => (
        <PlanFeature key={index} {...feature} />
      ))}
      <button className="w-full px-6 py-3 mt-8 border border-stone-700 rounded-full text-base font-bold tracking-wide">
        Learn More
      </button>
    </div>
  </div>
);

function PricingPlans() {
  const plans = [
    {
      title: 'Default plan',
      price: 'Free',
      description: 'Automatically deducted after your campaign reaches its goal.',
      features: [
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/165e22541b2e54ed426f3c336fde7479b6ce20cc2a67d329150e6442e7461b7c',
          text: 'Basic Analytics'
        },
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c8bd883fa323474ec869023d2cd9c4b7f6630953429e09cac5266e1246e572c3',
          text: 'General Campaign Visibility'
        },
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/032a58363a4f5764440300710e7e286bed654b1bfdcb2d96ae39bad59356b3bf',
          text: 'General Campaigns Rendering'
        }
      ],
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Basic Plan',
      price: '10.00 SOL',
      description: 'Automatically deducted after your campaign reaches its goal.',
      features: [
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a74ae8aaa5fe9adee27f850385f9ef3707d10ad293b11661974a970bf471ad01',
          text: 'Basic Analytics'
        },
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b7148889f8e4ad49a12ffb0ef1344fe04bb222227da335893f6502bd6931a51a',
          text: 'General Campaign Visibility'
        },
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ad9f802b70c2730bbf53f60c99ea3fbe49aa10e817f49178211e08f7b61b830e',
          text: 'General Campaigns Rendering'
        }
      ],
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Premium plan',
      price: '18.25 SOL',
      description: 'Automatically deducted after your campaign reaches its goal.',
      features: [
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1afd5b1536925cdf6dd9d086a4039654a5a93f4cc00dc1a228c6985d40739050',
          text: 'Basic Analytics'
        },
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3206531bef61ead45992646224396b90371b4e4b139d1f315d07c8223f83c8d8',
          text: 'General Campaign Visibility'
        },
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d4be889a1a196ecf626e60469808c898bf1beab268d4bdc586a3fd08152723a9',
          text: 'General Campaigns Rendering'
        }
      ],
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Enterprise Plan',
      price: '42.00 SOL',
      description: 'Automatically deducted after your campaign reaches its goal.',
      features: [
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0b97bdadbb34e15b71843a69cf9a04057fc13a297e586fd02657b6d8b802eeac',
          text: 'Basic Analytics'
        },
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7f1f9103f65794a225cbc3a123021b1fa720020028bfb7904c679ace882c7bfa',
          text: 'General Campaign Visibility'
        },
        {
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0346ab5985d59f273a4787415bc9c1d8fec5a48d01356aa35017c6f82c496bf4',
          text: 'General Campaigns Rendering'
        }
      ],
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <section className="bg-stone-300 px-6 py-16 lg:px-16 lg:py-28">
      <h2 className="text-4xl lg:text-6xl font-bold uppercase text-zinc-800 tracking-wider mb-6">
        Plans for your account
      </h2>
      <p className="text-xl font-bold tracking-wide text-stone-700 max-w-4xl mb-16">
        Raise allows you to highlight your campaign by increasing its visibility. You can feature
        your listed campaign from your user dashboard. Click on the following button to learn more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </section>
  );
}

export default PricingPlans;
