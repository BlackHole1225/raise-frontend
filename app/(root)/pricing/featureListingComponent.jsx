import * as React from 'react';

function FeatureListingComponent() {
  return (
    <section className="bg-yellow-200 px-6 py-12 lg:px-16 lg:py-20">
      <h2 className="text-4xl lg:text-6xl font-bold uppercase text-stone-700 tracking-wider mb-6">
        Feature your listing
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <p className="text-xl font-bold tracking-wide text-stone-700 max-w-3xl">
          Raise allows you to highlight your campaign by increasing its visibility. You can feature
          your listed campaign from your user dashboard. Click on the following button to learn
          more.
        </p>
        <button className="px-8 py-4 border border-zinc-800 rounded-full text-xl font-bold text-zinc-800 hover:bg-zinc-800 hover:text-yellow-200 transition-colors">
          Learn More
        </button>
      </div>
    </section>
  );
}

export default FeatureListingComponent;
