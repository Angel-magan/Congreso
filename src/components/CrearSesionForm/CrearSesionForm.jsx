
const CrearSesionForm = ({ text, type, placeholder, value, onChange }) => {

    return (
        <div className="col-md-12 p-2 mt-3 d-flex flex-column align-items-center">
            <div className="d-md-flex d-sm-inline-block align-items-center justify-content-center w-50">
                <div className="w-75">
                    <p className="fw-bold mb-0 text-start">{text}</p>
                </div>
                <input
                    type={type} 
                    placeholder={`${placeholder}`}
                    value={value}
                    className="form-control border border-primary"
                    onChange={onChange}
                    min={1}
                />
            </div>
        </div>  
    )
}

export default CrearSesionForm;