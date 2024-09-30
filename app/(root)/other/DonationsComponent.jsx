import * as React from 'react';

const TabButton = ({ active, children }) => (
  <button
    className={`px-5 py-3 rounded-full text-sm font-bold transition-colors ${
      active
        ? 'bg-stone-700 text-yellow-200'
        : 'border border-stone-700 text-stone-700 hover:bg-stone-700 hover:text-yellow-200'
    }`}
  >
    {children}
  </button>
);

const DonationItem = ({ avatar, name, amount, time }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h3 className="text-xl font-bold tracking-wide uppercase">{name}</h3>
        <div className="text-sm flex gap-4">
          <span>{amount} SOL</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
    <hr className="border-t border-stone-700 mt-3" />
  </div>
);

const ShareButton = ({ icon }) => (
  <img src={icon} alt="Share" className="w-10 h-10 rounded-full object-cover" />
);

function DonationsComponent() {
  const donations = [
    {
      avatar:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/800c932755c7bc3849ae8eed6ce497c46b8421b967fbc1e9da3d1fd7e59c6ee1',
      name: 'Diana Robert',
      amount: '5',
      time: '10 min ago'
    },
    {
      avatar:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/9630c9c04493435b7221eba734c2455d9825b10880c8307ff9f33c3784b84660',
      name: 'Anonymous User',
      amount: '24',
      time: '2 days ago'
    },
    {
      avatar:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/8d86b4b91cc4fb1a3699a4d98d06f4f0582853ead6a3695d56fa6e6c0a9c5c30',
      name: 'Raghav Barjatya',
      amount: '10',
      time: '4 days ago'
    }
  ];

  const shareIcons = [
    'https://cdn.builder.io/api/v1/image/assets/TEMP/37e35f709513915e58e6aed26be95bb58c09d1e71d0c8c5d8b89b50f032fdc52',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/4d2db6384422663d3a0c603a93185715476bf97d6dfdf00d2b58174983678940',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/eb4e17d0c52da6d041dae6b5e0fee25eea620e958cc47327d6f05d46c4cf0dbd',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/14dfc892fdd2eab02bc8e09098eb2c8a382331ca9ef31bac42043b6cede3b1e6',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/f09c5b1c2ec47cc17bc1f7314e7e433706328fa245802fee5d17cd0cbe95584a'
  ];

  return (
    <aside className="bg-yellow-200 p-8 max-w-[602px]">
      <h2 className="text-3xl font-bold tracking-widest uppercase text-stone-700 mb-6">
        Donations (128)
      </h2>

      <div className="flex gap-2 mb-8">
        <TabButton active={true}>Recent Donations</TabButton>
        <TabButton active={false}>Top Donations</TabButton>
      </div>

      <div className="mb-14">
        {donations.map((donation, index) => (
          <DonationItem key={index} {...donation} />
        ))}
      </div>

      <h3 className="text-xl font-bold text-stone-700 mb-4">Share this Fundraiser</h3>

      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {shareIcons.map((icon, index) => (
            <ShareButton key={index} icon={icon} />
          ))}
        </div>
        <button className="px-6 py-3 text-sm font-bold border border-zinc-800 rounded-full text-zinc-800 hover:bg-zinc-800 hover:text-yellow-200 transition-colors">
          Donate Now
        </button>
      </div>
    </aside>
  );
}

export default DonationsComponent;
