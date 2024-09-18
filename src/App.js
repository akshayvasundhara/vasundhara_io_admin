import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from './components/comman/ScrollToTop';
import route from "./helper/route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <ToastContainer />
          <Routes>
            {route?.map((route, index) => {
              return (
                <Route key={index} exact path={route.path} element={route.element} />
              );
            })}
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;
