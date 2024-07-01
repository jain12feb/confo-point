import React from "react";
import { types } from "../../../../constants";
import CallList from "@/components/CallList/CallList";

const Recordings = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Meeting Recordings</h1>

      <CallList type={types.recordings} />
    </section>
  );
};

export default Recordings;
