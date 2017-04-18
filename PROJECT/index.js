	// create the module
	var sampleApp = angular.module('sampleApp', ['ngRoute']);

	// configure routes
	sampleApp.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'homeController'
			})
	});

    //create controller
	sampleApp.controller('homeController', function($scope,$http) {
         $http.get("https://api.myjson.com/bins/f4tu3")
            .then(function(response) {
                for(var i=0; i<(response.data).length; i++){
                    response.data[i].visible = false;
                }
                $scope.datas = response.data;                         
            }); 
	});
    
    //create image-card directive
    sampleApp.directive('imageCard', function() {
                 return {
                    restrict: 'E',
                    scope: {
                        image: '=',
                        modal:'='
                    },
                   link: function(scope,element,attr,ctrl) {
                 
                        scope.toogleBtnClick=function(e,data){
                           if(e.target !== e.currentTarget)
                           return;
                           if(!data.visible)
                                data.visible = true;
                            else data.visible = false;
                        }
                       
                        scope.deleteCard = function(data){
                                for(var i=0; i<scope.modal.length; i++){
                                if(data.timestamp == scope.modal[i].timestamp)
                                scope.modal.splice(i,1);
                            }
                        }
                        
                        scope.getDate = function(){
                            var d = new Date();                              
                            month = '' + (d.getMonth() + 1),
                            day = '' + d.getDate(),
                            year = d.getFullYear();

                            if (month.length < 2) month = '0' + month;
                            if (day.length < 2) day = '0' + day;
                            var newDate = year +'-' +month+'-'+day +' '+d.toTimeString().split(' ')[0];
                            return newDate;
                        }
                        
                        scope.pinCard = function(data){
                            data.timestamp = scope.getDate();
                        }
                                        
                        
                    },
                    template: '<div class="imgCard" ng-click="toogleBtnClick($event,image)">'+
                               '{{image.type}} <span ng-show = !image.visible class="headerStyle"><i style="margin:5px" ng-click="deleteCard(image)" class="fa fa-trash-o"></i><i style="margin:5px" ng-click="pinCard(image)" class="fa fa-bell"></i></span>'+
                              '</div>'+
                    '<div class="cardDetail" ng-show=image.visible>'+                   
                        '<div>{{ image.name }}</div>'+
                        '<img ng-src="{{ image.href }}" alt="{{ image.name }}"/>'+
                        '<span class="detailCardBtnStyle" ng-show=image.visible>'+
                            '<button style="margin:5px" ng-click="deleteCard(image)">delete</button>'+
                            '<button style="margin:5px" ng-click="pinCard(image)">pin</button>'+
                        '</span>'+
                    '</div>'
                }
            });
            
            //create link-card directive
            sampleApp.directive('linkCard', function() {
                return {
                    restrict: 'E',
                    scope: {
                        link: '=',
                        modal:'='
                    },
                   link: function(scope,elem,attr,ctrl) {
                        scope.toogleBtnClick=function(e,data){
                         if(e.target !== e.currentTarget)
                           return;
                           if(!data.visible)
                                data.visible = true;
                            else data.visible = false;
                        }
                        scope.deleteCard = function(data){
                                for(var i=0; i<scope.modal.length; i++){
                                if(data.timestamp == scope.modal[i].timestamp)
                                scope.modal.splice(i,1);
                            }
                        }
                        
                         scope.getDate = function(){
                            var d = new Date();                              
                            month = '' + (d.getMonth() + 1),
                            day = '' + d.getDate(),
                            year = d.getFullYear();

                            if (month.length < 2) month = '0' + month;
                            if (day.length < 2) day = '0' + day;
                            var newDate = year +'-' +month+'-'+day +' '+d.toTimeString().split(' ')[0];
                            return newDate;
                        }
                        
                        scope.pinCard = function(data){
                            data.timestamp = scope.getDate();
                        }
                    },
                    template: '<div class="linkCard" ng-click="toogleBtnClick($event,link)">'+
                               '{{link.type}} <span ng-show=!link.visible class="headerStyle"><i style="margin:5px" ng-click="deleteCard(link)" class="fa fa-trash-o"></i><i style="margin:5px" ng-click="pinCard(link)" class="fa fa-bell"></i></span>'+
                              '</div>'+
                    '<div class="cardDetail" ng-show=link.visible>'+
                        '<div>{{ link.description }}</div>'+
                            '<a ng-href="{{ link.href }}">{{ link.title }}</a>'+
                                '<span class="detailCardBtnStyle" ng-show=link.visible>'+
                                   '<button style="margin:5px" ng-click="deleteCard(link)">delete</button>'+
                                    '<button style="margin:5px" ng-click="pinCard(link)">pin</button>'+
                                 '</span>'+
                    '</div>'
                }
            });
            
            //create text-card directive
            sampleApp.directive('textCard', function() {
                return {
                    restrict: 'E',
                    require:'',
                    scope: {
                        text: '=',
                        modal:'='
                    },
                    link: function(scope,elem,attr,ctrl) {
                        scope.toogleBtnClick=function(e,data){
                         if(e.target !== e.currentTarget)
                           return;
                           if(!data.visible)
                                data.visible = true;
                            else data.visible = false;
                        }
                        scope.deleteCard = function(data){
                                for(var i=0; i<scope.modal.length; i++){
                                if(data.timestamp == scope.modal[i].timestamp)
                                scope.modal.splice(i,1);
                            }
                        }
                         scope.getDate = function(){
                            var d = new Date();                              
                            month = '' + (d.getMonth() + 1),
                            day = '' + d.getDate(),
                            year = d.getFullYear();

                            if (month.length < 2) month = '0' + month;
                            if (day.length < 2) day = '0' + day;
                            var newDate = year +'-' +month+'-'+day +' '+d.toTimeString().split(' ')[0];
                            return newDate;
                        }
                        
                        scope.pinCard = function(data){
                            data.timestamp = scope.getDate();
                        }
                    },
                    template: '<div class="textCard" ng-click="toogleBtnClick($event,text)">'+
                               '{{text.type}} <span ng-show=!text.visible class="headerStyle" style="float:right"><i style="margin:5px" ng-click="deleteCard(text)" class="fa fa-trash-o"></i><i style="margin:5px" ng-click="pinCard(text)" class="fa fa-bell"></i></span>'+
                              '</div>'+
                                '<div class="cardDetail" ng-show=text.visible>{{ text.body }}'+
                                    '<span ng-show=text.visible class="detailCardBtnStyle">'+
                                        '<button style="margin:5px" ng-click="deleteCard(text)">delete</button>'+
                                        '<button style="margin:5px" ng-click="pinCard(text)">pin</button>'+
                                    '</span>'+
                                '</div>',
                    }
            });