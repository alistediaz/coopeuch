import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import store from '../redux/store'
import { Tareas } from '../components/Tareas'

describe('<Tareas />', () => {
  const defaultProps = {}
  const wrapper = renderer.create(
    <Provider store={store}>
     <Tareas {...defaultProps} />
    </Provider>,
  )

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})