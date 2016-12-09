/*
 * Andrew Gabriel, andrew_gabriel@student.uml.edu
 * COMP 4610 - 201, Assignment 7
 * This file contains the javascript for the multiplication table.
 */


/* *** Form Validation *** */

jQuery.validator.addMethod("greaterThan", function(value, element, param) {
    return this.optional(element) || parseInt(value) > parseInt($(param).val());
}, jQuery.validator.format("This number must be greater than the previous number."));

// Validate form
$('#myForm').validate({
    onfocusout: function(element) {
        this.element(element);
    },
    
    submitHandler: function(form) {
    	var inputArray = [parseInt(form[0].value), parseInt(form[1].value), parseInt(form[2].value), parseInt(form[3].value)];
        
    	// Quit and print an error message if the table will be too large
        if ((inputArray[1] - inputArray[0]) * (inputArray[3] - inputArray[2]) > 50000) {
            $('#overflowWarning').text('No action taken. Total number of cells would be too large.');
        } else  {
            createMultTable(inputArray[0], inputArray[1], inputArray[2], inputArray[3]);
        }
    },

    invalidHandler: function(event, validator) {
        $('#overflowWarning').text('No action taken. Please correct the input and try again.');
    },

    rules: {
        x2: {
            greaterThan: "#myFormInput1"
        },
        x4: {
            greaterThan: "#myFormInput3"
        }
    }
});


/* createMultTable():
 * 
 * This function, when called, creates a multiplication table.
 * The values for the table are taken from a form found in the HTML.
 */
function createMultTable(x1, x2, x3, x4) {
    var i;
    var j;

    // Create multiplication table
    var multTable = document.getElementById('multTable');
    multTable.innerHTML = '';
    
    var row = multTable.insertRow();
    row.insertCell()
    
    for (i = x1; i <= x2; i++) {
        var cell = row.insertCell();
        cell.innerHTML = i;
    }
    
    for (i = x3; i <= x4; i++) {
        var row = multTable.insertRow();
        var leftMostCell = row.insertCell();
        leftMostCell.innerHTML = i;
        
        for (j = x1; j <= x2; j++) {
            var cell = row.insertCell();
            cell.innerHTML = i * j;
        }
    }
    
    // Check if the table overflows the containing div
    var theWrapper = document.getElementById('wrapper');
    var warningMessage = document.getElementById('overflowWarning');
    if (multTable.offsetWidth + 320 > theWrapper.offsetWidth) { 
        warningMessage.innerHTML = 'WARNING: Some content may have been cut off due to the width of the table.';
    } else {
        warningMessage.innerHTML = '';
    }
}
