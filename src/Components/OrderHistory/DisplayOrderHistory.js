import React from "react";
import { useHistory } from "react-router-dom";
import Card from "../../UI/Card/Card";
import cssClasses from './DisplayOrderHistory.module.css';

// Display the order history using the array orderHistoryArray, passed by FetchOrderHistory
export default function DisplayOrderHistory(props) {
  const history = useHistory();
  return (
    <Card className={cssClasses.orderHistoryContainer}>
      {props.orderHistoryArray.map((eachOrder) => {
        return (
          <Card key={Math.random() * 1000} className={cssClasses.eachOrderHistory}>
            {eachOrder.map((eachProduct) => {
              if (eachProduct.totalBill) {
                return (
                  <span className={cssClasses.totalBill}>
                    Total Bill :  $ {eachProduct.totalBill}
                  </span>);
              }
              return (
                <div key={Math.random() * 1000}>
                  <p>
                    <span onClick={() => history.push(`shop/${eachProduct.id}`)} style={{'cursor':'pointer'}}>{eachProduct.title}</span> x {eachProduct.count} =${" "} {eachProduct.totalItemPrice}
                  </p>
                </div>
              );
            })}
          </Card>
        );
      })}
    </Card>
  );
}
