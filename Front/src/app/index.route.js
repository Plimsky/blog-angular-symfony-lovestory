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
            });

        $urlRouterProvider.otherwise('/');
    }

})();
