import { useEffect, useState } from 'react';

const emptyForm = {
  nombre: '',
  encargado: '',
  categoria: 'Frontend',
  prioridad: 'Media',
  fecha: '',
  descripcion: '',
};

export default function ProjectForm({ editingProject, onCancelEdit, onSaveProject }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    setFormData(editingProject ?? emptyForm);
  }, [editingProject]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSaveProject(formData);
    setFormData(emptyForm);
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
        <div>
          <h2 className="h4 fw-bold mb-1">{editingProject ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
        </div>
        <span className="form-icon">
          <i className="bi bi-clipboard2-check" aria-hidden="true"></i>
        </span>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="nombre">
          Nombre del proyecto
        </label>
        <input
          className="form-control"
          id="nombre"
          name="nombre"
          onChange={handleInputChange}
          required
          type="text"
          value={formData.nombre}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="encargado">
          Encargado
        </label>
        <input
          className="form-control"
          id="encargado"
          name="encargado"
          onChange={handleInputChange}
          required
          type="text"
          value={formData.encargado}
        />
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold" htmlFor="categoria">
            Categoria
          </label>
          <select
            className="form-select"
            id="categoria"
            name="categoria"
            onChange={handleInputChange}
            value={formData.categoria}
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Gestion</option>
            <option>Investigacion</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold" htmlFor="prioridad">
            Prioridad
          </label>
          <select
            className="form-select"
            id="prioridad"
            name="prioridad"
            onChange={handleInputChange}
            value={formData.prioridad}
          >
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </div>
      </div>

      <div className="my-3">
        <label className="form-label fw-semibold" htmlFor="fecha">
          Fecha de entrega
        </label>
        <input
          className="form-control"
          id="fecha"
          name="fecha"
          onChange={handleInputChange}
          placeholder="AAAA-MM-DD"
          required
          type="text"
          value={formData.fecha}
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold" htmlFor="descripcion">
          Descripcion
        </label>
        <textarea
          className="form-control"
          id="descripcion"
          name="descripcion"
          onChange={handleInputChange}
          required
          rows="4"
          value={formData.descripcion}
        ></textarea>
      </div>

      <div className="d-flex flex-column flex-sm-row gap-2">
        <button className="btn btn-primary flex-fill" type="submit">
          <i className="bi bi-save me-2" aria-hidden="true"></i>
          {editingProject ? 'Guardar cambios' : 'Agregar proyecto'}
        </button>
        {editingProject && (
          <button className="btn btn-outline-secondary" onClick={onCancelEdit} type="button">
            <i className="bi bi-x-circle me-2" aria-hidden="true"></i>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
