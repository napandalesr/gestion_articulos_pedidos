import React from "react";
import { userForm } from "../../CustomForm/UseForm";

import "./styles.scss";
import Button from "../../Components/Button";

interface props {
  SaveData: (dataSource: any) => Promise<boolean>
  success: boolean
  errors: boolean
}

export const ArticlesForm: React.FC<props> = ({ SaveData, success, errors }) => {
  const [loading, setLoading] = React.useState(false);
  const { handleSubmit, handleChange, values, validate } = userForm(async (event) => { await Save(event); });

  const Save = async (event: any): Promise<void> => {
    setLoading(true);
    try {
      const status = await SaveData(values);
      if (status) {
        event.target.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return <>
  <form onSubmit={handleSubmit} className={`row g-3 needs-validation ${validate ? "was-validated" : ""}`} noValidate data-testid="form">
    <div className="col-md-10">
      <label htmlFor="referencia" className="form-label">Referencia</label>
      <input type="text" name="reference" className="form-control" id="referencia" required onChange={handleChange}/>
      <div className="invalid-feedback">
        El campo Referencia es requerido!
      </div>
    </div>
    <div className="col-md-4">
      <label htmlFor="nombre" className="form-label">Nombre</label>
      <input type="text" name="name" className="form-control" id="nombre" required onChange={handleChange}/>
      <div className="invalid-feedback">
        El campo Nombre es requerido!
      </div>
    </div>
    <div className="col-md-4">
      <label htmlFor="price_tax_free" className="form-label" aria-describedby="price_tax_free_prefix">Precio sin impuesto</label>
      <div className="input-group has-validation">
        <span className="input-group-text" id="price_tax_free_prefix">$</span>
        <input type="number" name="price_tax_free" className="form-control" id="price_tax_free" required onChange={handleChange}/>
        <div className="invalid-feedback">
          El campo Precio sin impuesto es requerido!
        </div>
      </div>
    </div>
    <div className="col-md-4">
    <label htmlFor="tax" className="form-label">Impuesto aplicable</label>
      <div className="input-group has-validation">
      <span className="input-group-text" id="price_tax_free_prefix">%</span>
        <input type="number" name="tax" className="form-control" id="tax" required onChange={handleChange}/>
        <div className="invalid-feedback">
          El campo Impuesto aplicable es requerido!
        </div>
      </div>
    </div>
    <div className="col-md-12">
      <label htmlFor="description" className="form-label">Descripción</label>
      <textarea className="form-control" name="description" id="description" required onChange={handleChange}/>
      <div className="invalid-feedback">
        El campo Descripción es requerido!
      </div>
    </div>
    <div className="col-12">
      <Button
      clase="btn btn-primary"
      event={() => {}}
      text="Crear Artículo"
      type="submit"/>
    </div>
  </form>
  {
    loading &&
    <div className="form-disable">
      <p>Cargando...</p>
    </div>
  }
  <br/>
  {
    success &&
    <div className="alert alert-primary" role="alert">
      Artículo guardado correctamente
    </div>
  }
  {
    errors &&
    <div className="alert alert-danger" role="alert">
      Ha ocurrido un error, intente de nuevo
    </div>
  }
  </>;
};

export default ArticlesForm;
