import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { AppNavigator } from "./src/_navigation/appNavigator";
import { firebaseConfig } from "./configFirebase";
import firebase from "firebase";
import { offStocks, getStockQuantity } from "./src/firebase";

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  changeNavigation = (preState, currentState) => {
    if (currentState.index === 1) {
      offStocks();
    } else if (currentState.index === 0) {
      store.dispatch(getStockQuantity());
    }
  };

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator
            onNavigationStateChange={(preState, currentState) =>
              this.changeNavigation(preState, currentState)
            }
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    alignItems: "stretch"
  }
});
