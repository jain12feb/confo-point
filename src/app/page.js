import React from "react";
import Image from "next/image";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const Home = () => {
  const userReviews = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/images/avatar-2.jpeg",
      review:
        "ConfoPoint has completely transformed how we conduct our virtual meetings. The ease of use and security features are exceptional!",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/images/avatar-1.jpeg",
      review:
        "As a team manager, I rely on ConfoPoint for its reliability and user-friendly interface. Scheduling and joining meetings has never been easier.",
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "/images/avatar-3.png",
      review:
        "I love how secure ConfoPoint is. Hosting private meetings with a passcode gives me peace of mind knowing my discussions are protected.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-2 to-dark-4 text-sky-1">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="flex justify-center items-center w-[100px] h-[100px] md:w-[180px] md:h-[180px] mx-auto">
          <Image src="/icons/logo.svg" alt="logo" width={1000} height={1000} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to ConfoPoint
          </h1>
          <p className="text-justify md:text-center text-lg md:text-xl mb-8 leading-relaxed">
            Elevate your virtual collaboration with ConfoPoint — the ultimate
            solution for instant meetings, secure conferences, and effortless
            scheduling. Unlock the power of virtual meetings with ConfoPoint.
          </p>
          <div className="my-8 text-center">
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md mr-4 transition-colors duration-300"
                >
                  Get Started <RocketIcon className="w-5 h-5 ml-2" />
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
          <p className="text-justify md:text-center text-lg md:text-xl mb-8 leading-relaxed">
            Instantly join or schedule meetings, protect your discussions with
            advanced security, and access recordings for future reference.
            Discover ConfoPoint — where seamless meetings and ironclad security
            converge. From instant connections to private sessions, redefine
            your virtual conferencing experience. ConfoPoint empowers you with
            instant access to meetings, robust security features, and
            easy-to-use scheduling tools. Elevate your remote collaboration
            effortlessly.
          </p>
        </div>

        {/* Features section */}
        <div className="text-center pb-6">
          <h1 className="text-2xl md:text-4xl font-bold">
            Our Stunning Features
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="min-w-[300px] flex justify-around items-center gap-5 bg-dark-3 bg-opacity-50 rounded-lg shadow-lg p-6">
            <Image
              src="/icons/Video.svg"
              alt="instant-meeting"
              width={75}
              height={75}
            />
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Instant Meetings
              </h2>
              <p className="text-base md:text-lg mb-4">
                Start meetings instantly with one click.
              </p>
            </div>
          </div>
          <div className="min-w-[300px] flex justify-around items-center gap-5 bg-dark-3 bg-opacity-50 rounded-lg shadow-lg p-6">
            <Image
              src="/icons/schedule.svg"
              alt="schedule-meeting"
              width={75}
              height={75}
            />
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Schedule Meetings
              </h2>
              <p className="text-base md:text-lg mb-4">
                Plan ahead with our easy scheduling feature.
              </p>
            </div>
          </div>
          <div className="min-w-[300px] flex justify-around items-center gap-5 bg-dark-3 bg-opacity-50 rounded-lg shadow-lg p-6">
            <Image
              src="/icons/share.svg"
              alt="join-meeting"
              width={75}
              height={75}
            />
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Join Meetings via Link
              </h2>
              <p className="text-base md:text-lg mb-4">
                Join meetings effortlessly using a meeting link.
              </p>
            </div>
          </div>
          <div className="min-w-[300px] flex justify-around items-center gap-5 bg-dark-3 bg-opacity-50 rounded-lg shadow-lg p-6">
            <Image
              src="/icons/join-meeting.svg"
              alt="add-personal"
              width={75}
              height={75}
            />
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Secure Personal Meetings
              </h2>
              <p className="text-base md:text-lg mb-4">
                Host private meetings secured with a passcode.
              </p>
            </div>
          </div>
        </div>

        {/* User Reviews section */}
        <div className="mt-12">
          <div className="text-center pb-6">
            <h1 className="text-2xl md:text-4xl font-bold">
              What Users Says about Us
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userReviews.map((review) => (
              <div
                key={review.id}
                className="bg-dark-1 bg-opacity-50 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      className="rounded-full"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                  </div>
                </div>
                <p className="text-base mb-4">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-sm text-gray-400 bg-gray-900 p-4 text-center">
        <p>&copy; 2024 ConfoPoint. All rights reserved.</p>
        <p>Made and Developed with ❤️ by Prince Jain.</p>
      </footer>
    </div>
  );
};

export default Home;
