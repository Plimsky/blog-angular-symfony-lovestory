(function () {
    'use strict';

    angular
        .module('blog')
        .factory('blogCategoriesModel', CategoriesModel);

    /** @ngInject */
    function CategoriesModel($resource) {
        return {
            list:   $resource('/api/categories', {}, {
                query: {method: 'GET', params: {}, isArray: true}
            }),
            show:   $resource('/api/categories/:id', {}, {
                query: {method: 'GET', params: {id: '@id'}, isArray: false}
            }),
            new:    $resource('/api/categories', {}, {
                query: {method: 'POST', params: {}, isArray: false}
            }),
            edit:   $resource('/api/categories', {}, {
                query: {method: 'PATCH', params: {}, isArray: false}
            }),
            delete: $resource('/api/categories/:id', {}, {
                query: {method: 'DELETE', params: {id: '@id'}, isArray: false}
            })
        };
    }
})();
