(function () {
    'use strict';

    angular
        .module('blog')
        .service('blogCategoriesService', CategoriesService);

    /** @ngInject */
    function CategoriesService(toastr, blogCategoriesModel) {
        var self        = this;
        this.categories = [];
        this.category   = {};
        this.editMode   = false;

        this.list = function () {
            blogCategoriesModel.list.query({}).$promise.then(function (data) {
                self.categories = data;
            });
        };

        this.new = function (category) {
            blogCategoriesModel.new.query(category).$promise.then(function (data) {
                self.category = data;
                toastr.success('Category created with success');
            }, function (err) {
                toastr.error('Something wrong happend : ' + err.message);
            });
        };
    }
})();