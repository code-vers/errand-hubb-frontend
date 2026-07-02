"use client";

import React, { useState, useCallback } from "react";
import { WebsiteSettings } from "@/types/settings";
import SettingsForm from "./SettingsForm";
import PageHeader from "../../common/PageHeader";

const SystemSettingPage: React.FC = () => {
  // Initial settings data - Replace with API fetch
  const [settings, setSettings] = useState<WebsiteSettings>({
    siteName: "ErrandHubb",
    siteUrl: "https://errandhubb.com",
    supportEmail: "support@errandhubb.com",
    siteDescription: "Your trusted platform for errands and local services.",
    maintenanceMode: false,
  });

  // Handle form submission
  const handleSubmit = useCallback(async (data: WebsiteSettings) => {
    // Simulate API call - Replace with actual API integration
    console.log("Saving settings:", data);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update local state after successful save
    setSettings(data);
  }, []);

  // Handle cancel
  const handleCancel = useCallback(() => {
    // Navigate back or close the page
    console.log("Cancelled");
  }, []);

  return (
    <div className='w-full p-6 pt-8'>
      <div className='mb-8'>
        <PageHeader title='System Settings' />
      </div>

      <main className=' space-y-6'>
        <div className='bg-white rounded-lg shadow-sm border border-border p-8'>
          {/* Header Section */}
          <header className='mb-8'>
            <h2 className='text-xl font-bold text-foreground mb-2'>
              Website Configuration
            </h2>
            <p className='text-sm text-muted'>
              General platform configuration and branding.
            </p>
          </header>

          {/* Settings Form */}
          <SettingsForm
            initialData={settings}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </main>
    </div>
  );
};

export default SystemSettingPage;
