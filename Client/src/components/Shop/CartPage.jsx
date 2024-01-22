import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decrementItemAction,
  getCartAction,
  incrementItemAction,
  removeItemAction,
} from "../../Redux/cartReducer/action";
import { Text, Spinner, Button } from "@chakra-ui/react";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.authReducer);
  const { cartData, isLoading } = useSelector((store) => store.cartReducer);

  useEffect(() => {
    dispatch(getCartAction(token));
  }, []);

  const handleIncrement = (productId) => {
    dispatch(incrementItemAction(token, productId, cartData));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementItemAction(token, productId, cartData));
  };

  const handleRemove = (productId) => {
    // console.log("productID from button", productId);
    dispatch(removeItemAction(token, productId, cartData));
  };
  const calculateTotal = () => {
    const totalPrice = cartData.reduce(
      (total, item) => total + item?.productId?.price * item?.quantity,
      0
    );
    console.log("toatlPrice", totalPrice);
    return totalPrice;
  };
  calculateTotal();

  if (isLoading === undefined || isLoading) {
    // Render a loading spinner or message
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </div>
    );
  }
  return (
    <div style={{ overflowX: "hidden", overflow: "hidden" }}>
      <hr style={{ border: "2px solid gray" }} />
      <h1 style={{ marginBottom: "15px", marginTop: "15px" }}>
        CART LIST : {cartData?.length}
      </h1>
      {/* <h1 style={{ marginBottom: "15px", marginTop: "15px" }}>
        Total : {calculateTotal()}
      </h1> */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text>Hello</Text>
        {Array.isArray(cartData) &&
          cartData.length > 0 &&
          cartData.map((item, index) => {
            // Your existing rendering logic
            const imageUrl =
              item?.productId?.image && item.productId.image[0]
                ? item.productId.image[0]
                : null;

            return (
              <div
                key={item?.productId?._id}
                style={{
                  margin: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {imageUrl && (
                    <img
                      style={{
                        width: "50%",
                      }}
                      src={imageUrl}
                      alt={item?.productId?.title}
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      lineHeight: "2",
                      marginLeft: "10px",
                    }}
                  >
                    <p
                      style={{
                        color: "red",
                        fontWeight: 800,
                        fontSize: "16px",
                      }}
                    >
                      {item?.productId?.artist}{" "}
                    </p>
                    <p style={{ fontSize: "12px" }}>
                      {item?.productId?.subtitle}
                    </p>
                    <strong>
                      {" "}
                      <p> $ {item?.productId?.price} </p>{" "}
                    </strong>
                    <p> Quantity: {item?.quantity} </p>

                    <Button
                      onClick={() => handleIncrement(item?.productId?._id)}
                    >
                      Increment
                    </Button>
                    <Button
                      onClick={() => handleDecrement(item?.productId?._id)}
                    >
                      Decrement
                    </Button>
                    <strong>
                      <Button
                        onClick={() => handleRemove(item?.productId?._id)}
                      >
                        Remove
                      </Button>
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CartPage;
