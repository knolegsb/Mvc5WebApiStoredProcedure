// <reference path="../angular.js" />  
/// <reference path="../angular.min.js" />   
/// <reference path="../angular-animate.js" />   
/// <reference path="../angular-animate.min.js" />   

var app;
(function () {
    app = angular.module("ngEmployeeModule", ['ngAnimate']);
})();

app.controller("ngEmployeeInfoCtrl", function ($scope, $timeout, $rootScope, $window, $http) {
    $scope.date = new Date();
    $scope.empNameSearch = "";
    $scope.empCountrySearch = "";
    $scope.ManagerNameSearch = "";

    $scope.manageEmployee = false;
    $scope.listEmployee = true;
    $scope.searchEmployee = true;


    $scope.empId = 0;
    $scope.empName = "";
    $scope.empEmail = "";
    $scope.empCountry = "";
    $scope.empManager = "";

    getEmployeeList($scope.empNameSearch, $scope.empCountrySearch, $scope.ManagerNameSearch);

    function getEmployeeList(Name, Country, ManagerName) {
        $http.get('/api/Employees/', { params: { empName: Name, country: Country, managerName: ManagerName } }).success(function (data) {
            $scope.Employees = data;
            $scope.manageEmployee = false;
            $scope.listEmployee = true;
            $scope.searchEmployee = true;
            if ($scope.Employees.length > 0) {
            }
        })
   .error(function () {
       $scope.error = "Some Error.";
   });
    }

    //Search
    $scope.searchEmp = function () {

        getEmployeeList($scope.empNameSearch, $scope.empCountrySearch, $scope.ManagerNameSearch);
    }

    //Edit Employee Details
    $scope.editEmployee = function editEmployee(Id, Name, Email, Country, ManagerName) {
        clearDetails();
        $scope.empId = Id;
        $scope.empName = Name
        $scope.empEmail = Email;
        $scope.empCountry = Country;
        $scope.empManager = ManagerName;

        $scope.manageEmployee = true;
        $scope.listEmployee = true;
        $scope.searchEmployee = true;
    }

    //Delete Dtudent Detail
    $scope.DeleteEmployee = function DeleteEmployee(Id, Name) {
        clearDetails();
        $scope.empId = Id;
        var delConfirm = confirm("Are you sure you want to delete the Employee " + Name + " ?");
        if (delConfirm == true) {

            $http.get('/api/Employees/deleteEmployee/', { params: { empId: $scope.empId } }).success(function (data) {
                alert("Employee Deleted Successfully!!");
                clearDetails();
                $scope.empNameSearch = "";
                $scope.empCountrySearch = "";
                $scope.ManagerNameSearch = "";
                getEmployeeList($scope.empNameSearch, $scope.empCountrySearch, $scope.ManagerNameSearch);
            })
      .error(function () {
          $scope.error = "Some Error.";
      });

        }
    }

    $scope.AddEmployeeForm = function () {
        clearDetails();
        $scope.manageEmployee = true;
        $scope.listEmployee = true;
        $scope.searchEmployee = true;
    }

    function clearDetails() {
        $scope.empId = 0;
        $scope.empName = "";
        $scope.empEmail = "";
        $scope.empCountry = "";
        $scope.empManager = "";
    }

    //Form Validation
    $scope.Message = "";
    $scope.IsFormSubmitted = false;
    $scope.IsFormValid = false;
    $scope.$watch("f1.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    });

    //Save-Edit Employee
    $scope.saveDetails = function () {

        $scope.IsFormSubmitted = true;
        if ($scope.IsFormValid) {
            if ($scope.empId == 0) {
                $http.get('/api/Employees/addNewEmployee/', { params: { name: $scope.empName, email: $scope.empEmail, country: $scope.empCountry, managerName: $scope.empManager } }).success(function (data) {
                    alert(data);
                    alert("Employee Added Successfully.");
                    
                    clearDetails();
                    $scope.empNameSearch = "";
                    $scope.empCountrySearch = "";
                    $scope.ManagerNameSearch = "";
                    getEmployeeList($scope.empNameSearch, $scope.empCountrySearch, $scope.ManagerNameSearch);

                })
         .error(function () {
             $scope.error = "Some Error.";
         });
            }
            else {
                $http.get('/api/Employees/updateEmployee/', { params: { id: $scope.empId, name: $scope.empName, email: $scope.empEmail, country: $scope.empCountry, managerName: $scope.empManager } }).success(function (data) {

                    alert("Employee Updated Successfully");
                    clearDetails();
                    $scope.empNameSearch = "";
                    $scope.empCountrySearch = "";
                    $scope.ManagerNameSearch = "";
                    getEmployeeList($scope.empNameSearch, $scope.empCountrySearch, $scope.ManagerNameSearch);

                })
        .error(function () {
            $scope.error = "Some Error.";
        });
            }

        }
        else {
            $scope.Message = "All the fields are required.";
        }
    }
});