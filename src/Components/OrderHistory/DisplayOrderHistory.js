import React from "react";

// Display the order history using the array orderHistoryArray, passed by FetchOrderHistory
export default function DisplayOrderHistory(props) {
  return (
    <React.Fragment>
      <hr />
      {props.orderHistoryArray.map((eachOrder) => {
        return (
          <React.Fragment key={Math.random() * 1000}>
            {eachOrder.map((eachProduct) => {
              if (eachProduct.totalBill) {
                return `Total Bill : $ ${" "} ${eachProduct.totalBill}`;
              }
              return (
                <div key={Math.random() * 1000}>
                  <p>
                    {eachProduct.title} x {eachProduct.count} ={" "} {eachProduct.totalItemPrice}
                  </p>
                </div>
              );
            })}
            <hr /> {/* Horizontal Line after each order*/}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
