/*global $, console, app, $scope, AWS*/

app.controller('VisualizeController', ['$scope', function ($scope) {
    "use strict";

    // declare variables
    var i, ddb, results,
        params = {
            TableName: "ken_jp_db"
        };
    
    // graph vars
    $scope.data = [];
    $scope.width = 600;
    $scope.height = 350;
    $scope.yAxis = 'C02';
    $scope.xAxis = 'Time';
    $scope.max = 0;
    
    // public and private key
    AWS.config.update({accessKeyId: 'AKIAJ7MSYO556WIESBYA', secretAccessKey: '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'});
    // Configure the region
    AWS.config.region = 'us-west-2';  //us-west-2 is Oregon
    //create the ddb object
    ddb = new AWS.DynamoDB();
    
    // call api to read from db
    function scan() {
        results = [];
        // call api to read from db
        ddb.scan(params, function (err, data) {
            if (err) {
                console.log(JSON.stringify(err, null, 2));
                return console.log(err);
            }
            
            // get desired data and move it to the $scope
            //console.log(data);
            for (i = 560; i < data.Items.length; i += 1) {
                if (data.Items[i].results.M.state.M.reported.M["MHZ16-CO2"] !== undefined) {
                    results.push(parseInt(data.Items[i].results.M.state.M.reported.M["MHZ16-CO2"].N, 10));
                }
            }
            //console.log(results);
            
            // find max to normalize results
            for (i = 0; i < results.length; i += 1) {
                if (results[i] > $scope.max) {
                    $scope.max = results[i];
                }
            }
            $scope.data = results;
        });
    }
    
    // call scan function to keep getting current data
    scan();
    setInterval(function () {
		$scope.$apply(function () { scan(); });
	}, 3000);
}]);