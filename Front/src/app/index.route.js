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
        }).state('blog.articles', {
            url:   'articles',
            views: {
                'content@': {
                    templateUrl:  'app/components/articles/list/list-articles.html',
                    controller:   'blogListArticlesController',
                    controllerAs: 'articlesListCtrl'
                }
            }
        }).state('blog.articles.edit', {
            url:   '/edit',
            views: {
                'content@': {
                    templateUrl:  'app/components/articles/edit/edit-article.html',
                    controller:   'blogEditArticleController',
                    controllerAs: 'articleEditCtrl'
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    }

})();
