"use client";

import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RocketIcon } from "@radix-ui/react-icons";
import Alert from "../Alert/Alert";
import moment from "moment";

const MeetingSetup = ({ setIsSetupComplete, desc, code, isCreatedByMe }) => {
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(true);

  const { camera, microphone, join } = useCall();

  useEffect(() => {
    if (isMicCamToggleOn) {
      camera.disable();
      microphone.disable();
    } else {
      camera.enable();
      microphone.enable();
    }
  }, [isMicCamToggleOn, camera, microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${moment(
          callStartsAt
        ).format("LLLL")}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full mx-auto flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">
        {/* <span className="text-red-500">🔴</span> */}
        {desc
          ? desc + (isCreatedByMe && code ? ` - ${code}` : "")
          : "Meeting Setup"}
      </h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label
          htmlFor="mic_cam"
          className="flex items-center justify-center gap-2 font-medium"
        >
          <input
            className="w-5 h-5"
            id="mic_cam"
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings visualType="menu" />
      </div>

      <Button
        onClick={() => {
          join();
          setIsSetupComplete(true);
        }}
        size="lg"
        className="rounded-md bg-green-500 px-4 py-2.5 font-semibold"
      >
        Join Meeting
        <RocketIcon className="w-5 h-5 ml-2 font-semibold" fontWeight={600} />
      </Button>
    </div>
  );
};

export default MeetingSetup;
