import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import auth from "./Firebase/furebase.confige";
import { getUser, toggleLoading } from "./features/auth/authSlice";
import routes from "./routes/routes";

function App() {
  const dispatch = useDispatch();
  // ? HELLO START

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email));
      } else {
        dispatch(toggleLoading());
      }
    });
  }, [dispatch]);

  const helmetContext = {};
  return (
    <>
      <HelmetProvider context={helmetContext}>
        <RouterProvider router={routes} />
        <Toaster />
      </HelmetProvider>
    </>
  );
}

export default App;
