"use client";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

const PasscodeAlert = ({ code, setVerifyPasscode }) => {
  const [pass, setPass] = useState("");
  const { toast } = useToast();
  return (
    <section className="flex justify-center items-center h-screen w-full bg-dark-2">
      <Card className="w-full max-w-[550px] border-none bg-dark-1 p-6 py-9 text-white">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              {/* {iconUrl && (
                <div className="flex justify-center items-center">
                  <Image src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )} */}
              <p className="text-center text-xl font-semibold">
                Enter 6 digit Pass Code
              </p>
              <Input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full rounded bg-dark-3 px-2 py-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
              />
            </div>

            <Button
              className="bg-blue-1"
              onClick={() => {
                if (pass == code) {
                  setPass("");
                  setVerifyPasscode(true);
                  toast({
                    title: "Passcode Verified",
                    variant: "success",
                  });
                } else {
                  setPass("");
                  toast({
                    title: "Wrong passcode",
                    description: "Please try again",
                    variant: "destructive",
                  });
                }
              }}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PasscodeAlert;
