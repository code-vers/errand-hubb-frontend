import React from "react";

interface Errand {
  id: number;
  title: string;
  description: string;
  reward: string;
  timeAgo: string;
  icon: string;
}

const errands: Errand[] = [
  {
    id: 1,
    title: "Grocery Run – Whole Foods",
    description:
      "Pick up weekly groceries from Whole Foods on Wilshire Blvd. List provided. Prefer organic where available.",
    reward: "$25 – $30",
    timeAgo: "2 HRS AGO",
    icon: "🛒",
  },
  {
    id: 2,
    title: "Package Drop-Off – FedEx",
    description:
      "Drop off 2 pre-labeled packages at FedEx location. Packages are at the front door ready to go.",
    reward: "$20",
    timeAgo: "4 HRS AGO",
    icon: "📦",
  },
  {
    id: 3,
    title: "Pharmacy Pickup – CVS",
    description:
      "Pick up 3 prescriptions from CVS Pharmacy. ID will be provided via message. Rush needed before 6PM.",
    reward: "$30 – $35",
    timeAgo: "1 HR AGO",
    icon: "💊",
  },
  {
    id: 4,
    title: "Home Supply Run – Home Depot",
    description:
      "Pick up a list of home repair items from Home Depot. Items are small and can fit in a standard car trunk.",
    reward: "$35 – $40",
    timeAgo: "6 HRS AGO",
    icon: "🏠",
  },
];

const ErrandCard: React.FC<{ errand: Errand }> = ({ errand }) => {
  return (
    <div className='bg-[#FDF5EC] rounded-lg p-5 flex gap-3.5 items-start relative'>
      {/* Icon */}
      <div className='w-13 h-13 bg-surface-dim rounded-md flex items-center justify-center text-2xl shrink-0'>
        {errand.icon}
      </div>

      {/* Content */}
      <div className='flex-1'>
        <h3 className='text-[16px] font-bold text-foreground mb-1.5 pr-18 leading-snug'>
          {errand.title}
        </h3>
        <p className='text-[12px] text-[#555555] leading-relaxed mb-2.5'>
          {errand.description}
        </p>
        <p className='text-[14px] font-bold text-primary'>
          Reward: {errand.reward}
        </p>
        <p className='text-[11px] font-semibold text-[#555555] mt-0.5 tracking-wide'>
          STATUS: OPEN – AWAITING ERRANDR
        </p>
      </div>

      {/* Time Badge */}
      <div className='absolute top-3.5 right-3.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide whitespace-nowrap'>
        {errand.timeAgo}
      </div>
    </div>
  );
};

const ErrandsPage: React.FC = () => {
  return (
    <div className='bg-primary min-h-screen font-sans'>
      <div className='mx-auto max-w-[1540px] px-6 lg:px-10 py-10'>
        {/* Header */}
        <div className='mb-7'>
          <h1 className='text-[28px] font-extrabold text-white mb-1'>
            Your Open Errands
          </h1>
          <p className='text-[13px] text-white/90 font-normal'>
            Current tasks awaiting pickup by your Errand&apos;ers.
          </p>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {errands.map((errand) => (
            <ErrandCard key={errand.id} errand={errand} />
          ))}
        </div>

        {/* Footer */}
        <div className='text-center mt-8 text-[16px] text-white font-semibold'>
          Estimated Earnings for Open Errands:
          <span className='inline-block bg-background text-foreground rounded-full px-5 py-1.5 ml-2 font-bold text-[16px]'>
            $110 – $120
          </span>
        </div>
      </div>
    </div>
  );
};

export default ErrandsPage;
