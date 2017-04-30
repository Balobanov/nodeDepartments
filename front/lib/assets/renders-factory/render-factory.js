class renderFactory{

    renderDepartmentTable(departments) {
        let table = $("<table id='departments' class='table striped hovered cell-hovered border bordered'></table>")
            .append($("<tr><th>Name</th><th>Delete</th><th>Show employees</th></tr>"));


        for (let department of departments) {
            let tr = $("<tr></tr>");
            tr.append($("<td>" + "<a class='department-controls d-upsert' href=" + "/#/departments/edit?depId=" + department.id + ">" + department.name + "</a>" + "</td>"));
            tr.append($("<td>" + "<a class='department-controls d-delete' href=" + "/#/departments/delete?depId=" + department.id + ">Delete</a>" + "</td>"));
            tr.append($("<td>" + "<a class='department-controls d-employees' href=" + "/#/employees/all?depId=" + department.id + ">Employees</a>" + "</td>"));
            table.append(tr);
        }

        $("#content")
            .empty()
            .append(table)
            .append("<a href='/#/departments/edit' class='button success block-shadow-success text-shadow scale-btn department-controls d-upsert'>Add new Department</a>");
    };

    renderDepartmentForm (department) {

        let {id, name} = department;

        if (!id) {
            id = "";
            name = "";
        }

        let form = $("<form id='departmentForm' class='department-froms' action='/departments/save' method='post'>");
        let div = $("<div></div>");
        div.append(form);

        form.append("<div><input type='hidden' id='id' name='id' value=" + id + "></div>");
        $("<div class='input-control modern text iconic'>")
            .append("<input type='text' name='name' value='" + name + "' id='name'/>")
            .append("<label class='error-label' for='name'></label>")
            .append("<span class='informer'>Please enter your name</span> ")
            .append("<span class='placeholder'>Input name</span> ").appendTo(form);
        form.append("<div><input type='submit'></div>");

        $("#content")
            .empty()
            .append(form);
    };

    renderEmployeeTable(employees, depId) {

        let table = $("<table id='employees' class='table striped hovered cell-hovered border bordered'>")
            .append($("<tr><th>Name</th><th>Email</th><th>Birthday</th><th>Salary</th><th>Delete</th></tr>"));

        for (let employee of employees) {
            let tr = $("<tr></tr>");
            tr.append($("<td>" + "<a class='department-controls e-upsert' href=" + "/#/employees/edit?emplId=" + employee.id + "&depId=" + depId + ">" + employee.name + "</a>" + "</td>"));
            tr.append($("<td>" + "<label>" + employee.email + "</label></td>"));
            tr.append($("<td>" + "<label>" + employee.salary + "</label></td>"));
            tr.append($("<td>" + "<label>" + employee.birthday + "</label></td>"));
            tr.append($("<td>" + "<a class='department-controls e-delete' href=" + "/#/employees/delete?emplId=" + employee.id + "&depId=" + depId + ">Delete</a>" + "</td>"));
            table.append(tr);
        }

        $("#content")
            .empty()
            .append(table)
            .append("<a href='" + "/#/employees/edit?depId=" + depId + "' " +
                "class='button success block-shadow-success text-shadow scale-btn department-controls e-upsert'>Add new Employee</a>");
    };

    renderEmployeeForm (employee, depId) {

        if (!employee.id) {
            employee = {
                id: '',
                name: '',
                email: '',
                salary: '',
                birthday: new Date(),

                department: {
                    id: ''
                }
            }
        }

        let form = $("<form id='employeeForm'  class='department-froms' action='' method='post'>");
        let div = $("<div style='margin:20px'>");
        div.append(form);

        form.append("<div><input id='id' type='hidden' name='id' value='" + employee.id + "'></div>");

        $("<div class='input-control modern text iconic emplInput'>")
            .append("<input class='emplInput' type='email' name='email' title='email' value='" + employee.email + "' id='email'>")
            .append("<label class='emplInput error-label' for='email'></label>")
            .append("<span class='placeholder'>Input E-mail</span>").appendTo(form);

        $("<div class='input-control modern text iconic emplInput'>")
            .append("<input  class='emplInput' type='name' name='name' title='name' value='" + employee.name + "' id='name'>")
            .append("<label class='emplInput error-label' for='name'></label>")
            .append("<span class='placeholder'>Input name</span>").appendTo(form);

        $("<div class='input-control modern text iconic emplInput'>")
            .append("<input  class='emplInput' type='date' name='birthday' title='date' value='" + employee.birthday + "' id='birthday'>")
            .append("<label class='emplInput error-label' for='birthday'></label>")
            .append("<span class='placeholder'>Input birthday date</span>").appendTo(form);

        $("<div class='input-control modern text iconic emplInput'>")
            .append("<input  class='emplInput' type='number' name='salary' title='salary' value='" + employee.salary + "' id='salary'>")
            .append("<label class='emplInput error-label' for='salary'></label>")
            .append("<span class='placeholder'>Input salary</span>").appendTo(form);


        form.append("<div><input id='depId' type='hidden' name='depId' value='" + depId + "'></div>");
        form.append("<div><input style='margin:20px' type='submit'></div>");

        $("#content")
            .empty()
            .append(form);

        // return "" +
        //     "<div style='margin:20px'>" +
        //     "<form id='employeeForm'  class='department-froms' action='' method='post'>" +
        //
        //     "<input id='id' type='hidden' name='id' value='" + employee.id + "'>" +

        //
        //     "<div>" +
        //     "<div class='input-control modern text iconic'>" +
        //     "<input type='number' name='salary' title='salary' value='" + employee.salary + "' id='salary'>" +
        //     "<label class='error-label' for='salary'></label>" +
        //     "<span class='informer'>Please enter your salary</span>" +
        //     "<span class='placeholder'>Input salary</span>" +
        //     "</div>" +
        //     "</div>" +
        //
        //     "<input id='depId' type='hidden' name='depId' value='" + depId + "'>" +
        //
        //     "<div>" +
        //     "<input type='submit'>" +
        //     "</div>" +
        //     "</form>" +
        //     "</div>";
    };
}

export default new renderFactory();