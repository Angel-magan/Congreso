import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Logo from "../../assets/images/imgpng.png";

const RegisterAuthor = () => {
  return (
    <div>
      <img src={Logo} className="img-fluid w-25 h-25 rounded" alt="Logo"></img>
      <section className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 text-center">
            <h2>¡Registrate como autor!</h2>
            <RegisterForm text="Nombre:" placeholder="nombre" />
            <RegisterForm text="Apellido:" placeholder="apellido" />
            <RegisterForm text="Correo:" placeholder="correo" />
            <div className="d-flex">
              <div className="flex-grow-1 me-2">
                <RegisterForm
                  text="ID Congresista:"
                  placeholder="ID de congresista"
                />
              </div>
              <i className="mx-1 text-primary fw-bold">*</i>
              <i className="bi bi-question-circle-fill fs-4 text-warning"></i>
            </div>
            <p className="text-secondary">
              *Campo opcional si no presentará trabajos en el congreso
            </p>
            <div className="form-check fw-bold">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Acepto ser registrado en la plataforma CICMA como autor
              </label>
            </div>
            <button className="btn btn-primary fw-bold px-4">
              Registrarme
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterAuthor;
