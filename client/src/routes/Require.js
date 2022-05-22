import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

function Require({ children }) {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return children;
}

export default Require;
