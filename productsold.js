
//Load Data in Table
$(document).ready(function () {
    loadData();
});

//Load Data
function loadData() {
    $.ajax({
        url: "/ProductSolds/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.ProductId + '</td>';
                html += '<td>' + item.CustomerId + '</td>';
                html += '<td>' + item.StoreId + '</td>';
                html += '<td>' + item.DateSold + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')"<button type="button" class="btn btn-warning" > <span class = "glyphicon glyphicon-edit"></span></td>';
                html += '<td><a href="#" onclick="Delete(' + item.Id + ')"<button type="button" class="btn btn-danger" > <span class = "glyphicon glyphicon-trash"></span></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var psoldObj = {
        Id: $('#Id').val(),
        ProductId: $('#ProductId').val(),
        CustomerId: $('#CustomerId').val(),
        StoreId: $('#StoreId').val(),
        DateSold: $('#DateSold').val(),
    };
    $.ajax({
        url: "/ProductSolds/Add",
        data: JSON.stringify(psoldObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Get the Data Based on ProductSold Id
function getbyID(psoldId) {
    $('#ProductId').css('border-color', 'lightgrey');
    $('#CustomerId').css('border-color', 'lightgrey');
    $('#StoreId').css('border-color', 'lightgrey');
    $('#DateSold').css('border-color', 'lightgrey');

    $.ajax({
        url: "/ProductSolds/getbyID/" + psoldId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#ProductName').val(result.ProductName);
            $('#CustomerName').val(result.CustomerName);
            $('#StoreName').val(result.StoreName);
            $('#DateSold').val(result.DateSold);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Update Product Sold's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var psoldObj = {
        Id: $('#Id').val(),
        ProductId: $('#ProductId').val(),
        CustomerId: $('#CustomerId').val(),
        StoreId: $('#StoreId').val(),
        DateSold: $('#DateSold').val(),

    };
    $.ajax({
        url: "/ProductSolds/Update",
        data: JSON.stringify(psoldObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#ProductId').val("");
            $('#CustomerId').val("");
            $('#StoreId').val("");
            $('#DateSold').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Delete Product Sold's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/ProductSolds/RemoveProduct/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
//Function for clearing the textboxes  
function clearTextBox() {
    $('#Id').val("");
    $('#ProductName').val("");
    $('#CustomerName').val("");
    $('#StoreName').val("");
    $('#DateSold').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ProductName').css('border-color', 'lightgrey');
    $('#CustomerName').css('border-color', 'lightgrey');
    $('#StoreName').css('border-color', 'lightgrey');
    $('#DateSold').css('border-color', 'lightgrey');
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#ProductId').val().trim() == "") {
        $('#ProductId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductId').css('border-color', 'lightgrey');
    }
    if ($('#CustomerId').val().trim() == "") {
        $('#CustomerId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CustomerId').css('border-color', 'lightgrey');
    }
    if ($('#StoreId').val().trim() == "") {
        $('#StoreId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#StoreId').css('border-color', 'lightgrey');
    }

    if ($('#DateSold').val().trim() == "") {
        $('#DateSold').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DateSold').css('border-color', 'lightgrey');
    }
    return isValid;
}