import StreamVideoProvider from "@/providers/StreamClientProvider";

export const metadata = {
  title: "ConfoPoint",
  description: "Video Meeting App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function AppLayout({ children }) {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
}
