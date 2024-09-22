import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import OrganisationSidebar from "./_components/org-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-full bg-background">
      <Sidebar />
      <div className="flex h-full w-full">
        <OrganisationSidebar />
        <div className="h-full flex-1">
          <Navbar />
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
