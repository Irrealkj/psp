$(function () {

    $.fn.setValidation = function () {
        $(this).validate({
            onfocusout: false,
            onkeyup: function (element, e) {
                $(element).removeClass('validation-error');
                if ($(element).hasClass('error')) {
                    $(element).valid();
                }
            },
            onclick: function (element) {
                if ($(element).hasClass('error')) {
                    $(element).valid();
                }
            },
            onsubmit: function (form) {
                form.find('input').removeClass('validation-error');
                $('#invalid_phone_format').hide();
            },
            success: function (error, element) {

                if ($(element).is(':radio, :checkbox')) {
                    $(element).parent()
                        .attr('tt', '')
                        .removeClass('error')
                        .addClass('valid')
                        .tooltip('close')
                        .tooltip('disable')
                } else {
                    $(element)
                        .attr('tt', '')
                        .tooltip('close')
                        .tooltip('disable')
                }
            },
            errorPlacement: function (error, element) {
                if ($(element).is(':radio, :checkbox')) {
                    var closest = $(element).parent();
                    closest.customToolTip();
                    $(element).parent()
                        .attr('tt', error.html())
                        .addClass('error')
                        .tooltip('open');
                } else {
                    $(element).attr('tt', $(error).html());
                    element.customToolTip();
                    $(element).tooltip('open');
                }
            },
            showErrors: function (errorMap, errorList) {
                $('#invalid_phone_format').hide();
                if (errorList.length != 0) {
                    $('#form_validate_custom').show();
                    $.each(errorMap, function(key, value) {
                        if (key === 'subscriber[phone]') {
                            $('#invalid_phone_format').show();
                        }
                        $('[name="'+ key +'"]').addClass('validation-error');
                    });
                } else {
                    $(":submit").prop('disabled', true);
                }
            }
        });
    };

    //Validation rules
    jQuery.validator.addClassRules({
        agree: {
            required: true
        },
        name: {
            alphagREG: true
        },
        lastname: {
            alphagREG: true
        },
        address: {
            alphagREG: true
        },
        zipcode: {
            zipcodeREG: true
        },
        date: {
            dateREG: true
        },
        email: {
            emailREG: true
        },
        phone: {
            phoneREG: true
        },
        required: {
            emptyREG: true
        },
        confirm_password: {
            equalTo: '.password'
        },
        ccard: {
            ccardREG: true,
            checkCard: true
        },
        ccardfull: {
            ccardREGfull: true,
            checkCard: true
        },
        cvv: {
            cvvREG: true
        },
        country: {
            countryREG: true
        },
        intlphone: {
            intlPhoneREG: true
        },
        intlorlocalphone: {
            intlOrLocalPhoneREG: true
        }
    });

    jQuery.validator.addMethod('emptyREG', function (value, element, params) {
        return value.match(new RegExp(regex['empty']));
    }, $.validator.messages.required);

    jQuery.validator.addMethod('alphagREG', function (value, element, params) {
        return value.match(new RegExp(regex['alpha']));
    }, $.validator.messages.lettersonly);

    jQuery.validator.addMethod('ccardREG', function (value, element, params) {
        ccardFormatREG($('.ccardfull').val());
        return value.match(new RegExp(regex['ccard_number']));
    }, $.validator.messages.creditcard);

    jQuery.validator.addMethod('ccardREGfull', function (value, element, params) {
        ccardFormatREG($('.ccardfull').val().replace(/\s/g, ''));
        return value.match(new RegExp(regex['ccard_number_full']));
    }, $.validator.messages.creditcard);

    jQuery.validator.addMethod('checkCard', function (value, element, params) {

        value = jQuery(".ccardfull").val();

        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value)) return false;

        // The Luhn Algorithm. It's so pretty.
        var nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) == 0;


    }, $.validator.messages.creditcard);

    jQuery.validator.addMethod('cvvREG', function (value, element, params) {
        return value.match(new RegExp(regex['ccard_cvv']));
    }, $.validator.messages.cvv);

    jQuery.validator.addMethod('phoneREG', function (value, element, params) {
        return value.match(new RegExp(regex['phone']));
    }, $.validator.messages.phone);

    jQuery.validator.addMethod('dateREG', function (value, element, params) {
        return value.match(new RegExp(regex['date']));
    }, $.validator.messages.date);

    jQuery.validator.addMethod('ipREG', function (value, element, params) {
        return value.match(new RegExp(regex['ip']));
    }, $.validator.messages.ip);

    jQuery.validator.addMethod('mysqlDateREG', function (value, element, params) {
        return value.match(new RegExp(regex['mysql_date']));
    }, $.validator.messages.date);

    jQuery.validator.addMethod('emailREG', function (value, element, params) {
        //return true;
        return value.match(new RegExp(regex['email']));
    }, $.validator.messages.email);

    jQuery.validator.addMethod('zipcodeREG', function (value, element, params) {
        return value.match(new RegExp(regex['zipcode']));
    }, $.validator.messages.zipcode);

    jQuery.validator.addMethod('countryREG', function (value, element, params) {
        return value.match(new RegExp(regex['country']));
    }, $.validator.messages.country);

    jQuery.validator.addMethod('intlPhoneREG', function (value, element, params) {
        return value.match(/^(\+){0,1}(\d|\s|\(|\)){10,13}$/);
    }, $.validator.messages.intlphone);

    jQuery.validator.addMethod('intlOrLocalPhoneREG', function (value, element, params) {
        return value.match(new RegExp(regex['intlphone'])) || value.match(new RegExp(regex['phone']));
    }, $.validator.messages.intlphone);
});

$(document).ready(function () {
    $("#id_adult").prop('checked', false);
    $("#id_adult").attr('checked', false);
});



