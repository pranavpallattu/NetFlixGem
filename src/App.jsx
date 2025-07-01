import { Provider } from "react-redux";
import Body from "./Components/Body";
import "./index.css";
import appStore from "./utils/appStore";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </>
  );
}

export default App;
