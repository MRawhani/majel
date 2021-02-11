const validate = (selectedElement, formData) => {
  let error = [true, ""];
  if (selectedElement.validation.email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const valid = re.test(String(selectedElement.value).toLowerCase());
    const message = `${!valid ? "الايميل غير صحيح" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  if (selectedElement.validation.confirm) {
    const valid =
      selectedElement.value ===
      formData[selectedElement.validation.confirm].value;
    const message = `${!valid ? "كلمة السر غير متطابقة" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  if (selectedElement.validation.required) {
    const valid = selectedElement.value !== "";
    const message = `${!valid ? "الحقل مطلوب" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  return error;
};
// the element consisits of event, id, and blur
export const update = (element, formData, formNmae) => {
  const newFormData = { ...formData };
  //this will select the data of id: email or password
  const selectedElement = { ...newFormData[element.id] };
  selectedElement.value = element.event.target.value;

  if (element.blur) {
    const validData = validate(selectedElement, formData);
    selectedElement.valid = validData[0];
    selectedElement.validationMessage = validData[1];
  }

  selectedElement.touched = element.blur;
  newFormData[element.id] = selectedElement;

  return newFormData;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    if (key !== "confirmPassword") {
      dataToSubmit[key] = formData[key].value;
    }
  }
  return dataToSubmit;
};

export const isFormValid = (formData, formName) => {
  let formIsValid = true;

  for (let key in formData) {
    const validData = validate(formData[key], formData);
    formData[key].valid = validData[0];
    formData[key].touched = true;
    formData[key].validationMessage = validData[1];
    formIsValid = formData[key].valid && formIsValid; // checking the whole form
  }

  return formIsValid;
};
export const populateOptionFeilds = (formData, arrayData = [], feild) => {
  const newArray = [];
  const newFormData = { ...formData };
  arrayData.forEach(item => {
    newArray.push({ key: item._id, value: item.name });
  });

  newFormData[feild].config.options = newArray;
  return newFormData;
};
export const reserFeildData = (fromData,type)=>{
  const newFormData = {...fromData}
  for(let key in newFormData){
    newFormData[key].value=''
    newFormData[key].valid=false;
    newFormData[key].touched=false
    newFormData[key].validationMessage=''
  }
  return newFormData
}
