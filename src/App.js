import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import Default from "./components/Default";
import { ToastContainer } from "react-toastify";

const App = () => {
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  // const fetchApi = async () => {

  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/product/get-all`
  //     );
  //     return res.data;
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };

  // // Queries
  // const query = useQuery({ queryKey: ["products"], queryFn: fetchApi });
  // console.log("products: ", query);

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
