import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import OrganisationSidebar from "./_components/org-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-auto min-h-full bg-background">
      <Sidebar />
      <div className="flex h-auto w-full">
        <OrganisationSidebar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
