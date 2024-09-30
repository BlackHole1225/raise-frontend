import React from 'react';

const CampaignCard = (props) => {
  const { imgUrl, title, amount, type } = props;
  // console.log(imgUrl);

  return (
    <div
      className={`flex overflow-hidden flex-col ${(type === 'v1' && 'bg-brand-olive-green') || (type === 'v2' && 'bg-brand-lemon-yellow') || (type === 'v3' && 'bg-brand-eucalyptus') || (type === 'v4' && 'bg-brand-dark') || (type === 'v5' && 'bg-brand-pale-lemon')}`}
    >
      <div className="flex overflow-hidden relative flex-col w-full">
        <img
          loading="lazy"
          // src={`${FSERVER_IP}/api/file/download/` + imgUrl}
          src={imgUrl}
          className="object-cover w-full aspect-[1.08]"
          alt={title}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="flex flex-col p-5 mt-3.5 w-full">
        <div
          className={`text-4xl font-heading font-bold tracking-widest  uppercase ${((type === 'v1' || type === 'v4') && 'text-brand-pale-lemon') || ((type === 'v2' || type === 'v3' || type === 'v5') && 'text-brand-olive-green')}`}
        >
          {title}
        </div>
        <div className="flex flex-col mt-3.5 w-full">
          <div
            className={`text-xl font-bold tracking-wider ${((type === 'v1' || type === 'v4') && 'text-brand-pale-lemon') || ((type === 'v2' || type === 'v3' || type === 'v5') && 'text-brand-olive-green')}`}
          >
            Raised $ {amount}
          </div>
          <div
            className={`flex overflow-hidden flex-col items-start mt-1.5 w-full border border-solid ${((type === 'v1' || type === 'v4') && 'border-brand-pale-lemon') || ((type === 'v2' || type === 'v3' || type === 'v5') && 'border-brand-olive-green')}`}
          >
            <div
              className={`flex max-w-full ${((type === 'v1' || type === 'v4') && 'bg-brand-pale-lemon') || ((type === 'v2' || type === 'v3' || type === 'v5') && 'bg-brand-olive-green')} min-h-[10px] w-1/2`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
