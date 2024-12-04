import "../styles/footer.css";

const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;
const linkedInUsername = import.meta.env.VITE_LINKEDIN_USERNAME;

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 Lucas Souza. Todos os direitos reservados.</p>
      <p>
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href={`https://www.linkedin.com/in/${linkedInUsername}/`}
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
