import { useState } from "react";
import EntryContent from "./components/EntryContent";
import ExitModal from "./components/ExitModal";
import Form from "./components/form/Form";
import ThankYou from "./components/ThankYou";

function App() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <main>
      <ExitModal />
      {isSuccess ? (
        <ThankYou />
      ) : (
        <>
          <EntryContent />
          <Form isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        </>
      )}
    </main>
  );
}

export default App;
