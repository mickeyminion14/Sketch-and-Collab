import { Toaster } from "../../components/ui/sonner";
import { ConvexClientProvider } from "../../providers/convex-client.provider";
import ModalProvider from "../../providers/modal-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <Toaster />
      <ModalProvider />
      {children}
    </ConvexClientProvider>
  );
}
