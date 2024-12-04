import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 Lucas Souza. Todos os direitos reservados.</p>
      <p>
        <a
          href="https://github.com/lucassouza4"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href="https://www.linkedin.com/in/lucas-silva-969b03169/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
}

export default Footer;
