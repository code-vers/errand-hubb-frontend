"use client";

import React from "react";
import ServiceRequestDetail from "@/components/dashboard/client/serviceRequests/ServiceRequestDetail";
import { useParams } from "next/navigation";

export default function ClientRequestDetailRoute() {
  const params = useParams();
  const id = params.id as string;
  return <ServiceRequestDetail id={id} />;
}
