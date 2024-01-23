/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/validacionesInputs.js":
/*!**************************************!*\
  !*** ./src/js/validacionesInputs.js ***!
  \**************************************/
/***/ (() => {

eval("//* Emails\r\nconst input = document.querySelector('.email');\r\n\r\ninput.addEventListener('keypress', (event) => {\r\n  const key = event.key;\r\n  const regex = /[0-9a-zA-Záéíóú@.,-]/g;\r\n\r\n  if (!regex.test(key)) {\r\n    event.preventDefault();\r\n  }\r\n});\r\n\r\n\r\n//* SoloLetras\r\nconst inputLetras = document.querySelector('.soloLetras');\r\n\r\ninputLetras.addEventListener('keypress', (event) => {\r\n  const key = event.key;\r\n  console.key\r\n  const regex = /[a-zA-Záéíóú ]/g;\r\n\r\n  if (!regex.test(key)) {\r\n    event.preventDefault();\r\n  }\r\n});\n\n//# sourceURL=webpack://bienes-raices-mvc/./src/js/validacionesInputs.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/validacionesInputs.js"]();
/******/ 	
/******/ })()
;