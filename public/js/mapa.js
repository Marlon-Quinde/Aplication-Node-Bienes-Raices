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

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ (() => {

eval("(function () {\r\n    const lat = -2.0318417;\r\n    const lng = -79.9146073;\r\n    const mapa = L.map(\"mapa\").setView([lat, lng], 13);\r\n  \r\n    let marker;\r\n  \r\n    //Utilizar provider y geocode\r\n  \r\n    const geoService = L.esri.Geocoding.geocodeService();\r\n  \r\n    L.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\r\n      attribution:\r\n        '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\r\n    }).addTo(mapa);\r\n  \r\n    //EL PIN\r\n    marker = new L.marker([lat, lng], {\r\n      draggable: true,\r\n      autoPan: true,\r\n    }).addTo(mapa);\r\n  \r\n    //Detectar el movimento del ping\r\n  \r\n    marker.on(\"moveend\", function (event) {\r\n      marker = event.target;\r\n  \r\n      const posicion = marker.getLatLng();\r\n  \r\n      mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));\r\n  \r\n      //Obtener la infomacion de las calles\r\n      geoService\r\n        .reverse()\r\n        .latlng(posicion, 13)\r\n        .run(function (error, resultado) {\r\n          //console.log(resultado);\r\n  \r\n          marker.bindPopup(resultado.address.LongLabel);\r\n\r\n          //Llenar los campos\r\n          document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';\r\n          document.querySelector('#calle').value = resultado?.address?.Address ?? '';\r\n          document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';\r\n          document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';\r\n        });\r\n    });\r\n  })();\r\n  \n\n//# sourceURL=webpack://bienes-raices-mvc/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"]();
/******/ 	
/******/ })()
;