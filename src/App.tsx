import { Wheel } from "./components/Wheel";
import { DebugPanel } from "./components/DebugPanel";
import { ResultModal } from "./components/ResultModal";

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Wheel />
      <DebugPanel />
      <ResultModal />
    </div>
  );
}

export default App;
