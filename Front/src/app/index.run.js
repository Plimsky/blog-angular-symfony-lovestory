(function () {
    'use strict';

    angular
        .module('blog')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();
