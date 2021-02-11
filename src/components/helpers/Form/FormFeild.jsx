import React from "react";

export default function FormFeild({ id, formData, change, isError }) {
  const showMessage = () => {
    // let errorMessage = null;
    // let isValid = true;
    let error = { errorMessage: null, isValid: true };

    if (formData.validation && !formData.valid) {
      error.isValid = false;
      error.errorMessage = (
        <div className="error_label">{formData.validationMessage}</div>
      );
    }
    return error;
  };
  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case "input":
        formTemplate = (
          <div className="formBlock">
            {showMessage().errorMessage}
            <div className="form__group">
              {formData.showLabel ? (
                <div className="label_inputs">{formData.config.label}</div>
              ) : null}
              <input
                {...formData.config}
                value={formData.value}
                onBlur={event => change({ event, id, blur: true })}
                onChange={event => change({ event, id, blur: true })}
                // onChange={event => change({ event, id })}
                className={`form__input ${
                  formData.touched
                    ? showMessage().isValid
                      ? " form__input__success"
                      : " form__input__error"
                    : "form__input__normal"
                }`}
                id={id}
              />
              {!formData.showLabel && (
                <label htmlFor={id} className="form__label">
                  {formData.config.placeholder}
                </label>
              )}
            </div>

            {/* <TextField
             error={error}
              id="standard-name"
              label= 'ايميل'
              value={formData.value}
              onChange={event => change({ event, id, blur: true })}
            
              helperText={formData.validationMessage}
            /> */}
          </div>
        );
        break;

      case "textarea":
        formTemplate = (
          <div className="formBlock">
            {showMessage().errorMessage}
            <div className="form__group">
              {formData.showLabel ? (
                <div className="label_inputs">{formData.config.label}</div>
              ) : null}
              <textarea
                {...formData.config}
                value={formData.value}
                onBlur={event => change({ event, id, blur: true })}
                onChange={event => change({ event, id, blur: true })}
                // onChange={event => change({ event, id })}
                className={`form__input ${
                  formData.touched
                    ? showMessage().isValid
                      ? " form__input__success"
                      : " form__input__error"
                    : "form__input__normal"
                }`}
                id={id}
              />
              {!formData.showLabel && (
                <label htmlFor={id} className="form__label">
                  {formData.config.placeholder}
                </label>
              )}
            </div>
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div className="formBlock">
            {showMessage().errorMessage}
            <div className="form__group">
              {formData.showLabel ? (
                <div className="label_inputs">{formData.config.label}</div>
              ) : null}
              <select
              style={{height:'50px'}}
                value={formData.value}
                onBlur={event => change({ event, id, blur: true })}
                onChange={event => change({ event, id, blur: true })}
                className={`form__input ${
                  formData.touched
                    ? showMessage().isValid
                      ? " form__input__success"
                      : " form__input__error"
                    : "form__input__normal"
                }`}
                id={id}
              >
                <option value="">اختار</option>
                {formData.config.options.map((option, i) => (
                  <option key={option._id} value={option._id}>
                    {option.street}
                  </option>
                ))}
              </select>
              {!formData.showLabel && (
                <label htmlFor={id} className="form__label">
                  {formData.config.placeholder}
                </label>
              )}
            </div>
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <div >{renderTemplate()}</div>;
}
