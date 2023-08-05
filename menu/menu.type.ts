export interface IMenuItem {
  id: string;
  name: string;
  description: string;
  hidden: boolean;
  soldOut: boolean;
  price: number;
  code: string;
  groupId: string;
}

export interface IMenuGroup {
  id: string;
  name: string;
  description: string;
  items: IMenuItem[];
}