"use client";

import React from "react";
import MessagesDashboard from "@/components/dashboard/message/MessagesDashboard";
import PageHeader from "../../common/PageHeader";

const ErrandMessagePage = () => {
  return (
    <div className='w-full p-4'>
      <PageHeader title='inbox' />
      <MessagesDashboard />
    </div>
  );
};

export default ErrandMessagePage;
