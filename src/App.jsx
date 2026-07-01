import { useEffect, useMemo, useState } from 'react';
import ProjectForm from './components/ProjectForm.jsx';
import ProjectTable from './components/ProjectTable.jsx';

const STORAGE_KEY = 'evaluacion_unidad_3_proyectos';

const initialProjects = [
  {
    id: crypto.randomUUID(),
    nombre: 'Portafolio React',
    encargado: 'Camila Rojas',
    categoria: 'Frontend',
    prioridad: 'Alta',
    fecha: '2026-07-10',
    descripcion: 'Sitio SPA para presentar trabajos y enlaces importantes.',
  },
  {
    id: crypto.randomUUID(),
    nombre: 'Panel de asistencia',
    encargado: 'Mateo Silva',
    categoria: 'Gestion',
    prioridad: 'Media',
    fecha: '2026-07-18',
    descripcion: 'Registro simple de estudiantes presentes por jornada.',
  },
];

function loadProjects() {
  const storedProjects = localStorage.getItem(STORAGE_KEY);

  if (!storedProjects) {
    return initialProjects;
  }

  try {
    const parsedProjects = JSON.parse(storedProjects);
    return Array.isArray(parsedProjects) ? parsedProjects : initialProjects;
  } catch {
    return initialProjects;
  }
}

export default function App() {
  const [projects, setProjects] = useState(loadProjects);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const projectStats = useMemo(() => {
    const highPriority = projects.filter((project) => project.prioridad === 'Alta').length;
    const totalProjects = projects.length;

    return { highPriority, totalProjects };
  }, [projects]);

  function handleSaveProject(projectData) {
    if (editingProject) {
      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === editingProject.id ? { ...projectData, id: editingProject.id } : project,
        ),
      );
      setEditingProject(null);
      return;
    }

    setProjects((currentProjects) => [
      ...currentProjects,
      {
        ...projectData,
        id: crypto.randomUUID(),
      },
    ]);
  }

  function handleEditProject(project) {
    setEditingProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDeleteProject(projectId) {
    setProjects((currentProjects) => currentProjects.filter((project) => project.id !== projectId));

    if (editingProject?.id === projectId) {
      setEditingProject(null);
    }
  }

  function handleCancelEdit() {
    setEditingProject(null);
  }

  return (
    <main className="app-shell">
      <section className="bg-white border-bottom">
        <div className="container py-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
            <div>
              <p className="text-uppercase fw-semibold text-primary mb-2">Evaluacion Unidad 3</p>
              <h1 className="display-6 fw-bold mb-2">Gestor de proyectos estudiantiles</h1>
            </div>

            <div className="stats-panel align-self-lg-center">
              <div>
                <span className="stats-number">{projectStats.totalProjects}</span>
                <span className="stats-label">proyectos</span>
              </div>
              <div>
                <span className="stats-number">{projectStats.highPriority}</span>
                <span className="stats-label">alta prioridad</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-4">
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-4">
            <ProjectForm
              editingProject={editingProject}
              onCancelEdit={handleCancelEdit}
              onSaveProject={handleSaveProject}
            />
          </div>

          <div className="col-12 col-lg-8">
            <ProjectTable
              projects={projects}
              onDeleteProject={handleDeleteProject}
              onEditProject={handleEditProject}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
