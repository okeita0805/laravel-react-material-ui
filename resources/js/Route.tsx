import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BusinessHour from "./entry/BusinessHour";
import Holiday from "./entry/Holiday";
import Index from "./entry/Index";
import OrderStop from "./entry/OrderStop";
import Sale from "./entry/Sale";
import Setting from "./entry/Setting";
import SoldOut from "./entry/SoldOut";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* 注文状況 */}
        <Route exact path="/">
          <Index />
        </Route>
        {/* 商品売切れ設定 */}
        <Route exact path="/sold_out">
          <SoldOut />
        </Route>
        {/* 売上管理 */}
        <Route exact path="/sales">
          <Sale />
        </Route>
        {/* 営業時間設定 */}
        <Route exact path="/business_hours">
          <BusinessHour />
        </Route>
        {/* 休業日設定 */}
        <Route exact path="/holidays">
          <Holiday />
        </Route>
        {/* 注文受け付け停止 */}
        <Route exact path="/order_stop">
          <OrderStop />
        </Route>
        {/* 設定 */}
        <Route exact path="/settings">
          <Setting />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
