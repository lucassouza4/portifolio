import Header from "./components/Header";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import "./styles/global.css";
import Timeline from "./pages/Timeline";

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <Timeline />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
