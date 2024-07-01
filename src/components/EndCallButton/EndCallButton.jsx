"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "../ui/button";
import { FaUsersSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

const EndCallButton = () => {
  const call = useCall();

  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipants = useLocalParticipant();

  const isMeetingOwner =
    localParticipants &&
    call.state.createdBy &&
    localParticipants.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button
      className="bg-red-500 p-2 hover:bg-red-700"
      size="sm"
      onClick={async () => {
        await call.endCall();
        toast({
          variant: "success",
          title: "Call Ended Successfully",
        });
        router.push("/dashboard");
      }}
    >
      End Meeting
      <FaUsersSlash size={18} className="ml-2" />
    </Button>
  );
};

export default EndCallButton;
