import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { BookOpen, Search, Users } from "lucide-react";
import { Input } from "../ui/input";
import { useChannels } from "@/hooks/useChannels";
import { Button } from "../ui/button";

const MyChannels = () => {
  const [channelSearch, setChannelSearch] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [joining, setJoining] = useState(false);

  const navigate = useNavigate();

  const {
    channels,
    searchResults,
    searchChannels,
    fetchMyChannels,
    joinChannel,
    loading,
  } = useChannels();

  useEffect(() => {
    fetchMyChannels();
  }, []);

  const handleConfirmJoin = async () => {
    if (!accessCode.trim() || !selectedChannel) return;

    try {
      setJoining(true);

      await joinChannel({
        channelId: selectedChannel.id,
        accessCode,
      });

      setAccessCode("");
      setSelectedChannel(null);

      await fetchMyChannels();

      navigate(`/channel/${selectedChannel.id}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setJoining(false);
    }
  };

  const handleChannelSearchChange = async (value) => {
    setChannelSearch(value);

    if (!value.trim()) return;

    await searchChannels(value);
  };

  const discoverChannels =
    channelSearch.trim() === ""
      ? []
      : searchResults.filter(
          (ch) => !channels.some((joined) => joined.id === ch.id),
        );

  return (
    <>
      <Card className="card-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="w-5 h-5 text-primary" />
            Find Channels
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

            <Input
              placeholder="Search Channels..."
              value={channelSearch}
              onChange={(e) => handleChannelSearchChange(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          {/* My Channels */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">My Channels</p>

            {loading ? (
              <p className="text-xs text-muted-foreground">Loading...</p>
            ) : channels.length > 0 ? (
              channels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => navigate(`/channel/${channel.id}`)}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      channel.color || "bg-primary"
                    } mr-3`}
                  />

                  <div className="flex-1">
                    <div className="text-sm font-medium">{channel.name}</div>

                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {channel.member_count ?? 0} members
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">
                You haven't joined any channels yet
              </p>
            )}
          </div>

          {/* Discover Channels */}
          {channelSearch.trim() !== "" && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">
                Discover Channels
              </p>

              {discoverChannels.length > 0 ? (
                discoverChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedChannel(channel)}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary mr-3" />

                    <div className="flex-1">
                      <div className="text-sm font-medium">{channel.name}</div>

                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {channel.member_count ?? 0} members
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">
                  No channels found
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Join Dialog */}
      <Dialog
        open={!!selectedChannel}
        onOpenChange={() => {
          setSelectedChannel(null);
          setAccessCode("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join {selectedChannel?.name}</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Enter access code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedChannel(null)}>
              Cancel
            </Button>

            <Button onClick={handleConfirmJoin} disabled={joining}>
              {joining ? "Joining..." : "Join"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyChannels;
