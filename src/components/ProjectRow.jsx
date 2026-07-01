export default function ProjectRow({ project, onDeleteProject, onEditProject }) {
  const priorityClass = {
    Alta: 'text-bg-danger',
    Media: 'text-bg-warning',
    Baja: 'text-bg-success',
  }[project.prioridad];

  return (
    <tr>
      <td>
        <div className="fw-semibold">{project.nombre}</div>
        <div className="small text-secondary">{project.descripcion}</div>
      </td>
      <td>{project.encargado}</td>
      <td>{project.categoria}</td>
      <td>
        <span className={`badge ${priorityClass}`}>{project.prioridad}</span>
      </td>
      <td>{project.fecha}</td>
      <td>
        <div className="d-flex gap-2 justify-content-end">
          <button
            aria-label={`Editar ${project.nombre}`}
            className="btn btn-sm btn-outline-primary icon-button"
            onClick={() => onEditProject(project)}
            title="Editar"
            type="button"
          >
            <i className="bi bi-pencil-square" aria-hidden="true"></i>
          </button>
          <button
            aria-label={`Eliminar ${project.nombre}`}
            className="btn btn-sm btn-outline-danger icon-button"
            onClick={() => onDeleteProject(project.id)}
            title="Eliminar"
            type="button"
          >
            <i className="bi bi-trash3" aria-hidden="true"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
