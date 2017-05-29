# one-table

A full featured table plugin for angular application.

## Features

If you search over the internet for table plugin/library for your angular application you'll not find any library that has some basic features altogether, most of them has one or two to full-fill your requirement. So one-table is here to full-fill your requirement by these features:

1. Single object expression for all the customization
2. No need of manual table header
3. Configurable Grand-Total Row
4. Configurable comma separated numeric row
4. Customizable CSS class
5. Export to excel
6. Twitter Bootstrap compatible
7. ...coming soon

## Getting Started

Add a reference of one-table.js in your application:

```
<script type="text/javascript" src="one-table.js"></script>
```
and then inject the dependency in your application module:

```
var myApp = angular.module('myApp', ['oneTableApp']);
```
now you're almost ready to use one-table in your application. In your view use one-table directive like below:

```
<one-table one-table-properties="{ name: 'empTable', headerSource: empheaderSource, dataSource: empDataSource, cssClass: 'table table-bordered' }"></one-table>
```
### Prerequisites

one-table requires angularjs v-1.3.17 or later and jQuery v-3.1.0 or later.

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Built With

* [AngularJS](https://angularjs.org/) - The JS framework used

## Authors

* **Khairul Islam** - *one-table* - [Khairul Islam](https://github.com/iamsjn)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* To export into excel i used this gist https://gist.github.com/umidjons/352da2a4209691d425d4
