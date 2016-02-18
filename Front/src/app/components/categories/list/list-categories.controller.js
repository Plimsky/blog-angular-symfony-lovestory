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

        $scope.listCategories();
    }
})();