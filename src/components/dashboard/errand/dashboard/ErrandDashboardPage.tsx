"use client";

import PageHeader from "../../common/PageHeader";
import TaskDashboard from "./TaskDashboard";

const ErrandDashboardPage = () => {
  return (
    <div className='w-full p-6'>
      <PageHeader title='Overview' />
      <TaskDashboard />
    </div>
  );
};

export default ErrandDashboardPage;
