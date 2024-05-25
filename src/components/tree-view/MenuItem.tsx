import { useState } from "react";
import MenuList from "./MenuList";
import { MenuItemType } from "./data";

interface MenuItemProp {
  item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProp) {
  const [openList, setOpenList] = useState<boolean>(false);

  const handleClick = () => {
    if (item.children) setOpenList(!openList);
  };
  
  return (
    <div>
      <div onClick={handleClick}>{item.label}</div>
      {item.children && openList && <MenuList menu={item.children} />}
    </div>
  );
}
