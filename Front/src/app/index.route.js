(function () {
    'use strict';

    angular
        .module('blog')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('blog', {
                url:   '/',
                views: {
                    'header':  {
                        templateUrl:  'app/components/header/header.html',
                        controller:   'HeaderController',
                        controllerAs: 'headCtrl'
                    },
                    'content': {
                        templateUrl:  'app/main/main.html',
                        controller:   'MainController',
                        controllerAs: 'main'
                    }
                }
            }).state('blog.categories', {
            url:   'categories',
            views: {
                'content@': {
                    templateUrl:  'app/components/categories/list/list-categories.html',
                    controller:   'blogListCategoriesController',
                    controllerAs: 'categoriesListCtrl'
                }
            }
        }).state('blog.categories.edit', {
            url:   '/edit',
            views: {
                'content@': {
                    templateUrl:  'app/components/categories/edit/edit-category.html',
                    controller:   'blogEditCategoryController',
                    controllerAs: 'categoryEditCtrl'
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    }

})();
