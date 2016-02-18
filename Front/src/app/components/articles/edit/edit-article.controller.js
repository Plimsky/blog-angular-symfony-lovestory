(function () {
    'use strict';

    angular
        .module('blog')
        .controller('blogEditArticleController', EditArticleController);

    /** @ngInject */
    function EditArticleController($scope, toastr, blogArticlesService, blogCategoriesService) {
        $scope.articlesService   = blogArticlesService;
        $scope.categoriesService = blogCategoriesService;

        $scope.newCategory = function (article) {
            if (article !== undefined) {
                blogArticlesService.new(article);
            } else {
                toastr.warning('Please, fullfill at least the Title input');
            }
        };

        $scope.editArticle = function (article) {
        };

        $scope.resetForm = function () {
            $scope.articlesService.article = angular.copy({});
        };

        $scope.categoriesService.list();
    }
})();