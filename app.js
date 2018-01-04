var app = angular.module('bot',[]);

app.controller('testController',['$scope','$http', function($scope, $http){
	$scope.question = '';
	$scope.conversationList = [];

	$scope.submit = function(){
		var conversation = {};
		conversation.question = $scope.question;
		var question = $scope.question;
		$scope.question = '';
		var data = {
				    "contexts": [
				      ""
				    ],
				    "lang": "en",
				    "query": " ",
				    "sessionId": "12345",
				    "timezone": "America/New_York"
				  };
		data.query = question;
		JSON.stringify(data);
		$http.post('https://api.dialogflow.com/v1/query', data, {
			headers : {'Authorization' : 'Bearer 76b505a7cbcc43678fc08e5a5dbe2ce8',
						'Content-Type' : 'application/json'}
					}
						).then(function(success){
							conversation.answer = success.data.result.speech;
						}, function(error){
							alert(error);
						}).then(function(){
							$scope.conversationList.push(conversation);
						})
	}	


}])