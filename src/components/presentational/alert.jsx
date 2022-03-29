import React from 'react'
import Styles from "../../style/alert.module.scss"
const Alert = ({type,text}) => {
  return (
    <div className={`${type === "danger"  ? Styles.alert_danger : Styles.alert_success}`}>
          <h1>{text}</h1>
    </div>
  )
}

export default Alert