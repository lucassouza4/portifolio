import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import "../styles/projects.css";
import cSharp from "../images/c-sharp.png";
import react from "../images/react-js.png";
import node from "../images/Node.js_logo.svg";

// Definindo os tipos para o projeto e linguagens
interface GitHubProject {
  name: string;
  description: string;
  html_url: string;
  page_url: string;
  has_pages: boolean;
  languages_url: string;
  stargazers_count: number;
  languages?: string[];
  image?: string;
}

interface GitHubLanguages {
  [key: string]: number; // O nome da linguagem como chave e o valor é o número de bytes usados pela linguagem
}

const token = import.meta.env.VITE_GITHUB_TOKEN;

function Projects() {
  const page = 1;
  const perPage = 100;
  const [projects, setProjects] = useState<GitHubProject[]>([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/lucassouza4/repos?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

                // Verifica se o projeto tem GitHub Pages e busca a URL se tiver
                if (project.has_pages) {
                  return fetch(
                    `https://api.github.com/repos/lucassouza4/${project.name}/pages`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((pageData) => {
                      return {
                        ...project,
                        languages: languagesArray,
                        page_url: pageData.html_url, // Adiciona a URL do GitHub Pages ao projeto
                      };
                    });
                } else {
                  return {
                    ...project,
                    languages: languagesArray,
                  };
                }
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
              pageLink={project.has_pages ? project.page_url : ""}
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
