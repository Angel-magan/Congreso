import LoginForm from "../../components/LoginForm/LoginForm";

import Logo from "../../assets/images/imgpng.png";

const LoginPage = () => {
  return (
    <div className="min-vh-100" style={{ background: "#000" }}>
      <section>
        <img
          src={Logo}
          className="img-fluid w-25 h-25 rounded mx-auto d-block"
          alt="Logo"
        ></img>
      </section>
      <h2 className="text-center text-light mb-3">Bienvenidos a CICMA</h2>
      <div className="text-light border-b-3">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
