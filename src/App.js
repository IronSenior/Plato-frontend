import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp"
import { HashRouter, Switch, Route } from "react-router-dom";

const Routers = () => (
  <Switch>
    <Route path="/" exact component={SignUp} />
    <Route path="/signup" exact component={SignUp} />
  </Switch>
);



function App() {
  return (
    <HashRouter>
      <Routers></Routers>
    </HashRouter>
  );
}

export default App;
