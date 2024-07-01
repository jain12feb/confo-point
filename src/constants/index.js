export const SidebarOptions = [
  {
    label: "Dashboard",
    imgUrl: "/icons/Home.svg",
    route: "/dashboard",
  },
  {
    label: "Upcoming",
    imgUrl: "/icons/upcoming.svg",
    route: "/upcoming",
  },
  {
    label: "Previous",
    imgUrl: "/icons/previous.svg",
    route: "/previous",
  },
  {
    label: "Recordings",
    imgUrl: "/icons/Video.svg",
    route: "/recordings",
  },
  {
    label: "Personal Room",
    imgUrl: "/icons/add-personal.svg",
    route: "/personal-room",
  },
];

export const MeetingState = Object.freeze({
  isInstantMeeting: "isInstantMeeting",
  isJoiningMeeting: "isJoiningMeeting",
  isScheduleMeeting: "isScheduleMeeting",
});

export const types = Object.freeze({
  upcoming: "upcoming",
  ended: "ended",
  recordings: "recordings",
});

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];
