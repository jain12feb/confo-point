import CallList from "@/components/CallList/CallList";
import React from "react";
import { types } from "../../../../constants";

const Previous = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Previous Meetings</h1>

      <CallList type={types.ended} />
    </section>
  );
};

export default Previous;
