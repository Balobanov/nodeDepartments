import render from "../renders-factory/render-factory";

export default function EmployeeService() {
    let _self = this;

    function _fetchData(url, resolve) {
        $.ajax(url)
            .done(function (res) {
                resolve(res);
            });
    }

    this.findAll = function (depId) {
        _fetchData("/employees/all?depId=" + depId, function (res) {
            render.renderEmployeeTable(res, depId);
        });
    };

    this.upsert = function (id, depId) {
        if (!id) {
            _fetchData("/employees/edit", function (res) {
                render.renderEmployeeForm(res, depId);
                validateEmployeeForm();
            });
        }
        else {
            _fetchData("/employees/edit?id=" + id, function (res) {
                render.renderEmployeeForm(res, depId);
                validateEmployeeForm();
            });
        }
    };

    this.delete = function (id, depId) {
        _fetchData("/employees/delete?id=" + id, function () {
            _self.findAll(depId);
        });
    };

    this.persist = function (employee) {
        $.ajax({
            url: "/employees/save",
            data: JSON.stringify(employee),
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
        }).always(function () {
            _self.findAll(employee.depId);
        });
    };

    function validateEmployeeForm() {
        $("#employeeForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    remote: {
                        url: "/employees/byemail",
                        type: "get",
                        data: {
                            email: function () {
                                return $("#email").val();
                            },
                            id: function () {
                                return $("#id").val();
                            }
                        }
                    }
                },
                name: {
                    required: true,
                    minlength: 5,
                    regex: /^[a-zA-Z]*$/,
                },
                birthday: {
                    required: true,
                    date: true,
                    dateRange: ["1950-01-01", "1990-01-01"]
                },
                salary: {
                    required: true,
                    number: true,
                    range: [100, 100000]
                }
            },

            messages: {
                email: {
                    remote: "E-mail should be unique.",
                    required: "Please provide a email",
                    email: "Enter correct email",
                    regex: "Incorrect format of email address."
                },
                name: {
                    required: "Please provide a name",
                    minlength: "Your name must be at least 5 characters long",
                    regex: "Enter correct name."
                },
                salary: {
                    required: "Salary should be set.",
                    number: "Digits only.",
                    range: "Salary should be between 100 and 100.000."
                },
                birthday: {
                    required: "Set date.",
                    date: "Incorrect date.",
                    dateRange: "Employee should be more than 18 years old."
                },
            },
            submitHandler: function (form) {
                let employee = getEmployeeForm(form);
                _self.persist(employee);
                _self.findAll(employee.depId);
            }
        });
    }

    function getEmployeeForm(form) {
        let id = $(form).find("#id").val();
        let name = $(form).find("#name").val();
        let email = $(form).find("#email").val();
        let birthday = $(form).find("#birthday").val();
        let salary = $(form).find("#salary").val();
        let depId = $(form).find("#depId").val();

        return {id, name, email, birthday, salary, depId};
    }
}
