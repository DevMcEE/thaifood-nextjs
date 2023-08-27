import Link from 'next/link';

interface MenuLinkProps {
  onClick: (menuGroupId: string) => void;
  href: string;
  className: string;
  addToRefs: (element: HTMLLIElement) => void;
}

export const MenuItemLink = ({ onClick, href, className, addToRefs }: MenuLinkProps): JSX.Element => {
  return (
    <Link href={`#${href}`} legacyBehavior>
      <li
        id={`${href}-nav-link`}
        ref={addToRefs} 
        onClick={() => onClick(href)}
        className={className}
      >
        {href}
      </li>
    </Link>
  );
};
