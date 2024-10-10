'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { SERVER_IP, SERVER_LOCAL_IP } from '@/utils/constants';
import axios from 'axios';

const SectionDivider = () => <hr className="border-t border-stone-700 my-8 w-full" />;
function formatDate(isoString) {
  const date = new Date(isoString);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Add 'st', 'nd', 'rd', or 'th' for the day
  const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
    (day % 10 === 2 && day !== 12) ? 'nd' :
      (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

  return `Created ${month} ${day}${suffix}, ${year}`;
}

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

function CampaignDetailsContent({ campaignData }) {
  const [isSeeOld, setIsSeeOld] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const ReactionIcon = ({ src, count, onClick }) => (
    <div className="flex flex-col items-center">
      <p className='w-full text-right'>{count}</p>
      <img
        src={src}
        alt="reaction"
        className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
        onClick={onClick}
      />
    </div>
  );
  const [reactions, setReactions] = useState({
    reaction1: { src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/24a5ed554f28a5ca789d2ac5c6cfed0b9bb9b11d18de3030770dee6d9d6bf9db', count: 0 },
    reaction2: { src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/dc9483b43bdc35ae81193aafc2c0d08164d2f9267abf6285b45a2cf901c1cb9b', count: 0 },
    reaction3: { src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b990ba4e303e7e4293a759d05b849d4a1d782e78359595bce396eca4a70adc65', count: 0 },
    reaction4: { src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/36906394ad6d1c6f8ef38860c7bb44fef99e80fc9cc7e0ae3dc419bfb05076ba', count: 0 },
    reaction5: { src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/904a522f67a213ebf352e931a6c0c69ccbe92e69ce50f26ee99163512e2679db', count: 0 },
    reaction6: { src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0a701f182ccb05c889173fcf0b68189d5579c90a08e67c2d9d9e6e8a1c9b21ac', count: 0 }
  });
  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(`${SERVER_LOCAL_IP}/api/campaign/${campaignData._id}/reactions`);
        setReactions(prevReactions => {
          const updatedReactions = { ...prevReactions };
          Object.keys(response.data.reactions).forEach(type => {
            updatedReactions[type].count = response.data.reactions[type];
          });
          return updatedReactions;
        });
      } catch (error) {
        console.error('Error fetching reactions', error);
      }
    };
    fetchReactions();
  }, [campaignData._id]);
  const handleReactionClick = async (type) => {
    try {
      const response = await axios.post(`${SERVER_LOCAL_IP}/api/campaign/${campaignData._id}/reactions`, { reactionType: type }, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("authToken")}`, // JWT token for auth
        },
      });
      if (response.data.type == 'push') {
        setReactions(prevReactions => ({
          ...prevReactions,
          [type]: { ...prevReactions[type], count: prevReactions[type].count + 1 }
        }));
      } else {
        setReactions(prevReactions => ({
          ...prevReactions,
          [type]: { ...prevReactions[type], count: prevReactions[type].count - 1 }
        }));
      }
    } catch (error) {
      console.error('Error adding reaction', error);
    }
  };
  return (
    <article className="mx-auto p-8 pt-14 font-bold text-zinc-800">
      <section className="opacity-80">
        <h2 className="text-4xl mb-6 font-heading">Welcome to our fundraising campaign</h2>
        <p className={`text-2xl mb-6 ${!isReadMore && 'max-h-20 overflow-hidden'}`} dangerouslySetInnerHTML={{ __html: campaignData.content[0]?.text }}>
        </p>
        <button onClick={() => { setIsReadMore(!isReadMore) }} className="text-xl text-stone-700 hover:underline">Read More</button>
      </section>

      <SectionDivider />

      {/* <section className="mb-8 flex gap-4 items-center">
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
      </section> */}
      <section className="mb-8 flex gap-4 items-end">
        <h3 className="text-2xl">Reactions</h3>
        <div className="flex items-center gap-4">
          {Object.keys(reactions).map((type) => (
            <ReactionIcon
              key={type}
              src={reactions[type].src}
              count={reactions[type].count}
              onClick={() => handleReactionClick(type)}
            />
          ))}
        </div>
        {/* Display the total number of reactions */}
        <p className="text-xl underline">
          {Object.values(reactions).reduce((acc, reaction) => acc + reaction.count, 0)}
        </p>
      </section>
      <SectionDivider />

      <section>
        <h2 className="text-4xl mb-6">Updates</h2>
        {campaignData?.content.map((e, index) => (<>
          {(3 > index > 0 || index > 3 && isSeeOld) && <p className="text-2xl mb-6 opacity-65" dangerouslySetInnerHTML={{ __html: e.text }}>

          </p>}
        </>))}
        <button onClick={() => setIsSeeOld(!isSeeOld)} className="text-xl text-stone-700 hover:underline">{isSeeOld ? 'Close Older Updates' : 'See Older Updates'}</button>
      </section>

      <SectionDivider />

      <section>
        <h2 className="text-4xl mb-8 font-heading">Words of Support ({campaignData.donated.length})</h2>
        {campaignData.donated.map((d) => (
          <SupportComment
            avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/800c932755c7bc3849ae8eed6ce497c46b8421b967fbc1e9da3d1fd7e59c6ee1"
            name="Diana Robert"
            donation="5"
            time="18 Hours ago"
            comment="Connor and I are so grateful to have shared a snippet of life with you. We love you so. Care and condolences to Matt and your family."
          />
        ))}
        <button className="text-xl text-stone-700 hover:underline">Show more</button>
      </section>

      <SectionDivider />

      <footer className="text-xl text-stone-700">{formatDate(campaignData.createdAt)}</footer>
    </article>
  );
}

export default CampaignDetailsContent;
