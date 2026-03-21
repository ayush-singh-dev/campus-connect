import { ChatProvider } from "@/hooks/ChatContext";
import { QuestionList } from "@/components/studentsComponent/chat/QuestionList";
import { useParams } from "react-router-dom";
import ChannelList from "@/components/studentsComponent/chat/channelList";
import AiBuddy from "@/components/aiBuddy";

export default function ChannelPage() {
  const { channelId } = useParams();

  return (
    <ChatProvider>
      <div className="min-h-screen background-gradient flex pt-14">
        <ChannelList />
        <QuestionList channelId={channelId} />
        <div className="w-64 border-l border-border p-4 space-y-6">
          <AiBuddy />
        </div>
      </div>
    </ChatProvider>
  );
}
