import PostErrandPage from "@/components/website/postErrand/PostErrandPage";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const page = () => {
  return (
    <div>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#efefef]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      }>
        <PostErrandPage />
      </Suspense>
    </div>
  );
};

export default page;
