// eslint-disable-next-line react/prop-types
const CardRegister = ({ question, register, link }) => {
  return (
    <div className="card border-warning w-100 me-3 mb-3 p-3">
      <p className="text-center fw-bold fs-4 m-0">{question}</p>
      <br />
      <p className="text-center fw-bold fs-4 m-0">
        {" "}
        {register}
        <a className="ms-2" href={link}>
          aquí
        </a>
      </p>
    </div>
  );
};

export default CardRegister;
