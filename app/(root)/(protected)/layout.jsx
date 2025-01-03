import React from 'react';
import Sidebar from '@/components/layouts/sidebar';

const layout = ({ children }) => {
  // write project route code here
  return (
    <div className="flex">
      <Sidebar
        navItems={[
          { label: 'dashboard', link: '/account' },
          { label: 'account plan', link: '/account/plan' },
          { label: 'setting', link: '/account/setting' },
          { label: 'create campaign', link: '/account/create-a-campaign' },
          { label: 'my campaigns', link: '/account/my-campaigns' },
        ]}
      />
      <div className="w-1/2 flex-grow">{children}</div>
    </div>
  );
};

export default layout;
