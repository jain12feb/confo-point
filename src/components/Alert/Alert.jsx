import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const Alert = ({ title, iconUrl, icon }) => {
  return (
    <section className="flex justify-center items-center h-screen w-full bg-dark-2">
      <Card className="w-full max-w-[550px] border-none bg-dark-1 p-6 py-9 text-white">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                <div className="flex justify-center items-center">
                  <Image src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )}
              {icon && (
                <div className="flex justify-center items-center">{icon}</div>
              )}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>

            <Button asChild className="bg-blue-1">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
