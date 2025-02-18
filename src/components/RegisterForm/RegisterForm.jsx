// eslint-disable-next-line react/prop-types
const RegisterForm = ({ text, type, placeholder, value, onChange }) => {
  return (
    <div>
      <div className="d-flex align-items-center">
        <p className="me-3 fw-bold">{text}</p>
        <input
          className="form-control mb-3"
          type={type}
          placeholder={`Ingrese su ${placeholder}`}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
