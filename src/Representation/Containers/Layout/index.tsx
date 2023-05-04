import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "../Components/Header";
import Loading from "../Components/Loading";
import Router from "../../Routes";

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
