"use client";

import React, { useState, useCallback, useEffect } from "react";
import { WebsiteSettings, FormErrors, FormStatus } from "@/types/settings";
import SettingsField from "./SettingsField";
import SettingsToggle from "./SettingsToggle";

interface SettingsFormProps {
  initialData: WebsiteSettings;
  onSubmit: (data: WebsiteSettings) => Promise<void>;
  onCancel: () => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<WebsiteSettings>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [isDirty, setIsDirty] = useState(false);

  // Reset form when initialData changes
  useEffect(() => {
    setFormData(initialData);
    setErrors({});
    setIsDirty(false);
    setStatus("idle");
  }, [initialData]);

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.siteName.trim()) {
      newErrors.siteName = "Site name is required";
    }

    if (!formData.siteUrl.trim()) {
      newErrors.siteUrl = "Site URL is required";
    } else {
      try {
        new URL(formData.siteUrl);
      } catch {
        newErrors.siteUrl = "Please enter a valid URL";
      }
    }

    if (!formData.supportEmail.trim()) {
      newErrors.supportEmail = "Support email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.supportEmail)) {
      newErrors.supportEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleFieldChange = useCallback(
    (field: keyof WebsiteSettings, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setIsDirty(true);
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors],
  );

  const handleToggleChange = useCallback((checked: boolean) => {
    setFormData((prev) => ({ ...prev, maintenanceMode: checked }));
    setIsDirty(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");
    try {
      await onSubmit(formData);
      setStatus("success");
      setIsDirty(false);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      console.error("Failed to save settings:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-8' noValidate>
      {/* Success/Error Messages */}
      {status === "success" && (
        <div className='rounded-lg bg-green-50 border border-green-200 p-4'>
          <p className='text-sm text-success font-medium'>
            Settings saved successfully!
          </p>
        </div>
      )}
      {status === "error" && (
        <div className='rounded-lg bg-red-50 border border-red-200 p-4'>
          <p className='text-sm text-error font-medium'>
            Failed to save settings. Please try again.
          </p>
        </div>
      )}

      {/* Platform Information Section */}
      <section className='space-y-6'>
        <h3 className='text-lg font-bold text-foreground border-b border-border pb-2'>
          Platform Information
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <SettingsField
            id='site-name'
            label='Site Name'
            type='text'
            value={formData.siteName}
            onChange={(value) => handleFieldChange("siteName", value)}
            placeholder='e.g. ErrandHubb'
            required
            error={errors.siteName}
          />
          <SettingsField
            id='site-url'
            label='Site URL'
            type='url'
            value={formData.siteUrl}
            onChange={(value) => handleFieldChange("siteUrl", value)}
            placeholder='e.g. https://errandhubb.com'
            required
            error={errors.siteUrl}
          />
        </div>
        <SettingsField
          id='support-email'
          label='Support Email'
          type='email'
          value={formData.supportEmail}
          onChange={(value) => handleFieldChange("supportEmail", value)}
          placeholder='e.g. support@errandhubb.com'
          required
          error={errors.supportEmail}
        />
        <SettingsField
          id='site-description'
          label='Site Description'
          type='textarea'
          value={formData.siteDescription}
          onChange={(value) => handleFieldChange("siteDescription", value)}
          placeholder='Describe your platform...'
          error={errors.siteDescription}
          rows={3}
        />
      </section>

      {/* System Status Section */}
      <section className='space-y-4'>
        <h3 className='text-lg font-bold text-foreground border-b border-border pb-2'>
          System Status
        </h3>
        <SettingsToggle
          id='maintenance-mode'
          label='Maintenance Mode'
          description='When enabled, the website will be offline for users'
          checked={formData.maintenanceMode}
          onChange={handleToggleChange}
        />
      </section>

      {/* Action Buttons */}
      <div className='flex items-center space-x-4 pt-6'>
        <button
          type='submit'
          disabled={status === "loading" || !isDirty}
          className='
            inline-flex justify-center py-2.5 px-8 border border-transparent shadow-sm 
            text-sm font-bold rounded text-white uppercase tracking-wider
            transition-all duration-200 bg-primary hover:bg-primary-dark 
            disabled:opacity-50 disabled:cursor-not-allowed
            active:scale-[0.98]
          '>
          {status === "loading" ? "Saving..." : "Save Changes"}
        </button>
        <button
          type='button'
          onClick={onCancel}
          disabled={status === "loading"}
          className='
            inline-flex justify-center py-2.5 px-8 border border-primary 
            text-sm font-bold rounded text-primary bg-white uppercase tracking-wider
            hover:bg-orange-50 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          '>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
