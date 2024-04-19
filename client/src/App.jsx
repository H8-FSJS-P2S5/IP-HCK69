import { RouterProvider } from "react-router-dom";
import router from "./router";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="706095064565-p8fbhoc2gprsdtb2s6jern58happfcrp.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>;
    </>
  );
}

export default App;