import ProjectRow from './ProjectRow.jsx';

export default function ProjectTable({ projects, onDeleteProject, onEditProject }) {
  return (
    <section className="panel">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
        <div>
          <h2 className="h4 fw-bold mb-1">Tabla de proyectos</h2>
        </div>
        <span className="badge rounded-pill text-bg-light align-self-md-start">
          {projects.length} registros
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state text-center">
          <i className="bi bi-inbox" aria-hidden="true"></i>
          <p className="mb-0 mt-2">No hay proyectos registrados.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">Proyecto</th>
                <th scope="col">Encargado</th>
                <th scope="col">Categoria</th>
                <th scope="col">Prioridad</th>
                <th scope="col">Entrega</th>
                <th className="text-end" scope="col">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  onDeleteProject={onDeleteProject}
                  onEditProject={onEditProject}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
