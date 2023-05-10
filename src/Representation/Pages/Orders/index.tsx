import React from "react";
import OrderForm from "../../Containers/OrderForm";
import { OrderController } from "../../../App/Controller/OrderController/order.controller";
import { ArticleController } from "../../../App/Controller/ArticleController/article.controller";
import OrderList from "../../Containers/OrderList";
import { useNavigate, useParams } from "react-router-dom";
import { _Routes } from "../../Utils/Constants";

export const Orders: React.FC = () => {
  const [articles, setArticles] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [textModal, setTextModal] = React.useState("");
  const { idParams } = useParams();
  const navigate = useNavigate();
  const [defaultValue, setDefaulValue] = React.useState({
    id: "",
    articles: [{
      idArticle: 0,
      amount: 0,
      reference: ''
    }],
    price_total_tax_free: "",
    price_total_tax: ""
  });
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    void getArticles().then((data) => {
      console.log(data);
    });
    // eslint-disable-next-line @typescript-eslint/no-shadow
    void getAllOrder().then((data) => {
      console.log(data);
    });
  }, []);
  React.useEffect(() => {
    if (idParams !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      void getIOrder(parseInt(idParams)).then((data) => {
        console.log(data);
      });
    }
  }, [idParams]);
  const getIOrder = async (id: number): Promise<void> => {
    try {
      const orderController = new OrderController();
      const response: any = await orderController.getId(id);
      setDefaulValue(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const SaveOrder = async (dataSource: any): Promise<void> => {
    if (dataSource.articles.length === 0) {
      setTextModal("Registre los datos");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else {
      try {
        const orderController = new OrderController();
        const response: any = await orderController.post(dataSource);
        // eslint-disable-next-line @typescript-eslint/prefer-includes
        if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
          await getAllOrder();
          setTextModal("Pedido guardado correctamente");
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
      } catch (err) {
        console.log(err);
        setTextModal("Ha ocurrido un error, intente de nuevo");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      };
    }
  };

  const getArticles = async (): Promise<void> => {
    try {
      const articleController = new ArticleController();
      const response: any = await articleController.getAll();
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
        setArticles(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllOrder = async (): Promise<void> => {
    try {
      const orderController = new OrderController();
      const response: any = await orderController.getAll();
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
        setOrders(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeOrder = async (id: number): Promise<void> => {
    try {
      const orderController = new OrderController();
      const response: any = await orderController.remove(id);
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
        await getAllOrder();
        setSuccess(true);
        setTextModal("Pedido eliminado correctamente");
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrder = async (id: number, dataSource: any): Promise<void> => {
    try {
      const orderController = new OrderController();
      const response: any = await orderController.update(id, dataSource);
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
        await getAllOrder();
        setSuccess(true);
        setTextModal("Artículo actualizado correctamente");
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
        setTimeout(() => {
          navigate("/" + _Routes.Orders);
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return <section className="pedidos p-3">
  <h2 className="p-3">Pedidos</h2>
  <hr />
  {
    idParams !== undefined
      ? <>
      {
        defaultValue.id !== "" &&
        <OrderForm
        SaveData={SaveOrder}
        articles={articles}
        success={success}
        errors={error}
        textModal={textModal}
        idParams={idParams}
        defaultValue={defaultValue}
        updateOrder={updateOrder}/>
      }</>
      : <OrderForm
        SaveData={SaveOrder}
        articles={articles}
        success={success}
        errors={error}
        textModal={textModal}
        idParams={idParams}
        defaultValue={defaultValue}
        updateOrder={updateOrder}/>
  }
  <hr />
  <OrderList dataSource={orders} removeOrder={removeOrder}/>
  </section>;
};

export default Orders;
