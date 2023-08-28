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
export interface IMenuGroupBase {
  id: string;
  name: string;
  description: string;
}

export interface IMenuGroup extends IMenuGroupBase {
  items: IMenuItem[];
}

export interface IMenuNavGroup extends IMenuGroupBase {
  href: string;
}
