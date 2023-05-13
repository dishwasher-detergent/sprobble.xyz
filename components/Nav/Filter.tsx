import {
  LucideArrowDown01,
  LucideArrowUp01,
  LucideLayoutGrid,
  LucideLayoutList,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Query } from "appwrite";

interface FilterBarProps {
  sort: () => void;
  sortValue: string;
  layout: () => void;
  layoutValue: string;
}

export default function FilterBar({
  sort,
  sortValue,
  layout,
  layoutValue,
}: FilterBarProps) {
  return (
    <NavigationMenu className="p-1 flex-none h-12 rounded-lg border-slate-200 border justify-between">
      <NavigationMenuList>
        <NavigationMenuItem>
          <h1 className="px-2 font-bold">Sprobble.xyz</h1>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Button variant="ghost" onClick={sort}>
            {sortValue == Query.orderAsc("played_at") ? (
              <LucideArrowUp01 />
            ) : (
              <LucideArrowDown01 />
            )}
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button variant="ghost" onClick={layout}>
            {layoutValue == "grid" ? (
              <LucideLayoutGrid />
            ) : (
              <LucideLayoutList />
            )}
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
