import React from "react"
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from "react-native"
import { ListInput } from "../../components/list-input"
import { Subscribe } from "unstated"
import { RootStore } from "../../app/root-component"
/*
  STEP NINE
  • Convert AsyncStorage → Unstated (https://github.com/jamiebuilds/unstated)
  • Convert packing-list-screen & input-screen → Tabs Navigator
*/

export class PackingListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Packing List",
      headerRight: (
        <Text style={{ marginRight: 10 }} onPress={() => navigation.navigate("Input")}>
          Input
        </Text>
      )
    }
  }

  listItems(item, index, store) {
    const backgroundColor = index % 2 === 0 ? "dodgerblue" : "indigo"
    return (
      <TouchableOpacity
        onPress={() => store.checkItem(item, store)}
        style={[styles.itemWrapper, { backgroundColor }]}
        key={index}
      >
        <Text style={styles.item}>{item.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { navigation } = this.props
    const items = navigation.getParam("items", [])
    return (
      <Subscribe to={[RootStore]}>
        {store => (
          <View style={styles.container}>
            <FlatList
              data={store.state.items}
              keyExtractor={item => item}
              renderItem={({ item, index }) => this.listItems(item, index, store)}
              contentContainerStyle={styles.listContainer}
              style={styles.list}
              numColumns={3}
            />
          </View>
        )}
      </Subscribe>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  list: {
    padding: 20,
    borderWidth: 1,
    borderColor: "lightgray"
  },
  listContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "white"
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    height: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    margin: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "bisque"
  }
})
