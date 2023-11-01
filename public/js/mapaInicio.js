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

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ (() => {

eval("(function name() {\r\n  const lat = 28.5640969;\r\n  const lng = -81.2038475;\r\n  const mapa = L.map(\"mapa-inicio\").setView([lat, lng], 13);\r\n\r\n  let markers = new L.FeatureGroup().addTo(mapa);\r\n\r\n  let propiedades = []\r\n  //Filtros\r\n  const filtros = {\r\n    categoria: '',\r\n    precio: ''\r\n  }\r\n\r\n  const categoriaSelect = document.querySelector('#categorias')\r\n  const precioSelect = document.querySelector('#precios')\r\n\r\n\r\n\r\n  L.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\r\n    attribution:\r\n      '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\r\n  }).addTo(mapa);\r\n\r\n  // Filtro de Categorias\r\n  categoriaSelect.addEventListener('change', e => {\r\n    filtros.categoria =  +e.target.value\r\n    filtrarPropiedades();\r\n  })\r\n\r\n\r\n  precioSelect.addEventListener('change', e => {\r\n    filtros.precio =  +e.target.value\r\n    filtrarPropiedades();\r\n  })\r\n\r\n  const obtenerPropiedades = async () => {\r\n    try {\r\n      const url = \"/api/propiedades\";\r\n      const respuesta = await fetch(url);\r\n      propiedades = await respuesta.json();\r\n      mostrarPropiedades(propiedades);\r\n      // console.log(propiedades);\r\n    } catch (error) {\r\n      console.log(error);\r\n    }\r\n  };\r\n\r\n  const mostrarPropiedades = (propiedades) => {\r\n    // Limpiar los markers previos\r\n\r\n    markers.clearLayers();\r\n\r\n    propiedades.forEach((propiedad) => {\r\n      // Agregar los pines\r\n\r\n\r\n      const marker = new L.marker([propiedad?.lat, propiedad?.lng], {\r\n        autoPan: true,\r\n      })\r\n        .addTo(mapa)\r\n        .bindPopup(\r\n          `\r\n          <p class=\"text-indigo-600 font-bold\">${propiedad.categoria.nombre}</p>\r\n          <h1 class=\"text-xl font-extrabold uppercase my-2\">${propiedad?.titulo}</h1>\r\n          <img src=\"/uploads/${propiedad.imagen}\" alt=\"Imagen de la propidad ${propiedad.titulo}\" />\r\n          <p class=\"text-gray-600 font-bold\">${propiedad.precio.nombre}</p>\r\n          <a href=\"/propiedad/${propiedad.id}\" class=\"bg-indigo-600 block p-2 text-center font-bold uppercase\">Ver propiedad</a>\r\n          `\r\n        );\r\n\r\n      markers.addLayer(marker);\r\n    });\r\n  };\r\n\r\n  const filtrarPropiedades = () => {\r\n    const resultado = propiedades.filter(filtarCategoria).filter(filtarPrecio);\r\n    mostrarPropiedades(resultado);\r\n  }\r\n\r\n  const filtarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad\r\n  const filtarPrecio = propiedad => filtros.precio ? propiedad.precioId === filtros.precio : propiedad\r\n\r\n\r\n  obtenerPropiedades();\r\n})();\r\n\n\n//# sourceURL=webpack://bienes-raices-mvc/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"]();
/******/ 	
/******/ })()
;