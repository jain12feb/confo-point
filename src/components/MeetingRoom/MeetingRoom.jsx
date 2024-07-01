"use client";

import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiLayoutGridFill, RiLayout2Fill, RiLayout4Fill } from "react-icons/ri";
import { useSearchParams } from "next/navigation";
import EndCallButton from "../EndCallButton/EndCallButton";
import { LiaUsersSolid } from "react-icons/lia";
import Loader from "../Loader/Loader";
import Alert from "../Alert/Alert";
import { useShowNotification } from "@/hooks/useShowNotification";

const CallLayoutType = Object.freeze({
  grid: "grid",
  speaker_left: "speaker-left",
  speaker_right: "speaker-right",
});

const MeetingRoom = ({ handleLeave, isPersonal }) => {
  const searchparams = useSearchParams();

  const isPersonalRoom = !!searchparams.get("personal") || isPersonal;

  const [layout, setLayout] = useState(CallLayoutType.speaker_left);

  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState, useCallSession } = useCallStateHooks();

  const callSession = useCallSession();

  const callingState = useCallCallingState();

  useShowNotification();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel

  if (callSession?.ended_at) {
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );
  }

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case CallLayoutType.grid:
        return <PaginatedGridLayout />;

      case CallLayoutType.speaker_right:
        return <SpeakerLayout participantsBarPosition="left" />;

      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <>
      {/* {useNotificationSounds()} */}
      <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
        <div className="relative flex size-full items-center justify-center">
          <div className="flex size-full max-w-[1000px] items-center">
            <CallLayout />
          </div>
          <div
            className={cn("h-[calc(100vh-86px)] hidden", {
              "show-block": showParticipants,
            })}
          >
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        </div>
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap px-1">
          <CallControls onLeave={handleLeave} />
          <DropdownMenu>
            <div className="flex items-center" title="Change Layout">
              <DropdownMenuTrigger className="cursor-pointer rounded-full bg-[#19232d] p-2 hover:bg-[#323b44]">
                {layout === "grid" && <RiLayoutGridFill size={20} />}
                {layout === "speaker-left" && <RiLayout2Fill size={20} />}
                {layout === "speaker-right" && <RiLayout4Fill size={20} />}
                {/* <DashboardIcon className="w-5 h-5" /> */}
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-none bg-[#19232d] shadow-[#000000a3] font-semibold text-white">
              {["Grid", "Speaker-Left", "Speaker-Right"].map((v, i) => (
                <div key={i}>
                  <DropdownMenuItem
                    className="cursor-pointer focus:bg-[#4c8fff]"
                    onClick={() => setLayout(v.toLowerCase())}
                  >
                    {v}
                  </DropdownMenuItem>
                  {i < 2 && <DropdownMenuSeparator className="bg-dark-2" />}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((p) => !p)}>
            <div
              title="Participants"
              className="cursor-pointer rounded-full bg-[#19232d] p-2 hover:bg-[#323b44]"
            >
              <LiaUsersSolid size={22} />
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </section>
    </>
  );
};

export default MeetingRoom;
