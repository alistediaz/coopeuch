import "./css/main.css";
import { DisplayTareas } from "./components/DisplayTareas";
import { Tareas } from "./components/Tareas";

// @ts-ignore
import { motion } from "framer-motion";
function App() {
  return (
    <div className="App">
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        Tareas
      </motion.h1>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Tareas />
        <DisplayTareas />
      </motion.div>
    </div>
  );
}

export default App;