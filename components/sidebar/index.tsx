import { SidebarContent } from "./content";

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-none flex-col overflow-y-auto border-r bg-white px-4 py-8 shadow-sm">
      <SidebarContent />
    </aside>
  );
}
