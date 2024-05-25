import type { MenuItemType } from "./data";
import MenuItem from "./MenuItem";

interface MenuListProps {
  menu: MenuItemType[];
}

export default function MenuList({ menu }: MenuListProps) {
  return (
    <ul className="list-none pl-10">
      {menu.map((item, index) => {
        return (
          <li key={index}>
            <MenuItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}
