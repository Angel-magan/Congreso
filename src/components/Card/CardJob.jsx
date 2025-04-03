// eslint-disable-next-line react/prop-types
const Card = ({ titleJob, date, clock, hall, chairman, ponentesTrabajo }) => {
	return (
		<div className="card border-warning w-100 me-3">
			<div className="card-body">
				{Array.isArray(titleJob) ? (
					<ul>
						{titleJob.map((titulo, index) => (
							<li key={index}>{titulo}</li>
						))}
					</ul>
				) : (
					<p>{titleJob}</p>
				)}

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
					<div>
						<p className="card-text">
							<i className="bi bi-megaphone-fill text-warning"></i> Ponente/s:{" "}
							<div>
								{Array.isArray(ponentesTrabajo) &&
								ponentesTrabajo.length > 0 ? (
									<ul>
										{[...new Set(ponentesTrabajo)].map((ponente, index) => (
											<li key={index}>{ponente}</li>
										))}
									</ul>
								) : (
									<p>No hay ponentes disponibles</p>
								)}
							</div>
						</p>
					</div>
				</p>
			</div>
		</div>
	);
};

export default Card;
