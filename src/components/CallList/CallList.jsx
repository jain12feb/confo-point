"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { types } from "../../constants";
import { useEffect, useState } from "react";
import CallCard from "../CallCard/CallCard";
import Image from "next/image";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import MeetingModal from "../MeetingModal/MeetingModal";
import {
  ControlBar,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  VolumeMenuButton,
} from "video-react";
import { useCall } from "@stream-io/video-react-sdk";

const CallList = ({ type }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  const call = useCall();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const [recordings, setRecordings] = useState([]);

  const [isRecVidOpen, setIsRecVidOpen] = useState(false);
  const [recVidLink, setRecVidLink] = useState("");
  const [recVidTitle, setRecVidTitle] = useState("Recording");

  const getCalls = () => {
    switch (type) {
      case types.ended:
        return endedCalls;

      case types.recordings:
        return recordings;

      case types.upcoming:
        return upcomingCalls;

      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case types.ended:
        return "No Previous Calls";

      case types.recordings:
        return "No Call Recordings";

      case types.upcoming:
        return "No Upcoming Calls";

      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      setLoading(true);
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error fetching recordings",
          description: "Too many requests. Please try again later",
          variant: "destructive",
          action: (
            <ToastAction onClick={fetchRecordings} altText="Try again">
              Try again
            </ToastAction>
          ),
        });
      } finally {
        setLoading(false);
      }
    };

    if (type === types.recordings) {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading || loading)
    return (
      <div className="flex justify-center items-center">
        <Image
          src="/icons/loading-circle.svg"
          alt="loading"
          width={50}
          height={50}
        />
      </div>
    );

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <>
      {calls && calls.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {calls.map((meeting, i) => (
            <CallCard
              key={meeting.id || i}
              icon={
                type === types.ended
                  ? "/icons/previous.svg"
                  : type === types.upcoming
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              title={
                meeting.state?.custom?.description ||
                meeting.filename?.substring(0, 20) ||
                "No Description"
              }
              createdBy={meeting?.state?.createdBy?.name}
              date={
                meeting.state?.startsAt?.toLocaleString() ||
                meeting.start_time?.toLocaleString()
              }
              isPreviousMeeting={type === types.ended}
              link={
                type === types.recordings
                  ? meeting.url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
              }
              buttonIcon1={
                type === types.recordings ? "/icons/play.svg" : undefined
              }
              buttonText={
                type === types.recordings
                  ? "Play Recording"
                  : type === types.upcoming
                  ? "Start Meeting"
                  : !meeting?.state?.endedAt
                  ? "Join Meeting"
                  : undefined
              }
              handleClick={
                type === types.recordings
                  ? () => {
                      setIsRecVidOpen(true);
                      setRecVidLink(meeting.url);
                      setRecVidTitle(meeting.filename?.substring(0, 20));
                    }
                  : () => router.push(`/meeting/${meeting.id}`)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-20 md:mt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            width="300px"
            height="300px"
            viewBox="0 0 647.63626 632.17383"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#f2f2f2"
            />
            <path
              d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#3f3d56"
            />
            <path
              d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#6c63ff"
            />
            <circle cx="190.15351" cy="24.95465" r={20} fill="#6c63ff" />
            <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff" />
            <path
              d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#e6e6e6"
            />
            <path
              d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#3f3d56"
            />
            <path
              d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#6c63ff"
            />
            <circle cx="433.63626" cy="105.17383" r={20} fill="#6c63ff" />
            <circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff" />
            <text
              className="select-none text-dark-2 font-bold text-3xl leading-10 opacity-85"
              x="67%"
              y="60%"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {noCallsMessage}
            </text>
          </svg>
        </div>
      )}

      <MeetingModal
        isOpen={isRecVidOpen}
        onClose={() => setIsRecVidOpen(false)}
        title={recVidTitle}
        maxWidth="max-w-[850px]"
      >
        <Player src={recVidLink} autoPlay controls playsInline>
          <ControlBar autoHide={false}>
            <ReplayControl seconds={10} order={3} />
            <ForwardControl seconds={10} order={4} />
            <VolumeMenuButton vertical />
            <PlaybackRateMenuButton />
          </ControlBar>
        </Player>
      </MeetingModal>
    </>
  );
};

export default CallList;
