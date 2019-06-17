import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { AppNavigator } from "./src/_navigation/appNavigator";
import { firebaseConfig } from "./configFirebase";
import firebase from "firebase";

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator />
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
