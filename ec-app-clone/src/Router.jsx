import React from "react";
import { Route, Switch } from "react-router";
import { ProductEdit,Reset,SignIn, ProductList, SignUp,ProductDetail } from "./templates";
import Auth from "./Auth";
import CartList from './templates/CartList';
import OrderConfirm from './templates/OrderConfirm';
import OrderHistory from './templates/OrderHistory';
import OrderComplete from './templates/OrderComplete';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/SignUp"} component={SignUp} />
      <Route exact path={"/SignIn"} component={SignIn} />
      <Route exact path={"/SignIn/reset"} component={Reset} />

      <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route exact path={"/product/:id"} component={ProductDetail} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />
        <Route exact path={"/cart"} component={CartList} />
        <Route exact path={"/order/confirm"} component={OrderConfirm} />
        <Route exact path={"/order/history"} component={OrderHistory} />
        <Route exact path={"/order/complete"} component={OrderComplete} />
      </Auth>
      {/* <Route path="/posts/:id" component={Post} /> */}
    </Switch>
  );
};

export default Router;
