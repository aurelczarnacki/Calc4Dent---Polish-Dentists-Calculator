import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router"; // Dodajemy Redirect
import Menu from "./components/Menu";
import Kalkulator from "./components/Kalkulator";
import Historia from "./components/Historia";
import ListaKodow from "./components/ListaKodow";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Redirect exact from="/" to="/kalkulator" />
          <Route path="/kalkulator" component={Kalkulator} exact={true} />
          <Route path="/historia" component={Historia} exact={true} />
          <Route path="/lista-kodow" component={ListaKodow} exact={true} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
