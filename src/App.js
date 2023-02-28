import { BrowserRouter as Router } from "react-router-dom";
import BodyContainer from "./components/body/BodyContainer";
import Navbar from "./components/layout/Navbar";
import Panel from "./components/layout/Panel";
//import Mesa from "./components/mesa/Mesa";
//
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Panel />
        <div className="d-flex">
          
          
          <BodyContainer />
        </div>
      </Router>
    </div>
  );
}

export default App;
