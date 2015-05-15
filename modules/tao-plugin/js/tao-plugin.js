					angular.module('anApp', [])
                        .factory('aFactory', function($q, $timeout) {
                            return function() {
                                var d = $q.defer();
                                $timeout(function() {
                                    d.resolve('one');
                                }, 1);
                                
                                return d.promise;
                            };
                        })
                        .controller('aCtrl', function($scope, aFactory) {
                            $scope.plugin = 'one';
                            aFactory().then(function(plugin) {
                               $scope.plugin = plugin; 
                            });
                        })
                        .directive('one', function() {

                            return {
                                restrict: 'E',
                                template: '<span>I am one</span>'   
                            };
                            
                        })
                        .directive('taoPlugin', ['$compile', function($compile) {
                            return {
                                restrict: 'E',
                                scope: { 'plugin': '@' },
                                link: function(scope, element) {
                                    var template = '<' + scope.plugin + ' />',
                                        compiled = $compile(template)(scope);
                                   
                                    element.append(compiled);            
                                }  
                            }; 
                        }]);