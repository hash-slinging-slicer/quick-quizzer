import { FCC } from "@/types/react";

const Layout: FCC = ({ children }) => {
  return (
    <div className="">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
