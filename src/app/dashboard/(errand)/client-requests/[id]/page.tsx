"use client";

import React from "react";
import ClientRequestDetail from "@/components/dashboard/errand/clientRequests/ClientRequestDetail";
import { useParams } from "next/navigation";

export default function ErrandClientRequestDetailRoute() {
  const params = useParams();
  const id = params.id as string;
  return <ClientRequestDetail id={id} />;
}
