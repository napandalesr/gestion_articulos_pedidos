import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "../Components/Header";
import Loading from "../Components/Loading";
import Router from "../../Routes";

export const Layout: React.FC = () => {
  return <>
  <Header/>
  <Suspense fallback={<Loading/>}>
    <BrowserRouter>
      <main><Router/></main>
    </BrowserRouter>
  </Suspense>
  <footer></footer>
  </>;
};

export default Layout;
