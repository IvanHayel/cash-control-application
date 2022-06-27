import {Container}                                     from "@mui/material";
import {observer}                                      from "mobx-react-lite";
import {Route, Routes}                                 from "react-router-dom";
import {ToastContainer}                                from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {ROUTE_URL}                                     from "../Constants";
import {
  About,
  AdminBoard,
  Expenses,
  Footer,
  Header,
  Home,
  Incomes,
  Profile,
  Reports,
  Transfers,
  Wallets,
  Whoops404,
}                                                      from "../Modules";
import {isAdmin, isAuthenticated, isModerator, isRoot} from "../Services";

const App = observer(() => {
  const isCurrentUserAuthenticated = isAuthenticated();
  const isCurrentUserModerator = isCurrentUserAuthenticated && isModerator();
  const isCurrentUserAdmin = isCurrentUserAuthenticated && isAdmin();
  const isCurrentUserRoot = isCurrentUserAuthenticated && isRoot();
  return (
      <Container maxWidth="lg">
        <Header />
        <Routes>
          <Route exact path={ROUTE_URL.HOME} element={<Home />} />
          <Route exact path={ROUTE_URL.ABOUT} element={<About />} />
          {isCurrentUserAuthenticated && (
              <>
                <Route exact path={ROUTE_URL.PROFILE} element={<Profile />} />
                <Route exact path={ROUTE_URL.WALLETS} element={<Wallets />} />
                <Route exact path={ROUTE_URL.INCOMES} element={<Incomes />} />
                <Route exact path={ROUTE_URL.EXPENSES} element={<Expenses />} />
                <Route exact path={ROUTE_URL.TRANSFERS}
                       element={<Transfers />} />
                <Route exact path={ROUTE_URL.REPORTS} element={<Reports />} />
              </>
          )}
          {(isCurrentUserModerator || isCurrentUserRoot) && (
              <>{/* todo: Moderator board */}</>
          )}
          {(isCurrentUserAdmin || isCurrentUserRoot) && (
              <>
                <Route
                    exact
                    path={ROUTE_URL.ADMIN.BOARD}
                    element={<AdminBoard />}
                />
              </>
          )}
          <Route exact path="*" element={<Whoops404 />} />
        </Routes>
        <Footer />
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      </Container>
  );
});

export default App;
