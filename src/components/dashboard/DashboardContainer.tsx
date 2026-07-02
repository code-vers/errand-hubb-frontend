'use client';

import React from 'react';

interface DashboardContainerProps {
  children: React.ReactNode;
}

const DashboardContainer = ({ children }: DashboardContainerProps) => {
  return (
    <div className="flex-1 p-4 lg:p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardContainer;