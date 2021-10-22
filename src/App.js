import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import Login from "./components/Login/Login";
import Singup from "./components/Singup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Singup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/userprofile/:uid" component={UserProfile} />
          <PrivateRoute path="/" component={Dashboard} exact />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
