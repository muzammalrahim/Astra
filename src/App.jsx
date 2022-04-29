import React from "react";
import "./App.css";
import AppRoute from "./routes/AppRoute";
import MyProvider from "./context/Provider";
import ErrorBoundary from "./components/ErrorBoundary";
// import tokenStorage from "services/tokenStorage";
const App = () => {
  // const [userInfo] = React.useState(tokenStorage.getUserInfo());
  // React.useEffect(() => {
  //   let currentDate = new Date().getTime();
  //   if (userInfo && (userInfo?.expiryTime - currentDate) / 1000 <= -300) {
  //     localStorage.clear();
  //     window.location.href = '/frontend';
  //   }
  // }, [userInfo]);
  return (
    <ErrorBoundary>
      <MyProvider>
        <AppRoute />
      </MyProvider>
    </ErrorBoundary>
  );
};

export default App;
