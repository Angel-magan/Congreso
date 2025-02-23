// eslint-disable-next-line react/prop-types
const Card = ({ titleJob, date, clock, hall, chairman, ponente }) => {
  return (
    <div className="card border-warning w-100 me-3">
      <div className="card-body">
        <h5 className="card-title fs-2">{titleJob}</h5>
        <section className="d-flex flex-column flex-md-row">
          <p className="card-text me-md-3">
            <i className="bi bi-calendar-date-fill text-primary"></i>
            <span className="ms-2">{date}</span>
          </p>
          <p className="card-text">
            <i className="bi bi-clock-fill text-primary"></i>
            <span className="ms-2">{clock}</span>
          </p>
        </section>

        <p className="card-text mt-2">
          <i className="bi bi-geo-fill"></i> {hall}
        </p>
        <p className="card-text">
          <i className="bi bi-mic-fill text-primary"></i> Chairman:{" "}
          <span>{chairman}</span>
        </p>
        <p className="card-text">
          <i className="bi bi-megaphone-fill text-warning"></i> Ponente:{" "}
          <span>{ponente}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
