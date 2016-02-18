(function () {
    'use strict';

    angular
        .module('blog')
        .service('blogCategoriesService', CategoriesService);

    /** @ngInject */
    function CategoriesService(blogCategoriesModel) {
        var self = this;
        this.categories = [];
        this.category   = {};

        this.list = function () {
            blogCategoriesModel.list.query({}).$promise.then(function (data) {
                self.categories = data;
            });
        }
    }
})();