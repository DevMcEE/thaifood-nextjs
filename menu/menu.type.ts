export interface MenuItem {
   _id: string;
  name: string;
  description: string;
  hidden: boolean;
  soldOut: boolean;
  price: number;
  code: string;
  groupId: string;
}

export interface MenuGroup {
  _id: string;
  name: string;
  description: string;
  items: MenuItem[];
}