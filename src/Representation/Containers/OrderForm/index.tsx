import React from "react";
import { differenceBy } from "lodash";

import { userForm } from "../../CustomForm/UseForm";
import Button from "../../Components/Button";
import Alert from "../../Components/Alert";

import "./styles.scss";

interface props {
  SaveData: (dataSource: any) => Promise<void>
  updateOrder: (id: number, dataSource: any) => Promise<void>
  articles: dataSource[]
  success: boolean
  errors: boolean
  textModal: string
  idParams: string | undefined
  defaultValue: dataSourceOrder
}

interface dataSource {
  id: number
  reference: string
  name: string
  price_tax_free: string
  tax: string
}

interface dataSourceOrder {
  id: string
  articles: Article[]
  price_total_tax_free: string
  price_total_tax: string
}

export interface Article {
  idArticle: number
  amount: number
  reference: string
}

export const OrderForm: React.FC<props> = ({
  SaveData,
  updateOrder,
  articles,
  success,
  errors,
  textModal,
  idParams,
  defaultValue
}) => {
  const [articlesSelects, setArticlesSelects] = React.useState<any[]>([]);
  const [totalPriceTaxFree, setTotalPriceTaxFree] = React.useState<number>(idParams !== undefined ? parseInt(defaultValue.price_total_tax_free) : 0);
  const [totalPriceTax, setTotalPriceTax] = React.useState<number>(idParams !== undefined ? parseInt(defaultValue.price_total_tax) : 0);
  const [amountOrder, setAmountOrder] = React.useState<number>(0);
  const [articlesShow, setArticlesShow] = React.useState<any[]>([]);
  const { handleSubmit, handleChange, validate } = userForm(async (event) => { await Save(event); });
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (idParams !== undefined) {
      let dataDefaultShowSelect: any[] = [];
      let dataDefaultSelected: any[] = [];
      setTotalPriceTaxFree(parseInt(defaultValue.price_total_tax_free));
      setTotalPriceTax(parseInt(defaultValue.price_total_tax));
      if (articles.length > 0) {
        for (let i = 0; i < defaultValue.articles.length; i++) {
          dataDefaultShowSelect = [
            ...dataDefaultShowSelect,
            ...articles.map(item => item.id === defaultValue.articles[i].idArticle &&
            { ...item, amount: defaultValue.articles[i].amount }).filter(item => item !== false)];
          if (i === defaultValue.articles.length - 1) {
            dataDefaultSelected = differenceBy(articles, dataDefaultShowSelect, "id");
            setArticlesSelects(dataDefaultShowSelect);
            setArticlesShow(dataDefaultSelected);
          }
        }
      }
    } else {
      setArticlesShow(articles);
    }
  }, [articles, idParams, defaultValue]);
  React.useEffect(() => {
    let total = 0;
    let totalPrice = 0;
    if (articlesSelects.length === 0) {
      setTotalPriceTax(0);
      setTotalPriceTaxFree(0);
    } else {
      for (let i = 0; i < articlesSelects.length; i++) {
        total += parseInt(articlesSelects[i].price_tax_free);
        if (i === articlesSelects.length - 1) {
          setTotalPriceTaxFree(total);
        }
      }
      for (let i = 0; i < articlesSelects.length; i++) {
        const tax = parseInt(articlesSelects[i].price_tax_free) * (parseInt(articlesSelects[i].tax) / 100);
        totalPrice += parseInt(articlesSelects[i].price_tax_free) + tax;
        if (i === articlesSelects.length - 1) {
          setTotalPriceTax(totalPrice);
        }
      }
    }
  }, [articlesSelects]);
  const Save = async (event: any): Promise<void> => {
    const order = {
      articles: articlesSelects.map(item => {
        return {
          idArticle: parseInt(item.id),
          amount: item.amount,
          reference: item.reference
        };
      }),
      price_total_tax_free: totalPriceTaxFree,
      price_total_tax: totalPriceTax
    };
    setLoading(true);
    try {
      await SaveData(order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      clearForm();
    }
  };

  const Update = async (event: any): Promise<void> => {
    const order = {
      articles: articlesSelects.map(item => {
        return {
          idArticle: parseInt(item.id),
          amount: item.amount,
          reference: item.reference
        };
      }),
      price_total_tax_free: totalPriceTaxFree,
      price_total_tax: totalPriceTax
    };
    setLoading(true);
    try {
      await updateOrder(idParams !== undefined ? parseInt(idParams) : 0, order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      clearForm();
    }
  };

  const handleChangeArticles = (event: any): void => {
    if (amountOrder === 0) {
      alert("Seleccione una cantidad superior a 0");
      event.target.value = "";
    } else {
      const value = event.target.value.split(",");
      event.target.value = "";
      const articleSelected = articlesShow.filter(item => item.id !== parseInt(value[0]));
      setArticlesShow(articleSelected);
      setArticlesSelects([...articlesSelects, { id: value[0], reference: value[1], name: value[2], price_tax_free: value[3], tax: value[4], amount: amountOrder }]);
      setAmountOrder(0);
    }
  };

  const handleCloseArticle = (id: any): void => {
    const articleClose = articles.filter(item => item.id === parseInt(id));
    const articleSelected = articlesSelects.filter(item => item.id !== id);
    setArticlesShow([...articlesShow, ...articleClose]);
    setArticlesSelects(articleSelected);
  };

  const clearForm = (): void => {
    setArticlesSelects([]);
    setTotalPriceTaxFree(0);
    setTotalPriceTax(0);
    setAmountOrder(0);
    setArticlesShow(articles);
  };
  return <>
  <div className="row">
    <div className="col-md-8">
      <label htmlFor="articulo" className="form-label">Artículo</label>
      <select className="form-select" id="articulo" aria-label="Default select example" onChange={handleChangeArticles}>
      <option selected></option>
        {
          articlesShow.map(item => <option value={[item.id, item.reference, item.name, item.price_tax_free, item.tax]}>Referencia: {item.reference} - Nombre: {item.name}</option>)
        }
      </select>
    </div>
  </div>
  <div className="row p-3">
    {
      articlesSelects.map(item =>
        <span className="shadow-sm p-1 mb-5 m-3 bg-body-tertiary rounded">
          Ref - {item.reference} | Nombre: {item.name} | Cantidad: {item.amount}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => { handleCloseArticle(item.id); }}></button>
        </span>)
    }
  </div>
  <form onSubmit={handleSubmit} className={`row g-3 needs-validation ${validate ? "was-validated" : ""}`} noValidate data-testid="form">
    <div className="col-md-4">
      <label htmlFor="amount" className="form-label">Cantidad</label>
      <input
        type="text"
        name="amount"
        className="form-control"
        id="amount"
        required
        value={amountOrder}
        onChange={(e) => { setAmountOrder(parseInt(e.target.value)); }}/>
      <div className="invalid-feedback">
        El campo Cantidad es requerido!
      </div>
    </div>
    <div className="invalid-feedback">
      El campo Artículo es requerido!
    </div>
    <div className="col-md-4">
      <label htmlFor="price_total_tax_free" className="form-label">Precio total sin impuestos</label>
      <input
        type="text"
        name="price_total_tax_free"
        className="form-control"
        id="price_total_tax_free"
        disabled
        value={totalPriceTaxFree}
        onChange={handleChange}/>
      <div className="invalid-feedback">
        El campo Cantidad es requerido!
      </div>
    </div>
    <div className="col-md-4">
      <label htmlFor="price_total_tax" className="form-label">Precio total con impuestos</label>
      <input
        type="text"
        name="price_total_tax"
        className="form-control"
        id="price_total_tax"
        disabled
        value={totalPriceTax}
        onChange={handleChange}/>
      <div className="invalid-feedback">
        El campo Cantidad es requerido!
      </div>
    </div>
    {
      idParams !== undefined
        ? <Button
          clase="btn btn-warning"
          event={() => { void Update(idParams); }}
          text="Actualizar pedido"
          type="button"/>
        : <Button
          clase="btn btn-primary"
          event={() => {}}
          text="Crear pedido"
          type="submit"/>
    }
  </form>
  {
    loading &&
    <div className="form-disable">
      <p>Cargando...</p>
    </div>
  }
  {
    success && <Alert type="success" message={textModal}/>
  }
  {
    errors && <Alert type="danger" message={textModal}/>
  }
  </>;
};

export default OrderForm;
