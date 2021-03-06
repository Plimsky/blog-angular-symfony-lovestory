(function () {
    'use strict';

    angular
        .module('blog')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, webDevTec, toastr) {
        var vm = this;

        vm.awesomeThings  = [];
        vm.classAnimation = '';
        vm.showToastr     = showToastr;

        activate();

        function activate() {
            getWebDevTec();
            $timeout(function () {
                vm.classAnimation = 'rubberBand';
            }, 4000);
        }

        function showToastr() {
            toastr.info('Fork <a href="https://github.com/Plimsky/blog-angular-symfony-lovestory" target="_blank"><b>blog-angular-symfony-lovestory</b></a>');
            vm.classAnimation = '';
        }

        function getWebDevTec() {
            vm.awesomeThings = webDevTec.getTec();

            angular.forEach(vm.awesomeThings, function (awesomeThing) {
                awesomeThing.rank = Math.random();
            });
        }
    }
})();
