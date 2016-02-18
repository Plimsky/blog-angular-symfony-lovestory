(function () {
    'use strict';

    angular
        .module('blog')
        .factory('blogArticlesModel', ArticlesModel);

    /** @ngInject */
    function ArticlesModel($resource) {
        return {
            list:   $resource('/api/articles', {}, {
                query: {method: 'GET', params: {}, isArray: true}
            }),
            show:   $resource('/api/articles/:id', {}, {
                query: {method: 'GET', params: {id: '@id'}, isArray: false}
            }),
            new:    $resource('/api/articles', {}, {
                query: {method: 'POST', params: {}, isArray: false}
            }),
            edit:   $resource('/api/articles', {}, {
                query: {method: 'PATCH', params: {}, isArray: false}
            }),
            delete: $resource('/api/articles/:id', {}, {
                query: {method: 'DELETE', params: {id: '@id'}, isArray: false}
            })
        };
    }
})();
