import { Toaster } from "../../components/ui/sonner";
import { ConvexClientProvider } from "../../providers/convex-client.provider";
import ModalProvider from "../../providers/modal-provider";
import Navbar from "./_components/navbar";
import OrgSidebar from "./_components/org-sidebar";
import Sidebar from "./_components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const generateMetadata = () => {
  return {
    title: "Dashboard | Team Boards",
    description: "Your Organization's collaborative space",
  };
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ConvexClientProvider>
      <main className="h-full">
        <Sidebar />
        <div className="pl-[60px] h-full">
          <div className="flex gap-x-3 h-full">
            <OrgSidebar />
            <div className="h-full flex-1">
              <Navbar />
              {children}
              <Toaster />
              <ModalProvider />
            </div>
          </div>
        </div>
      </main>
    </ConvexClientProvider>
  );
};

export default DashboardLayout;
