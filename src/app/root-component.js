import React, { Component } from "react"
import { PackingListScreen } from "../screens/packing-list-screen"
import { InputScreen } from "../screens/input-screen"

/*
  STEP FIVE
  • Setup basic project folder structure
*/

export default class RootComponent extends Component {
  render() {
    return <InputScreen />
  }
}
