import React from 'react'
import PropTypes from 'prop-types'
import s from './Button.module.css'

const Button = ({ buttonText, onClick, size }) => {
  return (
    <button className={`${s.button} ${s[size]}`} onClick={onClick}>
      <span className={s.buttonText}> {buttonText} </span>
    </button>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}

Button.defaultProps = {
  size: 'medium',
}

export default Button
