import React from "react";
import NewButton from "./new-button";
import OrganisationsList from "./lists";

const Sidebar = () => {
  return (
    <aside className="flex h-auto min-w-14 flex-col items-center gap-y-2 border-r bg-background bg-blue-950 p-3 text-white">
      <OrganisationsList />
      <NewButton />
    </aside>
  );
};

export default Sidebar;
