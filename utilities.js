class Utilities {
  static domElement(classOrId) {
    const char = classOrId.charAt(0);
    if (char !== "." && char !== "#") {
      classOrId = `#${classOrId}`; // eslint-disable-line no-param-reassign
    }
    return document.querySelector(classOrId);
  }

  static randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
