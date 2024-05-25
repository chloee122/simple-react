import type { MenuItemType } from "./data";
import MenuList from "./MenuList";

interface TreeViewProps {
  menu: MenuItemType[];
}

export default function TreeView({ menu }: TreeViewProps) {
  return <MenuList menu={menu} />;
}
