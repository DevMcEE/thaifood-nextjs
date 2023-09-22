import Link from 'next/link';

interface MenuLinkProps {
  onClick: (event) => void;
  href: string;
  title: string;
  className: string;
  addToRefs: (element: HTMLAnchorElement) => void;
}

export const MenuItemLink = ({ onClick, href, title, className, addToRefs }: MenuLinkProps): JSX.Element => {
  return (
        <Link
          id={`${href}-nav-link`}
          ref={addToRefs}
          href={`#${href}`}
          onClick={onClick}
          className={className}
        >
          {title}
        </Link>
  
  );
};
