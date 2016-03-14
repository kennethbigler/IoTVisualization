/*global app*/
app.directive('ngXa', function () {
    "use strict";
    return function (scope, element, attrs) {
        attrs.$observe('ngXa', function (value) {
            attrs.$set('x1', value);
        });
    };
}).directive('ngXb', function () {
    "use strict";
    return function (scope, element, attrs) {
        attrs.$observe('ngXb', function (value) {
            attrs.$set('x2', value);
        });
    };
}).directive('ngYa', function () {
    "use strict";
    return function (scope, element, attrs) {
        attrs.$observe('ngYa', function (value) {
            attrs.$set('y1', value);
        });
    };
}).directive('ngYb', function () {
    "use strict";
    return function (scope, element, attrs) {
        attrs.$observe('ngYb', function (value) {
            attrs.$set('y2', value);
        });
    };
});