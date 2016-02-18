(function () {
    'use strict';

    angular
        .module('blog')
        .service('blogArticlesService', ArticlesService);

    /** @ngInject */
    function ArticlesService($log, toastr, blogArticlesModel) {
        var self      = this;
        this.articles = [];
        this.article  = {};
        this.editMode = false;

        this.list = function () {
            blogArticlesModel.list.query({}).$promise.then(function (data) {
                self.articles = data;
            });
        };

        this.new = function (article) {
            blogArticlesModel.new.query(article).$promise.then(function () {
                toastr.success('Article created with success');
            }, function (err) {
                $log.error(err);
                toastr.error('Something wrong happend');
            });
        };

        this.delete = function (id) {
            blogArticlesModel.delete.query({id: id}).$promise.then(function () {
                toastr.success('Article deleted with success');
                self.list();
            }, function (err) {
                $log.error(err);
                toastr.error('Something wrong happend');
            });
        };
    }
})();