import "./scripts/App.css";
import AppNav from "./AppNav";
import { Container } from "react-bootstrap";
import AppContent from "./AppContent";

function App() {
  return (
    <Container>
      <div className="row">
        <div className="col">
          <AppNav />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <AppContent></AppContent>
        </div>
      </div>
    </Container>
  );
}

export default App;
