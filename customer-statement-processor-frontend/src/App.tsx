import { Toaster } from "react-hot-toast";

import TransactionProcessor from "./components/TransactionProcessor";

function App() {
  return (
    <div className="flex flex-1 flex-column justify-center items-center prose max-w-full">
      <TransactionProcessor />
      <Toaster />
    </div>
  );
}

export default App;
