import { render, screen, fireEvent } from "@testing-library/react"
import Button, { ButtonProps, ButtonSize, ButtonType} from ".";
const defaultProps = {
  onClick: jest.fn()
}
const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: 'test-class'
}
const disableProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}
describe('test Button Component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>test</Button>)
    const element = screen.getByText('test') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element.disabled).toBeFalsy()
    expect(element).toHaveClass('btn btn-default')
    // 触发事件
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>test</Button>)
    const element = screen.getByText('test')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg test-class')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    render(<Button btnType={"link"} href="https://baidu.com">Link</Button>)
    const element = screen.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disableProps}>test</Button>)
    const element = screen.getByText('test') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    expect(element).toHaveClass('btn btn-default')
    // 触发事件
    fireEvent.click(element)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
})