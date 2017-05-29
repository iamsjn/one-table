'use strict';

var client = angular.module('clientApp', ['oneTableApp']);

client.controller('userCtrl', userCtrl);

userCtrl.$inject = ['$scope', '$timeout'];

function userCtrl($scope, $timeout) {

  (function LoadData() {
    $scope.dataSource = [];
    var salesResult = [{
        "Brand": "Carrier",
        "Category": "Blender",
        "Sales": 19875,
        "TotalSales(TK)": 48493874
      },
      {
        "Brand": "Carrier",
        "Category": "Washing Machine",
        "Sales": 16574,
        "TotalSales(TK)": 57365342
      },
      {
        "Brand": "Carrier",
        "Category": "Led TV",
        "Sales": 12574,
        "TotalSales(TK)": 653527
      },
      {
        "Brand": "SamSung",
        "Category": "Blender",
        "Sales": 85732,
        "TotalSales(TK)": 854343
      },
      {
        "Brand": "SamSung",
        "Category": "Washing Machine",
        "Sales": 34576,
        "TotalSales(TK)": 987362
      },
      {
        "Brand": "SamSung",
        "Category": "Led TV",
        "Sales": 90873,
        "TotalSales(TK)": 653547
      }
    ];
    var empResult = [{
        "Name": "Ashek",
        "Team": "HR & Payroll",
        "Designation": "Sr. Programmer Analyst"
      },
      {
        "Name": "Chapal",
        "Team": "HR & Payroll",
        "Designation": "Sr. Programmer Analyst"
      },
      {
        "Name": "Hassan",
        "Team": "HR & Payroll",
        "Designation": "Sr. Programmer Analyst"
      },
      {
        "Name": "Masum",
        "Team": "Sales & PPIC",
        "Designation": "Sr. Programmer Analyst"
      },
      {
        "Name": "Maruf",
        "Team": "STS",
        "Designation": "Programmer Analyst"
      },
      {
        "Name": "Jakir",
        "Team": "HMS & DMS",
        "Designation": "Programmer Analyst"
      }
    ];

    $scope.salesDataSource = JSON.parse(JSON.stringify(salesResult));
    getDataHeader($scope.salesDataSource);
    $scope.salesheaderSource = $scope.headerSource;

    $scope.empDataSource = JSON.parse(JSON.stringify(empResult));
    getDataHeader($scope.empDataSource);
    $scope.empheaderSource = $scope.headerSource;
  })();

  function getDataHeader(data) {
    var test = [];
    $scope.headerSource = [];
    $.each(data, function(k, v) {
      test = (k, v);
    })
    for (var header in test)
      $scope.headerSource.push(header);
  }
}
