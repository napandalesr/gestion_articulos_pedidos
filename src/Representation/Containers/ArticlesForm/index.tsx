import React from "react";

export const ArticlesForm: React.FC = () => {
  const [validate, setValidate] = React.useState(false);

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    setValidate(true);
  };
  return <>
  <form onSubmit={handleSubmit} className={`row g-3 needs-validation ${validate ? "was-validated" : ""}`} noValidate>
    <div className="col-md-10">
      <label htmlFor="referencia" className="form-label">Referencia</label>
      <input type="text" className="form-control" id="referencia" required/>
      <div className="invalid-feedback">
        El campo Referencia es requerido!
      </div>
    </div>
    <div className="col-md-4">
      <label htmlFor="nombre" className="form-label">Nombre</label>
      <input type="text" className="form-control" id="nombre" required/>
      <div className="invalid-feedback">
        El campo Nombre es requerido!
      </div>
    </div>
    <div className="col-md-4">
      <label htmlFor="price_tax_free" className="form-label">Precio sin impuesto</label>
      <input type="text" className="form-control" id="price_tax_free" required/>
      <div className="invalid-feedback">
        El campo Precio sin impuesto es requerido!
      </div>
    </div>
    <div className="col-md-4">
      <label htmlFor="tax" className="form-label">Impuesto aplicable</label>
      <input type="text" className="form-control" id="tax" required/>
      <div className="invalid-feedback">
        El campo Impuesto aplicable es requerido!
      </div>
    </div>
    <div className="col-md-12">
      <label htmlFor="description" className="form-label">Descripción</label>
      <textarea className="form-control" id="description" required/>
      <div className="invalid-feedback">
        El campo Descripción es requerido!
      </div>
    </div>
    <div className="col-12">
      <button className="btn btn-primary" type="submit">Guardar</button>
    </div>
  </form>
  </>;
};

export default ArticlesForm;
