import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from './components/comman/ScrollToTop';
import ProtectedRouteTemp from "./helper/ProtectedRouteTemp";
import route from "./helper/route";


function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            {route?.map((route, index) => (
              <Route key={index} exact path={route.path} element={
                // <ProtectedRouteTemp>
                <>
                  {route.element}
                </>
                // </ProtectedRouteTemp>
              } />
            ))}
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;
