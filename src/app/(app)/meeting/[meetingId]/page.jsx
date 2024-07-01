"use client";

import Alert from "@/components/Alert/Alert";
import Loader from "@/components/Loader/Loader";
import MeetingRoom from "@/components/MeetingRoom/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup/MeetingSetup";
import PasscodeAlert from "@/components/PasscodeAlert/PasscodeAlert";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";

const Meeting = ({ params: { meetingId } }) => {
  if (!meetingId) notFound();

  const { user, isLoaded } = useUser();

  const router = useRouter();
  const { toast } = useToast();

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const [verifyPasscode, setVerifyPasscode] = useState(false);

  const { call, isCallLoading } = useGetCallById(meetingId);

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) {
    return (
      <div className="h-screen w-full bg-dark-2">
        <Alert title="The meeting you are trying to join does not exist or has been deleted" />
      </div>
    );
  }

  const isPasscode = call?.state?.custom?.code;

  const isPersonal = call?.state?.custom?.isPersonal;

  if (!!isPasscode && !verifyPasscode && !call.isCreatedByMe)
    return (
      <PasscodeAlert code={isPasscode} setVerifyPasscode={setVerifyPasscode} />
    );

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed =
    call.type === "invited" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed)
    return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className="h-screen w-full bg-dark-2">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup
              isCreatedByMe={call.isCreatedByMe}
              setIsSetupComplete={setIsSetupComplete}
              desc={call?.state?.custom?.description}
              code={call?.state?.custom?.code}
            />
          ) : (
            <MeetingRoom
              isPersonal={isPersonal}
              handleLeave={() => {
                router.push("/dashboard");
                toast({
                  title: "You left the call",
                });
              }}
            />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
