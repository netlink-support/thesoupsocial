cart = {
	add_to_cart: function (product_id, bundle_offer_id) {
		var data = { product_id: product_id, bundle_offer_id: bundle_offer_id };
		soup.ajax_form(
			base_url + "cart/add_to_cart",
			data,
			"POST",
			function (result) {
				var response = JSON.parse(result);
				if (response.status === "success") {
					soup.showAlertBar("Success", "Added to cart", "1");
                    var section = document.querySelector(".product-details-main");
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
					cart.update_cart_count();
				} else {
					soup.showAlertBar(response.status, response.message);
                    var section = document.querySelector(".product-details-main");
					if (section) {
                        section.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
				}
			}
		);
	},
	update_cart_count: function () {
		$.ajax({
			url: base_url + "cart/get_cart_count",
			type: "GET",
			success: function (cartCount) {
				if (cartCount) {
					$(".cart-count").text(cartCount).css("display", "inline-block");
				} else {
					//soup.showAlertBar("Error", "Failed to update cart", "0");
				}
			},
			error: function () {
				//soup.showAlertBar("Error", "Error retrieving cart count", "0");
			},
		});
	},
	refresh_cart: function () {},
	remove_from_cart: function (product_id) {
		var data = { product_id: product_id };
		soup.ajax_form(base_url + "cart/remove", data, "POST", function (result) {
			var response = JSON.parse(result);
			if (response.status === "success") {
				soup.showAlertBar("Success", "Product remove to cart", "1");
				cart.update_cart_count();
				cart.update_total_price();
				cart.update_discount_price();
				cart.update_discount();
				$(".cart-item[data-product-id='" + product_id + "']").remove();
				var section = document.querySelector(".cart-main");
				if (section) {
					section.scrollIntoView({ behavior: "smooth", block: "start" });
				}
				if (response.cart_count === 0) {
					window.location.href = base_url + "cart";
				}
			} else {
				soup.showAlertBar("Error", "Failed to remove product to cart");
				var section = document.querySelector(".cart-main");
				if (section) {
					section.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			}
		});
	},
	update_total_price: function () {
		soup.ajax_form(
			base_url + "cart/get_total_price",
			{},
			"GET",
			function (totalPrice) {
				if (totalPrice) {
					$(".summary-price").text("$" + totalPrice);
				} else {
					soup.showAlertBar("Error", "Failed to update total price");
				}
			}
		);
	},
	update_discount_price: function () {
		soup.ajax_form(
			base_url + "cart/get_discount_price_total",
			{},
			"GET",
			function (totalPrice) {
				if (totalPrice) {
					$(".final-price").text("$" + totalPrice);
				} else {
					soup.showAlertBar("Error", "Failed to update total price");
				}
			}
		);
	},
	update_discount: function () {
		soup.ajax_form(
			base_url + "cart/get_discount_price",
			{},
			"GET",
			function (totalPrice) {
                 let price = parseFloat(totalPrice);
                 if (!isNaN(price)) {
                     $(".discount-price")
                         .text("$" + price.toFixed(2)) 
                         .css("display", "block");
                     $("#discount-section").css("display", "block");
                 } else {
                     $(".discount-price").text("$0.00");
                 }
			}
		);
	},
	clear_cart: function () {},
	apply_coupon: function (coupon) {},
};

$(document).on("click", ".add-to-cart", function (e) {
	var data_product_id = $(this).data("product-id");
	var bundle_offer_id = 0;

	var selected = $('input[name="offer_radio"]:checked');
	if (selected.length > 0) {
		bundle_offer_id = selected.val();
	}
	cart.add_to_cart(data_product_id, bundle_offer_id);
});

$(document).on("click", ".remove-from-cart", function (e) {
	var data_product_id = $(this).data("product-id");
	cart.remove_from_cart(data_product_id);
});
