const createError = (setErrTxt, txt) => {
  setErrTxt(txt);
  const modal = document.getElementById("error-modal");
  if (modal) {
    modal.showModal();
  } else {
    console.error("Modal not found");
  }
};
export default createError;
