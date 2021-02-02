import "./scripts/App.css";
import AppNav from "./AppNav";
import { Container } from "react-bootstrap";
import AppContent from "./AppContent";

function App() {
  return (
    <Container>
      <AppNav />
      <AppContent></AppContent>
    </Container>
  );
}

export default App;
