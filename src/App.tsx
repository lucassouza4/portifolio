import Header from "./components/Header";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import "./styles/global.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
