"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { avatarImages } from "../../constants";
import moment from "moment";

const CallCard = ({
  icon,
  title,
  createdBy,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}) => {
  const { toast } = useToast();

  return (
    <section className="flex min-h-[220px] w-full flex-col justify-between rounded-[14px] bg-dark-1 p-5 xl:max-w-[500px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">
              {moment(new Date(date)).format("LLLL")}
            </p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-between items-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full border-[3px] border-dark-2", {
                absolute: index > 0,
              })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex justify-center items-center absolute left-[140px] size-10 rounded-full border-[3px] border-dark-2 bg-dark-3">
            {/* +{Math.floor(Math.random() * 9) + 1} */}
            +5
          </div>
        </div>
        {buttonText && (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleClick} className=" bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            {!isPreviousMeeting && (
              <Button
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  toast({
                    title: "Link Copied",
                  });
                }}
                className="bg-dark-4 px-6"
              >
                <Image
                  src="/icons/copy.svg"
                  alt="feature"
                  width={20}
                  height={20}
                />
                &nbsp; Copy Link
              </Button>
            )}
          </div>
        )}
      </article>
    </section>
  );
};

export default CallCard;
