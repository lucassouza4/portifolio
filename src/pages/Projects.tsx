import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import "../styles/projects.css";

// Definindo os tipos para o projeto e linguagens
interface GitHubProject {
  name: string;
  description: string;
  html_url: string;
  languages_url: string;
  stargazers_count: number;
  languages?: string[];
  image?: string;
}

interface GitHubLanguages {
  [key: string]: number; // O nome da linguagem como chave e o valor é o número de bytes usados pela linguagem
}

const token = import.meta.env.VITE_GITHUB_TOKEN;
const username = import.meta.env.VITE_GITHUB_USERNAME;
const cSharp = "src/images/c-sharp.png";
const react = "src/images/react-js.png";
const node = "src/images/Node.js_logo.svg";

function Projects() {
  const page = 1;
  const perPage = 100; // Máximo permitido por página
  const [projects, setProjects] = useState<GitHubProject[]>([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Adicionando o token no cabeçalho
        },
      }
    )
      .then((res) => res.json())
      .then((data: GitHubProject[]) => {
        const projectsWithLanguages = data
          .filter((project) => project.stargazers_count > 0) // Filtra os projetos com pelo menos uma estrela
          .map((project) => {
            // Fazer uma segunda requisição para obter as linguagens
            return fetch(project.languages_url)
              .then((res) => res.json())
              .then((languages: GitHubLanguages) => {
                const languagesArray = Object.keys(languages); // Linguagens como array
                return {
                  ...project,
                  languages: languagesArray,
                };
              });
          });
        // Espera todas as promessas se resolverem
        Promise.all(projectsWithLanguages).then((projectsData) =>
          setProjects(projectsData)
        );
      });
  }, []);

  function SelectImage(linguagens?: string[]): string {
    if (linguagens) {
      if (linguagens.find((l) => l == "C#")) {
        return cSharp.toString();
      } else if (linguagens.find((l) => l == "HTML")) {
        return react.toString();
      } else return node.toString();
    }
    return "";
  }

  return (
    <section id="projects">
      <h2>Meus Projetos</h2>
      <div className="projects">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.name}
              title={project.name}
              description={project.description || "Sem descrição"}
              link={project.html_url}
              languages={project.languages || []}
              image={SelectImage(project.languages) || ""}
            />
          ))
        ) : (
          <p>Nenhum projeto encontrado.</p>
        )}
      </div>
    </section>
  );
}

export default Projects;
