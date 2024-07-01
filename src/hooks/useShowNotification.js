import { useToast } from "@/components/ui/use-toast";
import { useCall } from "@stream-io/video-react-sdk";
import { useEffect, useCallback } from "react";

export const useShowNotification = () => {
  const call = useCall();
  const { toast } = useToast();
  // We don't want to show toast when the user joins themself
  const isSelf = useCallback(
    (userId) => userId === call?.currentUserId,
    [call]
  );

  useEffect(() => {
    if (!call) {
      return;
    }

    const unlistenJoin = call.on("call.session_participant_joined", (event) => {
      if (!isSelf(event.participant.user.id)) {
        toast({
          title: `${event.participant.user.name} joined the call`,
        });
      }
    });

    const unlistenLeft = call.on("call.session_participant_left", (event) => {
      if (!isSelf(event.participant.user.id)) {
        toast({
          title: `${event.participant.user.name} left the call`,
        });
      }
    });

    return () => {
      unlistenJoin();
      unlistenLeft();
    };
  }, [call, isSelf]);
};
