import { Suspense } from "react";
import ChatContainer from "@/components/dashboard/message/realtime/ChatContainer";
import PageHeader from "@/components/dashboard/common/PageHeader";
import { Loader2 } from "lucide-react";

const MessagesPage = () => {
  return (
    <div className='w-full p-6'>
      <PageHeader title='Inbox' />
      <Suspense fallback={
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }>
        <ChatContainer />
      </Suspense>
    </div>
  );
};

export default MessagesPage;
