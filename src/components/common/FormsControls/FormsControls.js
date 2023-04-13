import { Field } from 'redux-form'
import s from './FormsControls.module.css'

export const Textarea = (props) => {
  const { input, meta, child, size, label, ...restProps } = props
  const sizeClass = size === 'large' ? s.formControlLarge : s.formControlSmall
  return (
    <div className={s.formGroup}>
      <textarea
        className={`${s.formControl} ${sizeClass}`}
        {...input}
        {...restProps}
      />
      <label htmlFor={restProps.name} className={s.textareaLabel}>
        {label}
      </label>
      <div className={s.focusLine}></div>
    </div>
  )
}

export const Input = (props) => {
  const { input, meta, child, label, className, ...restProps } = props;
  const hasError = meta.touched && meta.error;
  return (
    <div className={`${s.inputWrapper} ${hasError ? s.error : ""}`}>
      <div className={s.inp}>
        <input {...input} {...restProps} className={s.inpInput} />
        <span className={s.labelInput}>{label}</span>
        <span className={s.focusBg}></span>
      </div>
      {hasError && <div className={s.errorMsg}>{meta.error}</div>}
    </div>
  );
};


export const createField = (
  label,
  name,
  validators,
  component,
  size,
  props = {},
  text = ''
) => (
  <div>
    <Field
      name={name}
      validate={validators}
      component={component}
      label={label}
      size={size}
      {...props}
    />{' '}
    {text}
  </div>
)
