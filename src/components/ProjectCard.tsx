import "../styles/projectCard.css";

interface ProjectProps {
  title: string;
  description: string;
  link: string;
  languages: string[];
  image?: string;
}

function ProjectCard(projectProps: ProjectProps) {
  return (
    <div className="card">
      {projectProps.image && (
        <img
          className="image"
          src={projectProps.image}
          alt={`${projectProps.title} cover`}
        />
      )}
      <div className="content">
        <h3 className="title">{projectProps.title}</h3>
        <p className="description">{projectProps.description}</p>
        <div>
          {projectProps.languages.length > 0 && (
            <div className="languages">
              <strong>Technologias: </strong>
              {projectProps.languages.map((language, index) => (
                <span className="languageTag" key={index}>
                  {language}
                </span>
              ))}
            </div>
          )}
        </div>
        <a
          className="button"
          href={projectProps.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver Projeto
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;
