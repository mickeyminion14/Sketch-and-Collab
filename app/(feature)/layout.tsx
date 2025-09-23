import { Metadata } from "next";
import { Toaster } from "../../components/ui/sonner";
import { ConvexClientProvider } from "../../providers/convex-client.provider";
import ModalProvider from "../../providers/modal-provider";

export const metadata: Metadata = {
  title: "Team Boards",
  description: "Your Organization's collaborative space",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <Toaster />
      <ModalProvider />
      {children}
    </ConvexClientProvider>
  );
}
