import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata = {
  title: "ConfoPoint",
  description: "Video Meeting App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function HomeLayout({ children }) {
  return (
    <div className="bg-dark-2">
      <main className="relative">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-24 max-md:pb-14 sm:px-10">
            <div className="w-full">{children}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
