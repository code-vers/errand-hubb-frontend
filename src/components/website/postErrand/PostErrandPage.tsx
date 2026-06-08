"use client";
import { Errand } from "@/types/errand";
import { useEffect, useState } from "react";
import SectionHeroBanner from "../SectionHeroBanner";
import ErrandDetailsForm from "./ErrandDetailsForm";
import ErrandTypePicker from "./ErrandTypePicker";
import { postService } from "@/services/post.service";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

const PostErrandPage = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [formData, setFormData] = useState<Errand>({
    title: "",
    description: "",
    city: "",
    state: "",
    budget: "",
    dateNeeded: "",
    contactInfo: "",
    photoUrl: "",
    categoryId: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        if (postId) {
          // Fetch specific post by ID
          const response = await postService.findOne(postId);
          const post = response.data;
          setFormData({
            id: post.id,
            title: post.title,
            description: post.description,
            city: post.city,
            state: post.state,
            budget: post.budget?.toString() || "",
            dateNeeded: post.dateNeeded ? new Date(post.dateNeeded).toISOString().split('T')[0] : "",
            contactInfo: post.contactInfo || "",
            photoUrl: post.photoUrl || "",
            categoryId: post.categoryId,
          });
        } else {
          // Optionally fetch user's most recent post as default
          const response = await postService.getMyPosts();
          if (response.data && response.data.length > 0) {
            const post = response.data[0];
            setFormData({
              id: post.id,
              title: post.title,
              description: post.description,
              city: post.city,
              state: post.state,
              budget: post.budget?.toString() || "",
              dateNeeded: post.dateNeeded ? new Date(post.dateNeeded).toISOString().split('T')[0] : "",
              contactInfo: post.contactInfo || "",
              photoUrl: post.photoUrl || "",
              categoryId: post.categoryId,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch post data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostData();
  }, [user, postId]);

  const handleUpdateField = (field: keyof Errand, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to post an errand");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select an errand type");
      return;
    }

    setIsSubmitting(true);
    try {
      if (formData.id) {
        await postService.update(formData.id, formData);
        toast.success("Errand post updated successfully!");
      } else {
        await postService.create(formData);
        toast.success("Errand posted successfully!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save errand");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#efefef]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className='w-full bg-[#efefef] min-h-screen '>
      <SectionHeroBanner
        title={formData.id ? "Edit Your Errand" : "Post an Errand"}
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
            isSubmitting={isSubmitting}
          />
          <ErrandTypePicker
            selectedCategoryId={formData.categoryId}
            onSelect={(id) => handleUpdateField("categoryId", id)}
          />
        </div>
      </div>
    </section>
  );
};

export default PostErrandPage;
