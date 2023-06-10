import { SidebarContent } from "@/components/sidebar/content";

export function Sidebar() {
  return (
    <aside className="hidden h-full w-64 flex-none flex-col overflow-y-auto border-r bg-background px-4 py-8 shadow-sm md:flex">
      <SidebarContent />
    </aside>
  );
}
