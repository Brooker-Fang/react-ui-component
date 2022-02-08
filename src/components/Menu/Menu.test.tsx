import { render, RenderResult } from '@testing-library/react'
import { createBuilderStatusReporter } from 'typescript'
import Menu, { MenuItem, MenuProps } from '.'
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props} data-test="test-id" data-id="12345">
        <MenuItem index="0">
          menu1
        </MenuItem>
        <MenuItem disabled index="1">
          menu2
        </MenuItem>
        <MenuItem index="2">
          menu3
        </MenuItem>
      </Menu>
  )
}
let wrapper:HTMLElement
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    // wrapper = generateMenu(testProps)
    
  })
  it('should render correct Menu and MenuItem based on default props', () => {

  })
  it('click items should change active and call the right callback', () => {
    
  })
  it('should render vertical mode when mode is set to vertical', () => {
    
  })
})