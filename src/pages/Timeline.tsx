import "../styles/timeline.css";

interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}

const experiences: Experience[] = [
  { year: "2023", 
    role: "Desenvolvedor backend (estágio)", 
    company: "Efí Bank (Maio de 2022 - Maio de 2023)", 
    description: `Desenvolvimento de serviços utilizando API PIX,contribuindo para a implementação de soluções de pagamento instantâneo.
        Desenvolvimento de APIs RESTful em Node.js com TypeScript, garantindo a criação de aplicações robustas e escaláveis, e utilizando Docker para a facilitação do ambiente de desenvolvimento e deploy.
        Realização de conciliação financeira utilizando bancos de dados SQL e data lake, assegurando a precisão e integridade das transações financeiras.
        Modelagem de software, participando ativamente do planejamento e estruturação de sistemas para atender às necessidades dos projetos.`
    },
    { year: "2020", 
        role: "Desenvolvedor de software (estágio)", 
        company: "DTI Digital (Setembro de 2020 - Maio de 2021)", 
        description: `Desenvolvimento de microsserviços em .NET com C#, contribuindo para a construção de sistemas distribuídos e escaláveis.
        Detalhamento de requisitos, auxiliando na compreensão das necessidades dos usuários e na definição de funcionalidades dos sistemas.
        Modelagem de processos, mapeando e analisando os fluxos de trabalho para identificar oportunidades de melhoria e otimização.
        Modelagem de software, colaborando na definição da arquitetura e na estruturação dos componentes dos sistemas desenvolvidos.`
    },
    { year: "2019", 
        role: "Diretor de projetos", 
        company: "Voluta Soluções Digitais (Janeiro de 2019 - Dezembro de 2019) - Empresa júnior", 
        description: `Relacionamento com clientes.
        Gestão de projetos e equipes.
        Precificação e modelagem de projetos.` },
    { year: "2018", 
        role: "Desenvolvedor Web", 
        company: "Voluta Soluções Digitais (Junho de 2018 - Dezembro de 2018) - Empresa júnior", 
        description: `Desenvolvimento de web sites com Angular.` },
];

function Timeline(){
  return (
    <section id="timeline">
      <div className="timeline">
      <h2>Experiência Profissional</h2>
      {experiences.map((exp, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-circle">{exp.year}</div>
          <div className="timeline-content">
              <h3>{exp.role}</h3>
              <h4>{exp.company}</h4>
              <ul>
                  {exp.description.split("\n").map((point, i) => (
                  <li key={i}>{point.trim()}</li>
                  ))}
              </ul>
          </div>
        </div>
      ))}
    </div>
    </section>
  )
};

export default Timeline;
