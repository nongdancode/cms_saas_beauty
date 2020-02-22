(function(){
    angular.module('directive.draggable', [])
        .directive('draggable', function($interpolate) {
            return {
                restrict: 'A',
                link: function(scope, element, attr){
                    const item = JSON.parse(attr.item || '{}');

                    const params = {
                        id: +item.id,
                        type: item.type,
                        title: item.name,
                        color: item.color
                    };

                    $(element).data('event-object', params);

                    $(element).draggable({
                        zIndex: 999,
                        revert: true,
                        revertDuration: 0
                    });
                }
            };
        });
})();
