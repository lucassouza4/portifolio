import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import "../styles/projects.css";
import cSharp from "../images/c-sharp.png";
import react from "../images/react-js.png";
import node from "../images/Node.js_logo.svg";
import vue from "../images/vue.png"

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
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/lucassouza4/repos?per_page=${perPage}&page=${page}`,
          { headers }
        );
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const rawData = await response.json();
        const projects: GitHubProject[] = rawData.map((project: any) => ({
          name: project.name,
          description: project.description,
          html_url: project.html_url,
          has_pages: project.has_pages,
          languages_url: project.languages_url,
          stargazers_count: project.stargazers_count,
        }));

        return projects;
      } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
      }
    };
  
    const fetchProjectLanguages = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch languages");
        const languages:GitHubLanguages = await response.json();
        return Object.keys(languages);
      } catch (error) {
        console.error("Error fetching project languages:", error);
        return [];
      }
    };
  
    const fetchProjectPage = async (project: GitHubProject) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/lucassouza4/${project.name}/pages`,
          { headers }
        );
        if (!response.ok) throw new Error("Failed to fetch project page");
        const pageData = await response.json();
        return pageData.html_url;
      } catch (error) {
        console.error("Error fetching project site:", error);
        return null;
      }
    };
  
    const processProjects = async (projects: GitHubProject[]) => {
      return await Promise.all(
        projects.map(async (project) => {
          const languages = await fetchProjectLanguages(project.languages_url);
          if (project.has_pages) {
            const page_url = await fetchProjectPage(project);
            return { ...project, languages, page_url };
          }
          return { ...project, languages };
        })
      );
    };
  
    const loadProjects = async () => {
      const projects = await fetchProjects();
      const filteredProjects = projects.filter((p) => p.stargazers_count > 0);
      const projectsWithDetails = await processProjects(filteredProjects);
      setProjects(projectsWithDetails);
    };
  
    loadProjects();
  }, [perPage, page, token]);  

  function SelectImage(linguagens?: string[]): string {
    if (linguagens) {
      if (linguagens.find((l) => l == "C#")) {
        return cSharp.toString();
      } 
      else if(linguagens.find((l)=> l == "Vue")){
        return vue.toString()
      }
      else if (linguagens.find((l) => l == "HTML")) {
        return react.toString();
      } 
      else return node.toString();
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
