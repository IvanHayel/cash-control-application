import 'react-toastify/dist/ReactToastify.min.css';
import {Route, Routes}                                        from 'react-router-dom';
import {
  observer,
}                                                             from 'mobx-react-lite';
import {
  Container,
}                                                             from '@mui/material';
import {
  ToastContainer,
}                                                             from 'react-toastify';
import {AdminBoard, Footer, Header, Home, Profile, Whoops404} from '../Modules';
import {
  ADMIN,
  HOME,
  PROFILE,
}                                                             from '../Constants';
import {
  isAdmin,
  isAuthenticated,
  isModerator,
  isRoot,
}                                                             from '../Services';

const App = observer(() => {
  const isCurrentUserAuthenticated = isAuthenticated();
  const isCurrentUserModerator = isCurrentUserAuthenticated && isModerator();
  const isCurrentUserAdmin = isCurrentUserAuthenticated && isAdmin();
  const isCurrentUserRoot = isCurrentUserAuthenticated && isRoot();
  return (
      <Container maxWidth="lg">
        <Header />
        <Routes>
          <Route exact path={HOME} element={<Home />} />
          <Route exact path="*" element={<Whoops404 />} />
          {
              isCurrentUserAuthenticated &&
              <>
                <Route exact path={PROFILE} element={<Profile />} />
              </>
          }
          {
              (isCurrentUserModerator || isCurrentUserRoot) &&
              <>
                {/* todo: Moderator board */}
              </>
          }
          {
              (isCurrentUserAdmin || isCurrentUserRoot) &&
              <>
                <Route exact path={ADMIN} element={<AdminBoard />} />
              </>
          }
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