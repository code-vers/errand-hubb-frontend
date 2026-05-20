import React from "react";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className='flex items-center gap-2 mb-4'>
      <div className='w-1.5 h-6 bg-[#F47A22] rounded-full' />
      <h1 className='text-[22px] font-bold text-foreground whitespace-nowrap tracking-tight uppercase'>
        {title}
      </h1>
    </div>
  );
};

export default PageHeader;
