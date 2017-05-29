'use strict';
var app = angular.module('oneTableApp', []);
(function(app) {
  app.controller('oneTableCtrl', oneTableCtrl);
  oneTableCtrl.$inject = ['$scope', '$timeout', 'excelExportService'];

  function oneTableCtrl($scope, $timeout, excelExportService) {
    //variable declaration
    var globalIndex = 0;
    $scope.headerSource = $scope.oneTableProperties.headerSource;
    $scope.dataSource = $scope.oneTableProperties.dataSource;

    $scope.getCommaSeparatedValue = function(data) {
      if (!isNaN(data) && data != null && data != '' && $scope.oneTableProperties.commaSeparated)
        return parseFloat(data).toLocaleString();
      else if (isNaN(data) || data != null)
        return data;
      else if (data == null)
        return '';
      else
        return 0;
    }
    if ($scope.oneTableProperties.grandTotal)
      getSumOfData();
    $scope.pushNewSubTotalObject = function(index) {
      var currentObj = {};
      var nextObj = {};
      var totalObj = {};
      currentObj = $scope.tempData[index];
      nextObj = $scope.tempData[index + 1];

      if (nextObj == undefined || (currentObj[$scope.oneTableSubTotalColumn] != nextObj[$scope.oneTableSubTotalColumn])) {

        totalObj = Object.create(currentObj);

        for (var k in totalObj) {
          if (!isNaN(totalObj[k]) && totalObj[k] != null)
            totalObj[k] = 0;
          else if (isNaN(totalObj[k]) && totalObj[k] != null)
            totalObj[k] = '';
        }

        $.each($scope.tempData, function(key, val) {
          if (val[$scope.headerSource[0]] == currentObj[$scope.oneTableSubTotalColumn]) {
            for (var k in val) {
              if (!isNaN(val[k]) && val[k] != null) {
                totalObj[k] += parseFloat(val[k]);
              } else if (k == $scope.oneTableSubTotalColumn && isNaN(val[k])) {
                totalObj[k] = 'Sub-Total';
              } else if (isNaN(val[k]) && val[k] != null) {
                totalObj[k] = null;
              }
            }
          }
        })

        index = globalIndex + index;
        totalObj['background'] = '#ffc56f';
        totalObj['fontweight'] = 'bold';
        $scope.dataSource.splice(index + 1, 0, totalObj);
        globalIndex++;
      }
    }

    function getSumOfData() {
      var total = 0;
      $scope.oneTableTotal = [];

      for (var i = 0; i < $scope.headerSource.length; i++) {
        total = 0;
        $.each($scope.dataSource, function(k, v) {
          if (!isNaN(v[$scope.headerSource[i]]) && v[$scope.headerSource[i]] != null) {
            total += parseFloat(v[$scope.headerSource[i]]);
          } else if (i == 0 && isNaN(v[$scope.headerSource[i]])) {
            $scope.oneTableTotal.push('Grand-Total');
            return false;
          }
        })

        if (total > 0 && i > 0) {
          if ($scope.oneTableProperties.commaSeparated)
            $scope.oneTableTotal.push(total.toLocaleString());
          else
            $scope.oneTableTotal.push(total);
        } else if (i > 0) {
          $scope.oneTableTotal.push('');
        }
      }
    }
    //Excel Export
    $scope.exportToExcel = function() {
      var exportHref = excelExportService.tableToExcel('#' + $scope.oneTableProperties.name, 'Exported Data');
      $timeout(function() {
        location.href = exportHref;
      }, 100);
    }
  }

  app.directive('oneTable', oneTable);

  function oneTable() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        oneTableProperties: "="
      },
      link: function(scope, elem, attrs) {},
      controller: 'oneTableCtrl',
      controllerAs: 'ctrl',
      template: '<div>' +
        '<button class="btn btn-link pull-right" ng-click="exportToExcel();" ng-if="oneTableProperties.exportToExcel == true">Export to Excel</button>' +
        '<br/>' +
        '<table ng-class="oneTableProperties.cssClass" id="{{oneTableProperties.name}}" style="font-size:13px;">' +
        '<thead>' +
        '<tr style="background-color: #605ca8; color: white; ">' +
        '<th ng-repeat="header in oneTableProperties.headerSource">' +
        '{{header}}' +
        '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr ng-repeat="data in oneTableProperties.dataSource" style="background-color:{{data[' + "'" + 'background' + "'" + ']}}; font-weight:{{data[' + "'" + 'fontweight' + "'" + ']}};">' +
        '<td ng-repeat="header in oneTableProperties.headerSource">' +
        '{{getCommaSeparatedValue(data[header])}}' +
        '</td>' +
        '</tr>' +
        '<tr style="background-color:#605ca8; font-weight: bold; color: white;" ng-if="oneTableProperties.grandTotal == true">' +
        '<td ng-repeat="total in oneTableTotal track by $index">' +
        '<b>{{total}}</b>' +
        '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>'
    }
  }

  app.factory('excelExportService', excelExportService);
  excelExportService.$inject = ['$window'];

  function excelExportService($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function(s) {
        return $window.btoa(unescape(encodeURIComponent(s)));
      },
      format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
          return c[p];
        })
      };
    return {
      tableToExcel: function(tableId, worksheetName) {
        var table = $(tableId),
          ctx = {
            worksheet: worksheetName,
            table: table.html()
          },
          href = uri + base64(format(template, ctx));
        return href;
      }
    };
  }
})(angular.module('oneTableApp'));
