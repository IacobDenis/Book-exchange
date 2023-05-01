import { AuthContextProvider } from "./contexts/Auth/AuthContextProvider";
import { RoutesPages } from "./routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = () => toast("Great Job!");
  return (
    <AuthContextProvider>
      <ToastContainer />
      <RoutesPages />
    </AuthContextProvider>
  );
}

export default App;
