import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useChannels } from "@/hooks/useChannels";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,} from "@/components/ui/dialog";
import { DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";

const AddChannelbtn = () => {
    const {loading,createChannel} = useChannels();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
      name: "",
      description: "",
      accessCode: "",
    });
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await createChannel(form);
        setForm({ name: "", description: "", accessCode: "" });
        setOpen(false);
      } catch (err) {
        alert(err.message);
      }
    };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button size="sm" className="flex gap-2 primary-gradient hover:scale-105 transition-smooth cursor-pointer">
          <Plus size={16} className="w-4 h-4 mr-1" />
          Add Channel
        </Button>
      </DialogTrigger>
      {/* Popup Content */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Channel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Channel Name */}
          <div className="space-y-1">
            <Label>Channel Name</Label>
            <Input
              placeholder="DSA Doubts"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              placeholder="Discuss all DSA related questions"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Access Code */}
          <div className="space-y-1">
            <Label>Access Code</Label>
            <Input
              placeholder="DSA2025"
              value={form.accessCode}
              onChange={(e) => setForm({ ...form, accessCode: e.target.value })}
              required
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Channel"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );    
};

export default AddChannelbtn;
