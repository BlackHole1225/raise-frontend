import React from 'react';
import Sidebar from '../../../components/layouts/sidebar';

const layout = ({ children }) => {
  // write project route code here
  return (
    <div className="flex">
      <Sidebar
        navItems={[
          { label: 'your feed', link: '/forum' },
          { label: 'Trending posts', link: '/forum/trend-posts' },
          { label: 'How it works?', link: '/forum/how-works' },
          { label: 'Your Posts', link: '/forum/your-posts' },
          { label: 'Your comments', link: '/forum/your-comments' },
          { label: 'Content policy', link: '/forum/content-policy' }
        ]}
      />
      <div className="w-1/2 flex-grow bg-brand-ivory">
        <div className="pt-24 md:pt-[140px] md:px-8 max-w-[90%] md:max-w-full mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default layout;
