import { ReactNode } from "react";
const RootLayout = async ({ children }: { children: ReactNode }) => {
    // const isUserAuthenticated = await isAuthenticated();
    // if (isUserAuthenticated) redirect("/");
  
    return <div className="root-layout">{children}</div>;
  };
  
  export default RootLayout;