import EmployeeService from "../lib/assets/services/employee-service";
import DepartmentService from "../lib/assets/services/department-service";
import WindowLocationUrlParser from "../lib/assets/parsers/parsers";

import "../lib/js/jquery.validate.min";
import "../lib/css/metro.min.css";
import "../lib/css/style.css";

(function () {
    $("#navBar").empty().append("<ul class='m-menu'><li><a href='#'>Home</a></li>" +
        "<li><a href='#/departments/all' class='department-controls d-all'>Show All Departments</a></li></ul>");

    let actions = new Map();
    let departmentService = new DepartmentService();
    let employeeService = new EmployeeService();

    actions.set("d-all", departmentService.findAll);
    actions.set("d-upsert", departmentService.upsert);
    actions.set("d-delete", departmentService.delete);
    actions.set("d-employees", employeeService.findAll);

    actions.set("e-upsert", employeeService.upsert);
    actions.set("e-delete", employeeService.delete);


    $.validator.addMethod('dateRange', function(value, element, arg) {
        let startDate = Date.parse(arg[0]),
            endDate = Date.parse(arg[1]),
            enteredDate = Date.parse(value);

        if (isNaN(enteredDate)) {
            return false;
        }
        return ((startDate <= enteredDate) && (enteredDate <= endDate));
    });

    $.validator.addMethod("regex",
        function(value, element, regexp) {
            let re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        });

    $(document).on("click", ".department-controls", function (element) {
        element.preventDefault();

        window.location.href = element.currentTarget.href;
        let {emplId, depId} = WindowLocationUrlParser().params;

        if($(element.currentTarget).hasClass("d-all")){
            actions.get("d-all")();
        }
        else if($(element.currentTarget).hasClass("d-upsert")) {
            actions.get("d-upsert")(depId);
        }
        else if($(element.currentTarget).hasClass("d-delete")) {
            actions.get("d-delete")(depId);
        }
        else if($(element.currentTarget).hasClass("d-employees")){
            actions.get("d-employees")(depId);
        }
        else if($(element.currentTarget).hasClass("e-upsert")) {
            actions.get("e-upsert")(emplId, depId);
        }
        else if($(element.currentTarget).hasClass("e-delete")) {
            actions.get("e-delete")(emplId, depId);
        }
    });
})();


