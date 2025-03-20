soup = {
    loader_text: '',
    // ajax_url: site_url + 'ajax/',
    ajax_form: function (url, data, method, callback)
    {
        ajax_method = 'POST';
        if (typeof method !== 'undefined')
        {
            ajax_method = method;
        }
        $.ajax({
            url: url,
            data: data,
            method: ajax_method,
            async: false,
            beforeSend: function (xhr) {
              
            },
            complete: function () {

            },
            success: function (ret) {
                if (typeof callback === "function") {
                    if (typeof callback_custom_variable_1 !== "undefined")
                    {
                        callback(ret, callback_custom_variable_1);
                    } else
                    {
                        callback(ret);
                    }
                }
            },
            error: function (err) {

            }
        });
    },
    formatCurrency: function (amount, currency)
    {
        var crn = 'USD';
        if (typeof currency !== 'undefined')
        {
            crn = currency;
        }
        return Intl.NumberFormat('en-US', {style: "currency", currency: crn, minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(amount);
    },
    format_date: function (date)
    {
        if (!date || date == null || date == '0000-00-00' || date == '0000-00-00 00:00:00' || date == '1970-01-01') {
            return '-';
        }
        date = new Date(date);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return day + '/' + month + '/' + year;
    },
    format_datetime: function (date)
    {
        if (!date || date == null || date == '0000-00-00' || date == '0000-00-00 00:00:00' || date == '1970-01-01 00:00:00') {
            return '-';
        }
        date = new Date(date);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        var hours = ("0" + date.getHours()).slice(-2);
        var minutes = ("0" + date.getMinutes()).slice(-2);

        var ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = ("0" + hours).slice(-2);

        return day + '/' + month + '/' + year + " " + hours + ":" + minutes + " " + ampm;
    },
    validateEmail: function (email)
    {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test(email);
    },
    showModalAlert(type, message, action)
    {
        var modal_id = 'alert_modal';
        var modal_message = 'alert_modal_message';
        if (typeof type !== 'undefined')
        {
            if (type == 'warning')
            {
                modal_id = 'alert_modal';
                modal_message = 'alert_modal_message';
            }
        }
        

        $('.' + modal_message).html(message);
        $('#' + modal_id).modal('show');
    },
    showAlertBar(type, message, dismissable)
    {
        var type = type.toString().toLowerCase();
        var alert_div = $("<div>").addClass("alert alert-label-icon label-arrow fade mb-5 show");
        if (type == 'success')
        {
            alert_div.addClass('alert-success').append('<i class="ri-notification-off-line label-icon"></i><strong>Success</strong>');
        } else if (type == 'warning')
        {
            alert_div.addClass('alert-warning').append('<i class="ri-alert-line label-icon"></i><strong>Warning</strong>');
        } else if (type == 'error' || type == 'danger')
        {
            alert_div.addClass('alert-danger').append('<i class="ri-error-warning-line label-icon"></i><strong>Error</strong>');
        } else if (type == 'info' || type == 'message')
        {
            alert_div.addClass('alert-info').append('<i class="ri-airplay-line label-icon"></i><strong>Message</strong>');
        }

        alert_div.append(' - ' + message);
        if (typeof dismissable !== 'undefined')
        {
            alert_div.addClass('alert-dismissible');
            alert_div.append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>');
        }


        var alert_parent = $('.main-content-section').find('.container');
        // Use prependTo() to add the new div at the start of the target div
        alert_div.prependTo(alert_parent);

        setTimeout(function () {
            $(".alert").fadeOut('slow')
        }, 5000);
    }
}


