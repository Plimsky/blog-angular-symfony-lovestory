(function () {
    'use strict';

    angular
        .module('blog')
        .controller('blogListCategoriesController', ListCategoriesController);

    /** @ngInject */
    function ListCategoriesController($scope, blogCategoriesService) {
        $scope.categoriesService = blogCategoriesService;

        $scope.listCategories = function () {
            blogCategoriesService.list();
        };

        $scope.deleteCategory = function (id) {
            blogCategoriesService.delete(id);
        };

        $scope.listCategories();
    }
})();