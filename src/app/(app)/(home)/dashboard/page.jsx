import MeetingTypeLists from "@/components/MeetingTypeLists/MeetingTypeLists";
import UpcomingMeeting from "@/components/UpcomingMeeting/UpcomingMeeting";
import { CalendarIcon } from "@radix-ui/react-icons";
import moment from "moment";

const dashboard = () => {
  return (
    <section className="flex size-full flex-col gap-7 text-white">
      {/* <h1 className="text-3xl font-bold">Dashboard</h1> */}
      <div className="h-[200px] md:h-[240px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between gap-2 max-md:px-5 p-6">
          {/* <h2 className="flex justify-around items-center glassmorphism max-w-[250px] rounded py-2 text-center text-sm font-normal"> */}
          {/* <CalendarIcon className="mr-1" width={30} height={30} /> */}
          <UpcomingMeeting />
          {/* </h2> */}
          <div className="cflex flex-col gap-2 select-none">
            <h1 className="text-4xl font-extrabold lg:text-6xl">
              {moment().format("LT")}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">
              {moment().format("dddd") + ", " + moment().format("LL")}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeLists />
    </section>
  );
};

export default dashboard;
