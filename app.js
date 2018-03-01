var app = angular.module('bot',[]);

app.controller('testController',['$scope','$http', function($scope, $http){
	$scope.question = '';
	$scope.conversationList = [];
	$scope.timeStamps = [];


	function setQuestionObject(conversationObject, question){
		conversationObject.options = [];
		conversationObject.question = question;
		var date = new Date();
		conversationObject.timeStamp = date.toLocaleString();
	}

	function getResponse(conversation){
		var data = {
			"contexts": [
			  ""
			],
			"lang": "en",
			"query": " ",
			"sessionId": "12345"
		  };
		data.query = conversation.question;
		JSON.stringify(data);
		$http.post('https://api.dialogflow.com/v1/query?v=20180228', data, {
			headers : {'Authorization' : 'Bearer c4cc3fdb3bdb416cab5aef2737c6f9b1',
						'Content-Type' : 'application/json'}
					}
				).then(function(success){
					conversation.answer = success.data.result.fulfillment.messages[1].payload.result.speech;
					conversation.options = success.data.result.fulfillment.messages[1].payload.result.options;
				}, function(error){
					alert(error);
				}).then(function(){
					$scope.conversationList.push(conversation);
				})
	}

	$scope.submit = function(){
		var conversation = {};
		setQuestionObject(conversation, $scope.question);
		conversation.id = $scope.conversationList.length;
		var question = $scope.question;
		$scope.question = '';
		getResponse(conversation);
	}

	$scope.selectedFromOption = function(optionSelected){
		var conversation = {};
		setQuestionObject(conversation, optionSelected);
		optionSelected = undefined;
		getResponse(conversation);
		}
	}


])
