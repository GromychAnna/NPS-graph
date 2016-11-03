const angular = require('angular');
require('../node_modules/jquery/dist/jquery.min');
const ngModule = angular.module('app',[]); // берём с html ангуляровский модуль и присваиваем переменной, чтоб можно было его передавать и с ним работать дальше

require('./directives')(ngModule); //говорим, что всё, что лежит в папке directives - подключим сюда
require('./factories')(ngModule);
