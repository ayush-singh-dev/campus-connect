import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChannels } from "@/hooks/useChannels";
import { BookOpen, Hash, Users } from "lucide-react";

const ChannelList = () => {
  const navigate = useNavigate();
  const {
    channels,
    loading,
  } = useChannels();
  return (
    <div className="w-64 bg-muted/30 border-r border-border">
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Channels
        </h2>
        <div className="space-y-1">
          {loading ? (
            <p className="text-xs text-muted-foreground">Loading...</p>
          ) : channels.length > 0 ? (
            channels.map((channel) => (
              <div
                key={channel.id}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-smooth ${
                  channel.active
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => navigate(`/channel/${channel.id}`)}
              >
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{channel.name}</span>
                    <span className="text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      {channel.member_count ?? 0} members
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-sm text-muted-foreground">
              You haven't joined any channels yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
