import { Meta } from './Meta';

interface LayoutProps {
  children: JSX.Element;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  );
};
