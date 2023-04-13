import React from 'react'
import s from './Preloader.module.css'
import preloader from './../../../assets/images/preloader.gif'

const Preloader = () => {
  return (
    <div className={s.overlay}>
      <img className={s.loader} src={preloader} alt='loading' />
    </div>
  )
}

export default Preloader
