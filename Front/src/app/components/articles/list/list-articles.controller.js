(function () {
    'use strict';

    angular
        .module('blog')
        .controller('blogListArticlesController', ListArticlesController);

    /** @ngInject */
    function ListArticlesController($scope, blogArticlesService) {
        $scope.articlesService = blogArticlesService;

        $scope.listArticles = function () {
            blogArticlesService.list();
        };

        $scope.deleteArticle = function (id) {
            blogArticlesService.delete(id);
        };

        $scope.listArticles();
    }
})();