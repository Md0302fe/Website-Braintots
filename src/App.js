import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import Default from "./components/Default";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* routes.map */}
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? Default : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
