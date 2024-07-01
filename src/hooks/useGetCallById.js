import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id) => {
  const [call, setCall] = useState();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        const { calls, duration, next, prev } = await client.queryCalls({
          filter_conditions: {
            id: id,
          },
        });

        if (calls.length > 0) setCall(calls[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
