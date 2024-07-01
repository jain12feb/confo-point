import CallList from "@/components/CallList/CallList";
import { types } from "../../../../constants";

const Upcoming = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Upcoming Meetings</h1>

      <CallList type={types.upcoming} />
    </section>
  );
};

export default Upcoming;
