import { Inter } from "next/font/google";
import "video-react/dist/video-react.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ConfoPoint",
  description: "Video Meeting App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/logo.svg",
            logoLinkUrl: "/",
            socialButtonsPlacement: "bottom",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
            colorNeutral: "#fff",
          },
        }}
      >
        <Suspense fallback={<Loading />}>
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </Suspense>
      </ClerkProvider>
    </html>
  );
}
