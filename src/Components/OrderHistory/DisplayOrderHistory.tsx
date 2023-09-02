import React from "react";
import { useHistory } from "react-router-dom";
import { OrderItem } from "../../Store/model";
import Card from "../../UI/Card/Card";
import cssClasses from './DisplayOrderHistory.module.css';

interface Props {
  orderHistoryArray: OrderItem[][];
};

// Display the order history using the array orderHistoryArray, passed by FetchOrderHistory
export default function DisplayOrderHistory(props: Props) {
  const history = useHistory();
  return (
    <Card className={cssClasses.orderHistoryContainer}>
      {props.orderHistoryArray.map((eachOrder) => {
        return (
          <table key={Math.random() * 1000} className={cssClasses.eachOrderHistory}>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Cost</th>
            </tr>

            {eachOrder.map((eachProduct, index) => {
              return (
                <>
                  <tr key={Math.random() * 1000} onClick={() => history.push(`shop/${eachProduct.id}`)} style={{'cursor':'pointer'}}>
                      <td>{eachProduct.title}</td> <td>{eachProduct.count}</td> <td>$ {eachProduct.totalItemPrice}</td>
                  </tr>
                  {/* In one of the item of each order, the totalBill is embdded */}
                  {index === eachOrder.length-1 &&
                    <span className={cssClasses.totalBill}>
                      Total Bill :  $ {eachOrder.filter(x => x.totalBill)[0].totalBill}
                    </span>
                  }
                </>
              );
            })
            }

          </table>
        );
      })}
    </Card>
  );
}
