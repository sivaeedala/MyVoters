import "./scripts/App.css";
import AppNav from "./AppNav";
import { Container } from "react-bootstrap";
import AppContent from "../MyVoter/AppContent";
import Login from "./Login";
import { Route, Switch } from "react-router-dom";
import WardTeams from "../MyVoter/WardTeams";

function App() {
  return (
    <Container>
      <div className="row">
        <div className="col">
          <AppNav />
        </div>
      </div>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/voters/" component={AppContent}></Route>
        <Route exact path="/teams/" component={WardTeams}></Route>
        {/* <Route path="/rooms/:params" component={SingleRoom}></Route>
        <Route component={ErrorPage}></Route> */}
      </Switch>

      {/* <div className="row">
        <div className="col">
          <AppContent></AppContent>
        </div>
      </div> */}
    </Container>
  );
}

export default App;
