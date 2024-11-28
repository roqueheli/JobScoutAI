import { LegalNavigation } from "@/components/legal/legal-navigation";
import { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <LegalNavigation />
      <main>{children}</main>
    </div>
  );
}
