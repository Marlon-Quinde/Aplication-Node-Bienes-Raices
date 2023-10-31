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

/***/ "./src/js/cambiarEstado.js":
/*!*********************************!*\
  !*** ./src/js/cambiarEstado.js ***!
  \*********************************/
/***/ (() => {

eval("(function () {\r\n  const cambiarEstadoBotones = document.querySelectorAll(\".cambiar-estado\");\r\n  const token = document\r\n    .querySelector('meta[name=\"csrf-token\"]')\r\n    .getAttribute(\"content\");\r\n  cambiarEstadoBotones.forEach((botton) => {\r\n    botton.addEventListener(\"click\", cambiarEstadoPropiedad);\r\n  });\r\n\r\n  async function cambiarEstadoPropiedad(e) {\r\n    const { propiedadId: id } = e.target.dataset;\r\n\r\n    try {\r\n      const url = `/propiedades/${id}`;\r\n      const respuesta = await fetch(url, {\r\n        method: \"PUT\",\r\n        headers: { \"CSRF-TOKEN\": token },\r\n      });\r\n\r\n      const resultado = await respuesta.json();\r\n\r\n      console.log(resultado);\r\n    } catch (error) {\r\n      console.log(error);\r\n    }\r\n  }\r\n})();\r\n\n\n//# sourceURL=webpack://bienes-raices-mvc/./src/js/cambiarEstado.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/cambiarEstado.js"]();
/******/ 	
/******/ })()
;