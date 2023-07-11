import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { DisplayTareas } from '../components/DisplayTareas'

describe('<DisplayTareas />', () => {
  const defaultProps = {}
  const wrapper = renderer.create(
    <Provider store={store}>
     <DisplayTareas {...defaultProps} />
    </Provider>,
  )

  test('render DisplayTareas', () => {
    expect(wrapper).toMatchSnapshot()
  })
})