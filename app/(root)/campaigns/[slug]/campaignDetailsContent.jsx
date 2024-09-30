import * as React from 'react';

const SectionDivider = () => <hr className="border-t border-stone-700 my-8 w-full" />;

const ReactionIcon = ({ src }) => (
  <img src={src} alt="Reaction" className="w-10 h-10 object-contain" />
);

const SupportComment = ({ avatar, name, donation, time, comment }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h4 className="text-xl font-bold font-heading">{name}</h4>
        <div className="text-sm flex gap-4">
          <span>{donation} SOL</span>
          <span className="opacity-50">{time}</span>
        </div>
      </div>
    </div>
    <p className="text-xl opacity-50">{comment}</p>
  </div>
);

function CampaignDetailsContent() {
  return (
    <article className="mx-auto p-8 pt-14 font-bold text-zinc-800">
      <section className="opacity-80">
        <h2 className="text-4xl mb-6 font-heading">Welcome to our fundraising campaign</h2>
        <p className="text-2xl mb-6">
          We&apos;re dedicated to the preservation and protection of rare species of tigers. These
          magnificent creatures are on the brink of extinction due to habitat loss, poaching, and
          climate change. Our mission is to ensure that these majestic animals continue to thrive in
          the wild for generations to come.
        </p>
        <p className="text-2xl mb-6">
          By contributing to this cause, you are directly supporting efforts to safeguard tiger
          habitats, enforce anti-poaching laws, and fund research and conservation programs.
        </p>
        <button className="text-xl text-stone-700 hover:underline">Read More</button>
      </section>

      <SectionDivider />

      <section className="mb-8 flex gap-4 items-center">
        <h3 className="text-2xl">Reactions</h3>
        <div className="flex items-center gap-4">
          {[
            'https://cdn.builder.io/api/v1/image/assets/TEMP/24a5ed554f28a5ca789d2ac5c6cfed0b9bb9b11d18de3030770dee6d9d6bf9db',
            'https://cdn.builder.io/api/v1/image/assets/TEMP/dc9483b43bdc35ae81193aafc2c0d08164d2f9267abf6285b45a2cf901c1cb9b',
            'https://cdn.builder.io/api/v1/image/assets/TEMP/b990ba4e303e7e4293a759d05b849d4a1d782e78359595bce396eca4a70adc65',
            'https://cdn.builder.io/api/v1/image/assets/TEMP/36906394ad6d1c6f8ef38860c7bb44fef99e80fc9cc7e0ae3dc419bfb05076ba',
            'https://cdn.builder.io/api/v1/image/assets/TEMP/904a522f67a213ebf352e931a6c0c69ccbe92e69ce50f26ee99163512e2679db',
            'https://cdn.builder.io/api/v1/image/assets/TEMP/0a701f182ccb05c889173fcf0b68189d5579c90a08e67c2d9d9e6e8a1c9b21ac'
          ].map((src, index) => (
            <ReactionIcon key={index} src={src} />
          ))}
        </div>
        <p className="text-xl">120</p>
      </section>

      <SectionDivider />

      <section>
        <h2 className="text-4xl mb-6">Updates</h2>
        <p className="text-2xl mb-6 opacity-65">
          We&apos;re dedicated to the preservation and protection of rare species of tigers. These
          magnificent creatures are on the brink of extinction due to habitat loss, poaching, and
          climate change. Our mission is to ensure that these majestic animals continue to thrive in
          the wild for generations to come.
        </p>
        <p className="text-2xl mb-6 opacity-65">
          By contributing to this cause, you are directly supporting efforts to safeguard tiger
          habitats, enforce anti-poaching laws, and fund research and conservation programs.
        </p>
        <button className="text-xl text-stone-700 hover:underline">See Older Updates</button>
      </section>

      <SectionDivider />

      <section>
        <h2 className="text-4xl mb-8 font-heading">Words of Support (102)</h2>
        <SupportComment
          avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/800c932755c7bc3849ae8eed6ce497c46b8421b967fbc1e9da3d1fd7e59c6ee1"
          name="Diana Robert"
          donation="5"
          time="18 Hours ago"
          comment="Connor and I are so grateful to have shared a snippet of life with you. We love you so. Care and condolences to Matt and your family."
        />
        <SupportComment
          avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/b3f1324c2210e64c8183775282af6039c7eb5647be498c837edbbafb9f8c1cd7"
          name="Diana Robert"
          donation="5"
          time="18 Hours ago"
          comment="Lots of hugs and strength to U poppie... you are in our thoughts... love from sammy, sharna, demi and freya"
        />
        <button className="text-xl text-stone-700 hover:underline">Show more</button>
      </section>

      <SectionDivider />

      <footer className="text-xl text-stone-700">Created July 22nd, 2024</footer>
    </article>
  );
}

export default CampaignDetailsContent;
