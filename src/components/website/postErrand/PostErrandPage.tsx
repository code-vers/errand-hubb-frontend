"use client";
import { Errand } from "@/types/errand";
import { useState } from "react";
import SectionHeroBanner from "../SectionHeroBanner";
import ErrandDetailsForm from "./ErrandDetailsForm";
import ErrandTypePicker from "./ErrandTypePicker";

const PostErrandPage = () => {
  const [formData, setFormData] = useState<Errand>({
    title: "",
    description: "",
    city: "",
    state: "",
    budget: "",
    dateNeeded: "",
    contactInfo: "",
    photoUrl: "",
    type: "Grocery", // Default type
  });

  const handleUpdateField = (field: keyof Errand, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting Errand Data:", formData);
    alert("Errand posted! Check console for data.");
  };

  return (
    <section className='w-full bg-[#efefef] min-h-screen '>
      <SectionHeroBanner
        title={"Post an Errand"}
        subtitle={
          "Tell us what you need and connect with someone ready to help."
        }
      />
      <div className='mx-auto w-full max-w-360 px-6 py-10'>
        <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start'>
          <ErrandDetailsForm
            formData={formData}
            onChange={handleUpdateField}
            onSubmit={handleSubmit}
          />
          <ErrandTypePicker
            selectedType={formData.type}
            onSelect={(type) => handleUpdateField("type", type)}
          />
        </div>
      </div>
    </section>
  );
};

export default PostErrandPage;
