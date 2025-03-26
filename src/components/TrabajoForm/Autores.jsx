import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const Autores = ({ onAutoresChange }) => {
  const [autoresDisponibles, setAutoresDisponibles] = useState([]);
  const [autoresSeleccionados, setAutoresSeleccionados] = useState([]);
  const [autorSeleccionado, setAutorSeleccionado] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nuevoAutor, setNuevoAutor] = useState({
    nombre: "",
    apellido: "",
    correo: "",
  });
  const [searchQuery, setSearchQuery] = useState(''); // Estado para el buscador

  const handleAutorChange = (e) => {
    setSearchQuery(e.target.value); // Actualiza el texto de búsqueda
  };

  const agregarAutor = (autor) => {
    if (!autoresSeleccionados.some(autorExistente => autorExistente.id === autor.id)) {
      setAutoresSeleccionados([...autoresSeleccionados, autor]);
      setSearchQuery('');
    }
  };

  const eliminarAutor = (event, autorAEliminar) => {
    event.preventDefault();
    setAutoresSeleccionados(
      autoresSeleccionados.filter(autor => autor.id !== autorAEliminar.id)
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Actualiza el estado de búsqueda
  };

  const filteredAutores = autoresDisponibles.filter(autor =>
    autor.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    autor.correo.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filtra autores basados en el nombre o correo

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/autores');
        setAutoresDisponibles(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los autores.');
      }
    };

    fetchAutores();
  }, []);

  useEffect(() => {
    if (onAutoresChange) {
      onAutoresChange(autoresSeleccionados);
    }
  }, [autoresSeleccionados, onAutoresChange]);

  const handleShowModal = () => {
    setNuevoAutor({ nombre: '', apellido: '', correo: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setNuevoAutor({ nombre: '', apellido: '', correo: '' });
    setShowModal(false);
  };

  const handleNuevoAutorChange = (e) => {
    setNuevoAutor({ ...nuevoAutor, [e.target.name]: e.target.value });
  };

  const agregarNuevoAutor = async () => {
    if (!nuevoAutor.nombre || !nuevoAutor.apellido || !nuevoAutor.correo) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(nuevoAutor.correo)) {
      Swal.fire({
        title: "Error",
        text: "El correo electronico no es valido",
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register-author',
        {
          name: nuevoAutor.nombre,
          lastName: nuevoAutor.apellido,
          email: nuevoAutor.correo
        });

      const response2 = await axios.get('http://localhost:5000/api/users/autores');
      setAutoresDisponibles(response2.data);

      Swal.fire({
        title: "Exito",
        text: "El autor ha sido registrado correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      });

      setTimeout(() => handleCloseModal(), 2000);

    } catch (error) {
      let errorMessage = "No se pudo registrar el autor";
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message === "El correo ya está registrado") {
          errorMessage = "El correo ingresado ya está registrado. Intenta con otro.";
        }
      }

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <div className="w-100">
      {error && <div className="alert alert-danger">{error}</div>}


      {/* Campo de búsqueda */}
      <div className="mb-3">
        <div className='input-group'>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar autor por nombre o correo"
            value={searchQuery}
            onChange={handleSearchChange} // Llamamos la función para actualizar el estado
          />
          <button
            className="btn btn-warning btn-m rounded-circle ms-2"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Agregar nuevo autor"
            type="button"
            onClick={handleShowModal}
          >
            +
          </button>
        </div>

      </div>


      {/* Lista de coincidencias de autores */}
      {searchQuery && (
        <ul className="list-group mb-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
          {filteredAutores.map((autor) => (
            <li
              key={autor.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => agregarAutor(autor)} // Al hacer clic, agregamos el autor seleccionado
            >
              {autor.nombre + " || " + autor.correo}
            </li>
          ))}
        </ul>
      )}

      <div className="mb-3">
        <p className="mb-3 text-body-tertiary text-end">
          * Al menos uno de los co-autores debe de ser congresista
        </p>

        <div className="border p-3 rounded">
          <p className="me-1 fw-bold fs-5">Lista de autores:</p>
          {autoresSeleccionados.map((autor, index) => (
            <div key={index} className="mb-2 d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                value={autor.nombre + " || " + autor.correo}
                readOnly
              />
              <button
                className="btn btn-outline-danger btn-sm ms-2"
                onClick={(event) => eliminarAutor(event, autor)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Nuevo Autor</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={nuevoAutor.nombre}
                    onChange={handleNuevoAutorChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    value={nuevoAutor.apellido}
                    onChange={handleNuevoAutorChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    name="correo"
                    value={nuevoAutor.correo}
                    onChange={handleNuevoAutorChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={agregarNuevoAutor}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Autores;
