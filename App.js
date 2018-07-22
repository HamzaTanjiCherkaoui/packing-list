import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  TouchableHighlight
} from "react-native"

/*
  STEP THREE
  • Introduction to controlling a component - TextInput
  • Clear input
  • Add more styling - corners & shadows

*/

export default class App extends Component {
  state = {
    inputValue: null,
    items: [],
    switchOn: false
  }

  handleInput = value => {
    this.setState({ inputValue: value })
  }

  addNewItem() {
    const { inputValue, items } = this.state
    if (inputValue) {
      const newItems = [...items, { name: inputValue, checked: false }]
      this.setState({ items: newItems })
      this.input.clear()
    }
  }

  clearItems() {
    this.setState({ items: [] })
    this.input.clear()
  }
  checkItem = selectedItem => {
    const selectedName = selectedItem.name
    const newItems = this.state.items.map(item => {
      const { name, checked } = item
      return name === selectedName ? { name: name, checked: !checked } : item
    })
    this.setState({ items: newItems })
  }

  renderInputRow = () => {
    const { inputValue } = this.state
    return (
      <View style={styles.inputRow}>
        <TextInput
          ref={ref => (this.input = ref)}
          style={styles.input}
          value={inputValue}
          onChangeText={this.handleInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => this.addNewItem()}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={() => this.clearItems()}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { items, switchOn } = this.state
    return (
      <View style={styles.container}>
        {this.renderInputRow()}
        <Switch
          ref={taco => (this.switchy = taco)}
          value={switchOn}
          onValueChange={() =>
            this.setState(state => {
              return {
                switchOn: !state.switchOn
              }
            })
          }
        />
        <TouchableHighlight
          style={{ padding: 10, backgroundColor: "orange", marginTop: 20 }}
          onPress={() => this.switchy.setNativeProps({ value: true })}
        >
          <Text>Turn it On</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ padding: 10, backgroundColor: "pink" }}
          onPress={() => this.switchy.setNativeProps({ value: false })}
        >
          <Text>Turn it Off</Text>
        </TouchableHighlight>
        <View style={{ marginTop: 20 }}>
          {items.map((item, index) => {
            const backgroundColor = item.checked ? "dodgerblue" : "indigo"
            return (
              <TouchableOpacity
                onPress={() => this.checkItem(item)}
                style={[styles.itemWrapper, { backgroundColor }]}
                key={index}
              >
                <Text style={styles.item}>{item.name.toUpperCase()}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "50%",
    height: 40,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 5,
    fontSize: 16
  },
  theValue: {
    margin: 10,
    fontSize: 18
  },
  inputRow: {
    flexDirection: "row"
  },
  addButton: {
    marginLeft: 10,
    justifyContent: "center",
    backgroundColor: "green"
  },
  clearButton: {
    marginLeft: 10,
    justifyContent: "center",
    backgroundColor: "gray"
  },
  buttonText: {
    margin: 5,
    color: "white"
  },
  itemWrapper: {
    margin: 2,
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    margin: 5,
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
  }
})
