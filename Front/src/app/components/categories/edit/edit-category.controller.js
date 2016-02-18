(function () {
    'use strict';

    angular
        .module('blog')
        .controller('blogEditCategoryController', EditCategoryController);

    /** @ngInject */
    function EditCategoryController($scope, toastr, blogCategoriesService) {
        $scope.categoriesService = blogCategoriesService;

        $scope.newCategory = function (category) {
            if (category !== undefined) {
                blogCategoriesService.new(category);
            } else {
                toastr.warning('Please, fullfill at least the Title input');
            }
        };

        $scope.editCategory = function (category) {
        };

        $scope.resetForm = function () {
            $scope.categoriesService.category = angular.copy({});
        };

    }
})();