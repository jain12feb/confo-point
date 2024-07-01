"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  description,
  className,
  buttonText,
  handleClick,
  image,
  buttonIcon,
  children,
  maxWidth,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          "flex w-full max-w-[520px] md:rounded-[7px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white",
          maxWidth
        )}
      >
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <div>
            <DialogHeader>
              <DialogTitle
                className={cn(
                  "text-3xl font-bold leading-[42px] mb-2",
                  className
                )}
              >
                {title}
              </DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="text-base leading-[26px] flex flex-col gap-4">
              {children}
            </div>
          </div>
          {/* {children} */}
          {buttonText && (
            <Button
              onClick={handleClick}
              className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[7px]"
            >
              {buttonIcon && (
                <Image
                  src={buttonIcon}
                  alt="button icon"
                  width={20}
                  height={20}
                />
              )}
              &nbsp;
              {/* {buttonText || "Schedule Meeting"} */}
              {buttonText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
