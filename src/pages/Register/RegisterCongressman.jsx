import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Logo from "../../assets/images/imgpng.png";

const RegisterCongressman = () => {
  return (
    <div>
      <img src={Logo} className="img-fluid w-25 h-25 rounded" alt="Logo"></img>
      <section className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 text-center">
            <h2>Registrate como Congresista</h2>
            <RegisterForm text="Nombre:" placeholder="nombre" />
            <RegisterForm text="Apellido:" placeholder="apellido" />
            <RegisterForm text="Correo:" placeholder="correo" />
            <RegisterForm text="Institución:" placeholder="Institución" />
            <div className="d-flex">
              <div className="flex-grow-1 me-2">
                <RegisterForm text="Teléfono:" placeholder="teléfono" />
              </div>
              <i className="mx-1 text-primary fw-bold">*</i>
            </div>

            <p className="text-secondary">
              *Campo opcional para recibir notificaciones SMS
            </p>
            <button className="btn btn-primary fw-bold px-4">
              Registrarme
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterCongressman;
