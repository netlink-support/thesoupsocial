/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document).ready(function () {
	$("#contact_form").validate({
		rules: {
			name: {
				required: true,
				minlength: 3,
			},
			email: {
				required: true,
				email: true,
			},
			message: {
				required: true,
				minlength: 10,
			},
		},
		messages: {
			name: {
				required: "Please enter your name.",
				minlength: "Your name must be at least 3 characters long.",
			},
			email: {
				required: "Please enter your email address.",
				email: "Please enter a valid email address.",
			},
			message: {
				required: "Please enter your message.",
				minlength: "Your message must be at least 10 characters long.",
			},
		},
		errorPlacement: function (error, element) {
			error.insertAfter(element);
		},
		submitHandler: function (form) {
			var formData = {
				name: $("#name").val(),
				email: $("#email").val(),
				message: $("#message").val(),
			};

			var url = $("#ajax-url").data("url");

			$.ajax({
				url: url,
				type: "POST",
				data: formData,
				dataType: "json",
				success: function (response) {
					if (response.status === "success") {
						$("#result").html(
							'<div class="alert alert-success">' + response.message + "</div>"
						);
						$("#contact_form")[0].reset();
					} else {
						$("#result").html(
							'<div class="alert alert-danger">' + response.message + "</div>"
						);
					}
				},
				error: function () {
					$("#result").html(
						'<div class="alert alert-danger">An error occurred, please try again.</div>'
					);
				},
			});
		},
	});
});
