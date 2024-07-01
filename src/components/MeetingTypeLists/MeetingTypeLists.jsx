"use client";

import { useState } from "react";
import MeetingCard from "../MeetingCard/MeetingCard";
import { useRouter } from "next/navigation";
import MeetingModal from "../MeetingModal/MeetingModal";
import { MeetingState } from "../../constants";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Textarea } from "../ui/textarea";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import { Input } from "../ui/input";

const MeetingTypeLists = () => {
  const [meetingState, setMeetingState] = useState(undefined);

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState();

  const router = useRouter();

  const { toast } = useToast();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const startMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({
          variant: "destructive",
          title: "Please select a date and time",
        });

        return;
      }

      const callId = crypto.randomUUID();
      const call = client.call("default", callId);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        variant: "success",
        title: "Meeting Created successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to create meeting",
        action: (
          <ToastAction onClick={() => startMeeting()} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <MeetingCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        desc="Start an instant meeting"
        bgColor="bg-orange-1"
        handleClick={() => setMeetingState(MeetingState.isInstantMeeting)}
      />
      <MeetingCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        desc="Connect via invite link"
        bgColor="bg-blue-1"
        handleClick={() => setMeetingState(MeetingState.isJoiningMeeting)}
      />
      <MeetingCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        desc="Plan your meeting"
        bgColor="bg-purple-1"
        handleClick={() => setMeetingState(MeetingState.isScheduleMeeting)}
      />
      <MeetingCard
        img="/icons/recordings.svg"
        title="Recordings"
        desc="View your recordings"
        bgColor="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === MeetingState.isScheduleMeeting}
          onClose={() => setMeetingState(undefined)}
          title="Schedule a Meeting"
          buttonText="Schedule"
          handleClick={startMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add Meeting Description
            </label>
            <Textarea
              placeholder="Daily Status Updates Meeting, Meeting with Client, 1 to 1 Meeting"
              className="min-h-[60px] border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <DatePicker
              closeOnScroll={true}
              selected={values.dateTime}
              showPreviousMonths={false}
              onChange={(date) => {
                if (new Date(date) < new Date()) {
                  toast({
                    title: "Please select a date in the future",
                    variant: "destructive",
                  });
                } else {
                  setValues({ ...values, dateTime: date });
                }
              }}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={
                <Input
                  className2="w-full rounded bg-dark-3 px-2 py-1 text-white"
                  icon={<FaCalendarAlt />}
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white cursor-pointer"
                />
              }
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === MeetingState.isScheduleMeeting}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Scheduled"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Meeting Link Copied",
            });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === MeetingState.isInstantMeeting}
        onClose={() => setMeetingState(undefined)}
        title="Create an Instant Meeting"
        className="text-center"
        buttonText="Start now"
        handleClick={startMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Link"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="paste meeting link here"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeLists;
