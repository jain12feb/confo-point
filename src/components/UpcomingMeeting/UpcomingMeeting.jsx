"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { CalendarIcon } from "@radix-ui/react-icons";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const UpcomingMeeting = () => {
  const [latestMeeting, setLatestMeeting] = useState();

  const { upcomingCalls, isLoading } = useGetCalls();

  useEffect(() => {
    const latest = upcomingCalls
      .map((call) => call?.state?.startsAt)
      .sort((a, b) => new Date(a) - new Date(b))[0];

    setLatestMeeting(latest);
  }, [upcomingCalls]);

  if (isLoading) return null;

  return (
    <h2 className="flex justify-evenly items-center glassmorphism max-w-[230px] rounded-lg py-2 text-center text-sm text-sky-3 select-none font-normal">
      <CalendarIcon width={30} height={30} />
      <div className="flex flex-col items-center justify-center">
        {upcomingCalls && upcomingCalls.length > 0 ? (
          <Link href="/upcoming">
            <h1 className="text-sm font-normal">Upcoming Meeting</h1>
            <p className="text-base font-semibold">
              {moment(latestMeeting).calendar()}
            </p>
          </Link>
        ) : (
          <>
            <h1 className="text-sm font-normal">No Upcoming Meetings</h1>
          </>
        )}
      </div>
    </h2>
  );
};

export default UpcomingMeeting;
