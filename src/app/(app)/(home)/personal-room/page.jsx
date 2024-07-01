"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs"; // Import bcryptjs
import CryptoJS from "crypto-js"; // Import crypto-js

const Table = ({ title, description, children }) => {
  return (
    <div className="flex flex-col items-center gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
      {children}
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const [meetingId, setMeetingId] = useState("");
  const [passcode, setPasscode] = useState("");

  useEffect(() => {
    if (!user) return;

    // Generate a unique key for this user using bcryptjs
    const userKey = bcrypt.hashSync(user?.id.toString(), 10);

    // Check if meetingId and passcode are already stored in localStorage
    const storedMeetingIdEncrypted = localStorage.getItem(
      `meetingId_${userKey}`
    );
    const storedPasscodeEncrypted = localStorage.getItem(`passcode_${userKey}`);

    if (storedMeetingIdEncrypted && storedPasscodeEncrypted) {
      // Decrypt stored data
      const storedMeetingId = decryptData(storedMeetingIdEncrypted);
      const storedPasscode = decryptData(storedPasscodeEncrypted);

      setMeetingId(storedMeetingId);
      setPasscode(storedPasscode);
    } else {
      const newMeetingId = user?.id; // You can replace with your own logic for meetingId
      const newPasscode = generatePasscode();

      setMeetingId(newMeetingId);
      setPasscode(newPasscode);

      // Encrypt and store data
      const encryptedMeetingId = encryptData(newMeetingId);
      const encryptedPasscode = encryptData(newPasscode);

      localStorage.setItem(`meetingId_${userKey}`, encryptedMeetingId);
      localStorage.setItem(`passcode_${userKey}`, encryptedPasscode);
    }
  }, [user]);

  const { call } = useGetCallById(meetingId);

  const generatePasscode = () => {
    const min = 100000; // Inclusive
    const max = 999999; // Inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const regeneratePasscode = () => {
    const newPasscode = generatePasscode();
    setPasscode(newPasscode);

    // Update localStorage and optionally call configuration
    const userKey = bcrypt.hashSync(user?.id.toString(), 10);
    const encryptedPasscode = encryptData(newPasscode);

    localStorage.setItem(`passcode_${userKey}`, encryptedPasscode);

    if (call) {
      call.update({
        custom: {
          description: `${user?.username}'s personal meeting`,
          code: newPasscode,
          isPersonal: true,
        },
      });
    }
  };

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          settings_override: {
            recording: {
              mode: "disabled",
            },
          },
          custom: {
            description: `${user?.username}'s personal meeting`,
            code: passcode,
            isPersonal: true,
          },
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data.toString(), "secret key").toString();
  };

  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, "secret key");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId} />
        {/* <Table title="Invite Link" description={meetingLink} /> */}
        <Table title="Passcode" description={passcode}>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={regeneratePasscode}
          >
            Generate New Passcode
          </Button>
        </Table>
      </div>
      <div className="flex justify-center items-center xl:justify-start xl:items-start gap-5">
        <Button className="bg-blue-1 " onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Meeting Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
