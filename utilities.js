const MODAL_ID = "modal";
const MODAL_MESSAGE_ID = "message";
const MODAL_BUTTON_CLOSE_ID = "close";

class Utilities {
  static domElement(classOrId) {
    const char = classOrId.charAt(0);
    if (char !== "." && char !== "#") {
      classOrId = `#${classOrId}`; // eslint-disable-line no-param-reassign
    }
    return document.querySelector(classOrId);
  }

  static hide(classOrId) {
    const element = Utilities.domElement(classOrId)
    element.style.display = "none";
  }

  static show(classOrId) {
    const element = Utilities.domElement(classOrId)
    element.style.display = "block";
  }

  static randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static showMessage(message, callBack = () => {}) {
    setTimeout(() => {
      const messageElement = Utilities.domElement(MODAL_MESSAGE_ID);
      messageElement.innerHTML = message;

      const buttonClose = Utilities.domElement(MODAL_BUTTON_CLOSE_ID);
      buttonClose.onclick = function (e) {
        Utilities.hide(MODAL_ID);
        callBack(e);
      }

      Utilities.show(MODAL_ID);
    }, 100);
  }
}
