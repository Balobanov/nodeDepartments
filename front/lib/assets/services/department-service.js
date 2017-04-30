import render from "../renders-factory/render-factory";
import "../../js/jquery.validate.min";

export default function DepartmentService() {
    let _self = this;

       function _fetchData(url, resolve) {
        $.ajax(url)
            .done(function (res) {
                resolve(res);
            });
    }

    this.findAll = function () {
        _fetchData("/departments/all", function (res) {
            render.renderDepartmentTable(res);
        });
    };

    this.upsert = function (id) {
        if (!id) {
            _fetchData("/departments/edit", function (res) {
               render.renderDepartmentForm(res);
                validateDepartmentForm();
            });
        }
        else {
            _fetchData("/departments/edit?id=" + id, function (res) {
                render.renderDepartmentForm(res);
                validateDepartmentForm();
            });
        }
    };

    this.delete = function (id) {
        _fetchData("/departments/delete?id=" + id, function () {
            _self.findAll();
        });
    };

    this.persist = function (data) {
        $.ajax({
            url: "/departments/save",
            data: JSON.stringify(data),
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
        }).always(function () {
            _self.findAll();
        });
    };

    function getDepartmentForm(form) {
        let id = $(form).find("#id").val();
        let name = $(form).find("#name").val();
        return {id, name};
    }

    function validateDepartmentForm() {
        $("#departmentForm").validate({
            rules: {
                name: {
                    regex: /^[a-zA-Z]*$/,
                    required: true,
                    minlength: 5,
                    remote: {
                        url: "/departments/byname",
                        type: "get",
                        data: {
                            name: function () {
                                return $("#name").val();
                            },
                            id: function () {
                                return $("#id").val();
                            }
                        }
                    }
                }
            },

            messages: {
                name: {
                    remote: "Name should be unique.",
                    required: "Please provide a name",
                    minlength: "Your name must be at least 5 characters long",
                    regex: "Enter correct name. Only characters."
                }
            },
            submitHandler: function (form) {
                let department = getDepartmentForm(form);
                _self.persist(department);
                _self.findAll();
            }
        });
    }
}


