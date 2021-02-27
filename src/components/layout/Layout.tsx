import * as React from "react";


interface ILayoutProps {
  nav?: React.ReactNode;
  title?: string | React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({children, nav, title }) => {
    let contentClassName = 'content-page ';
  return (
    <>
      <div className="header-page">
        <div className="header-page__title-wrap">
          <h1 className="title header-page__title title_h2">{title}</h1>
        </div>
        { (nav ) && <div className="header-page__nav">{nav}</div> }
      </div>
      <main>
      <div className={contentClassName}>{children}</div>
      </main>
    </>
  );
};

export default Layout;
