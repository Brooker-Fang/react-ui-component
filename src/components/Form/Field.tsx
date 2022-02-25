import React, { ReactElement, useContext, useEffect, useState } from "react"
import { FC } from "react"
import FieldContext from "./FormContext"

interface Props{
  name: string
  rules: any
}
class Field extends React.Component<Props> {
  static contextTypes = FieldContext
  componentDidMount() {
    const { setFieldEntities } = this.context
    setFieldEntities(this)
  }
  onStoreChange = () => {
    this.forceUpdate()
  }
  getControlled = () => {
    const { name } = this.props
    const { getFieldValue, setFieldsValue } = this.context
    return {
      value: getFieldValue(name),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        console.log(newValue)
        setFieldsValue({ 
          [name]: newValue,
        })
      }
    }
  }
  render() {
    const {children} = this.props
    const returnChildNode = React.cloneElement(children as ReactElement, this.getControlled())
    return <>{returnChildNode}</>
  }
}
export default Field