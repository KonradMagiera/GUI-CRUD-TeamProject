import {TEST_TEST} from '../actions/testAction'


var preloadedState = "Start"

export function testReducer(state = preloadedState, {type, message}) {
    Object.freeze(state)
    switch(type){
      case TEST_TEST:
        preloadedState = message
        return preloadedState
      default:
        return state
    }
  }