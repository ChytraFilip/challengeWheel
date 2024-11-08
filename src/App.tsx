import { Wheel } from "./components/Wheel";
import { DebugPanel } from "./components/DebugPanel";
import { ResultModal } from "./components/ResultModal";

function App() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <Wheel />
      <DebugPanel />
      <ResultModal />
    </div>
  );
}

export default App;
