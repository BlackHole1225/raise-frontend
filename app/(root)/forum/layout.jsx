import React from 'react';
import Sidebar from '../../../components/layouts/sidebar';

const layout = ({ children }) => {
  // write project route code here
  return (
    <div className="flex">
      <Sidebar
        navItems={[
          { label: 'your feed', link: '/forum' },
          { label: 'Trending posts', link: '/forum/plan' },
          { label: 'How it works?', link: '/forum/setting' },
          { label: 'Your Posts', link: '/forum/my-campaigns' },
          { label: 'Your comments', link: '/forum/my-donation' },
          { label: 'Content policy', link: '/forum/my-donation' }
        ]}
      />
      <div className="w-1/2 flex-grow">
        <div className="pt-[140px] px-8">{children}</div>
      </div>
    </div>
  );
};

export default layout;
