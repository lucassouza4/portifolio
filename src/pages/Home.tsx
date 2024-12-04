import "../styles/home.css";

function Home() {
  return (
    <section id="home" className="home">
      <div className="apresentacao">
        <img
          className="imagePerfil"
          src="src/images/_P280177-Enhanced-NR.jpg"
        ></img>
        <h1>Olá, eu sou o Lucas!</h1>
      </div>
      <div className="apresentacao">
        <p>
          <b>Graduado em Ciência da Computação</b> pela UFOP, com 1 anos e meio
          de experiência na empresa júnior Voluta onde participei de projetos
          como desenvolvedor e, posteriormente, como diretor de projetos. Após
          esse período, estagiei em duas empresas por quase 2 anos, DTI DIgital
          e Efí Bank, ambas como desenvolvedor backend. Nessas empresas, tive a
          oportunidade de trabalhar com{" "}
          <b>C#, TypeScript, Node, Angular, SQL, noSQL, Docker</b>, entre outras
          tecnologias.
        </p>

        <a href="#projects">Veja meus projetos</a>
      </div>
    </section>
  );
}

export default Home;
