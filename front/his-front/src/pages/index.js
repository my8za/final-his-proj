import React from 'react'
import { Provider } from 'react-redux';
import PagiNavigation from './PagiNavigation';
import store from '../redux/Store';


const index = () => {

  return (
    <div>
      <Provider store={store}>
      <PagiNavigation />
      </Provider>
    </div>
  )
}

export default index;
