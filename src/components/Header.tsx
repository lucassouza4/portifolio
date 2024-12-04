const linkedInUsername = import.meta.env.VITE_LINKEDIN_USERNAME;

function Header() {
  return (
    <header>
      <nav>
        <a href="#home">Início</a>
        <a href="#projects">Projetos</a>
        <a
          href={`https://www.linkedin.com/in/${linkedInUsername}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contato
        </a>
      </nav>
    </header>
  );
}

export default Header;
