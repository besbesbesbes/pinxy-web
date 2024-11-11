import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppRouter from "./routes/AppRouter.jsx";
import { Toaster, toast } from 'sonner'


// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

createRoot(document.getElementById("root")).render(
  <>
    <Toaster position="top-right" richColors />
    <AppRouter />
  </>
);
