import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import Router from "../../Routes";
import Header from "../../Components/Header";
import Loading from "../../Components/Loading";

export const Layout: React.FC = () => {
  return <>
  <Suspense fallback={<Loading/>}>
    <BrowserRouter>
      <Header/>
      <main><Router/></main>
      <footer></footer>
    </BrowserRouter>
  </Suspense>
  </>;
};

export default Layout;
