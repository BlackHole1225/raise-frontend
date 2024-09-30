import React from 'react';

const AccountSettingsComponent = () => {
  return (
    <main className="bg-amber-50 px-10 pt-20 pb-56">
      <h1 className="text-4xl font-bold tracking-widest uppercase text-zinc-800">
        Account Settings
      </h1>
      <div className="mt-5 flex gap-5 flex-wrap">
        <ProfileSection />
        <ActionsSection />
      </div>
    </main>
  );
};

const ProfileSection = () => (
  <section className="flex-1 min-w-[300px] bg-stone-300 p-9 pt-12 pb-24 text-2xl font-bold text-stone-700">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/96d135e9016983355d05fdee1a15fb1d4c0714b9f6072cb58f305c25c58c3080"
      alt="Profile"
      className="w-[180px] h-[180px] rounded-full object-cover"
    />
    <h2 className="mt-6 tracking-wider uppercase">Shudeesha Patnayak</h2>
    <ProfileDetail label="Name" value="Sudeesha Patnayak" />
    <ProfileDetail label="Email" value="mesudeesha@outlook.com" />
    <ProfileDetail label="Phone" value="+91-9837398489" />
    <ProfileDetail label="Address" value="1A, 115 C-Scheme, Jaipur, Rajasthan (302016)" />
  </section>
);

const ProfileDetail = ({ label, value }) => (
  <>
    <div className="flex gap-2.5 mt-6">
      <span>{label}:</span>
      <span>{value}</span>
    </div>
    <hr className="mt-3.5 border-stone-700" />
  </>
);

const ActionsSection = () => (
  <section className="flex-1 min-w-[300px] bg-yellow-200 p-8 pt-10 font-bold text-stone-700">
    <h2 className="text-3xl tracking-widest uppercase mb-10">Actions</h2>
    <div className="flex flex-col gap-4 text-2xl">
      <ActionItem
        label="Edit Profile"
        iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/13ed2b2dcad7dca476b74fdb765e06ccc9dc327400c017b3a3961d7eb2d98bf8"
      />
      <ActionItem
        label="Change Password"
        iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/7d674d9cd629d5d7f1903654b4f3671575c8f3e158f07407fd24f9fdeeee52e3"
      />
      <ActionItem
        label="Change Email"
        iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/79aad2e90297b0f218bbb33c10fc4e05b73e6951e22d9e5a504b244393ef937d"
      />
      <ActionItem
        label="Change Phone Number"
        iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/9ec0b9ce1e26e1c8d730436dd19fa6141dce13f105922d73e4f2c295f24fe449"
      />
      <ActionItem
        label="Log Out"
        iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/c880489bea520316d61f358b1fb5e61bf6048d3e0d2ee7a6f7cbdb0354b58e7d"
      />
    </div>
  </section>
);

const ActionItem = ({ label, iconUrl }) => (
  <button className="flex justify-between items-center w-full">
    <span>{label}</span>
    <img src={iconUrl} alt="icon" className="w-6 h-6" />
  </button>
);

export default AccountSettingsComponent;
