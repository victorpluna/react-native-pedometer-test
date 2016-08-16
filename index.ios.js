import React from 'react'
import { AppRegistry } from 'react-native'
import Root from './App/Root'
import './App/Config/ReactotronConfig'
import configureStore from './App/Store/Store'
import Pedometer from 'react-native-pedometer'

// Handling store here to avoid hot-reloading issues
const store = configureStore()
class RNBase extends React.Component {
  render () {
    Pedometer.isStepCountingAvailable(function (err, data) {
      if (data){
        console.log('sucesso!');
        var date = new Date();date.setHours(0); date.setMinutes(0);date.setSeconds(0); date.setMilliseconds(0);
        Pedometer.startPedometerUpdatesFromDate(date, function (data) {
          console.log(data);
        });
      }else{
        console.log('falha', err)
      }
    });
    return <Root {...this.props} store={store} />
  }
}

AppRegistry.registerComponent('pedometer', () => RNBase)
