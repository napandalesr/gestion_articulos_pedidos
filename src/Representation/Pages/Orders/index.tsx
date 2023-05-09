import React from "react";
import OrderForm from "../../Containers/OrderForm";
import { OrderController } from "../../../App/Controller/OrderController/order.controller";
import { ArticleController } from "../../../App/Controller/ArticleController/article.controller";

export const Orders: React.FC = () => {
  const [articles, setArticles] = React.useState([]);
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    void getArticles().then((data) => {
      console.log(data);
    });
  }, []);
  const SaveOrder = async (dataSource: any): Promise<void> => {
    try {
      const orderController = new OrderController();
      const response: any = await orderController.post(dataSource);
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
        console.log("Success");
      }
    } catch (err) {
      console.log(err);
    };
  };

  const getArticles = async (): Promise<void> => {
    try {
      const articleController = new ArticleController();
      const response: any = await articleController.getAll();
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
        console.log("Success");
        setArticles(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <section className="pedidos p-3">
  <h2 className="p-3">Pedidos</h2>
  <hr />
  <OrderForm SaveData={SaveOrder} articles={articles}/>
  </section>;
};

export default Orders;
