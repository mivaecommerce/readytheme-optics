var cornerstoneUX = {
	init: function () {
		String.prototype.toCamelCase = function(cap1st) {
			return ((cap1st ? '-' : '') + this).replace(/-+([^-])/g, function(a, b) {
				return b.toUpperCase();
			});
		};
        var pageID = document.body.id.toCamelCase();
		
		if (cornerstoneUX[pageID]) {
			// ---- If the function exists, run it, otherwise, don't do anything. ---- //
			$(document).ready(function () {
				cornerstoneUX[pageID]();
			});
		};
		
		$(document).ready(function () {
			// ---- Create the "main" element for older versions of IE ---- //
			document.createElement('main');
			
			// ---- Allow Named Anchors With A Class Of "smoothscroll" To Work Without Full URL ---- //
			$('a[href^="\#"].smoothscroll').on('click', function (e) {
				e.preventDefault();
				var target = this.href.substr(this.href.indexOf('#')),
					target = $(target);
					
				if (target.offset().top > windowHeight / 2) {
					var offset = $('#js-header').outerHeight();
				}
				else {
					var offset = 10;
				};
					
				scrollToDiv(target, offset);
			});
			
			// ---- Back to Top Controls ---- //
			function backToTop () {
				var chaser = $('#js-chaser')
					windowHeight = $(window).height();
				
				if (chaser) {
					$(window).scroll(function() {
						if ($(window).scrollTop() >= windowHeight / 2) {
							chaser.fadeIn();
						}
						else {
							chaser.hide();
						};
					});
					
					chaser.on('click', function () {
						$('html, body').animate({scrollTop: '0px'}, 800);
					});
				};
			};
			if ($(window).innerWidth() >= 768) {
				var backToTop = new backToTop;
			};
			
			// ---- On scroll, fix the header to the top ---- //
			if (document.location.protocol !== 'https:' && $(window).innerWidth() >= 768) {
				$('#js-header').stuck();
			};
			
			// ---- Toggle global search display ---- //
			$('#js-open-global-search').on('click', function (e) {
				if ($(this).parents('li').hasClass('open') && $(this).prev('input[type="search"]').val() !== '') {
					$(this).parent('form').submit;
				}
				else {
					e.preventDefault();
					$(this).parents('li').toggleClass('open');
				}
			});
		
			// ---- Mobile Footer Links Control ---- //
			function footerNavControl () {
				if ($(window).innerWidth() < 704) {
					if ($('#js-mobile-footer-links ul').length == 0) {
						$('#js-mobile-footer-links').append($('#js-footer-links').find('ul'));
					};
				}
				else {
					if ($('#js-footer-links ul').length == 0) {
						$('#js-footer-links').append($('#js-mobile-footer-links').find('ul'));
					}
				};
				/* Corrects positioning of virtual keyboard */
				$(document).on('focus', 'input, select, textarea', function () {
					$('#mobile-footer').css('position', 'static');
				});
				$(document).on('blur', 'input, select, textarea', function () {
					$('#mobile-footer').css('position', 'fixed');
				});
			};
			$(window).on('debouncedresize load', footerNavControl ());
			
		});
	},
	
	sharedFunctions: {
		// ---- Product Carousels ---- //
		productsCarousels: function (carousel, append) {
			var carousel = $(carousel);
			if (append === true) {
				var appendArrowsTo = $(carousel.selector).parent();
			}
			else if (append === 'undefined') {
				var appendArrowsTo = $(carousel.selector);
			};
			
			$.ajax({
				cache: true,
				crossDomain: true,
				dataType: 'script',
				url: '../js/jquery.slick.min.js'
			}).done(function () {
				carousel.slick({
					appendArrows: appendArrowsTo,
					draggable: false,
					slidesToShow: 4,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 3
							},
							breakpoint: 640,
							settings: {
								slidesToShow: 3
							},
							breakpoint: 480,
							settings: {
								slidesToShow: 1
							}
						}
					]
				});
			});
		},
		
		// ---- Toggle Details ---- //
		toggleCustomerFields: function () {
			var ToggleDetails={primary_fields:null,secondary_fields:null,primary_tag:"",secondary_tag:"",trigger:null,controls:null,primary_inputs:[],primary_selects:[],secondary_inputs:[],secondary_selects:[],init:function(){var a=this;this.primary_fields=document.getElementById("js-shipping-fields");this.secondary_fields=document.getElementById("js-billing-fields");this.trigger=document.getElementById("js-billing-to-show");this.controls=document.getElementById("js-billing-controls");this.primary_tag="Ship"; this.secondary_tag="Bill";this.primary_inputs=this.primary_fields.getElementsByTagName("input");this.primary_selects=this.primary_fields.getElementsByTagName("select");this.secondary_inputs=this.secondary_fields.getElementsByTagName("input");this.secondary_selects=this.secondary_fields.getElementsByTagName("select");this.addEvent(this.trigger,"click",function(){a.go()});this.controls.style.visibility="visible";this.trigger.checked&&(this.addEvent(this.trigger.form,"submit",ToggleDetails.copyFields), this.secondary_fields.style.visibility="hidden",this.secondary_fields.style.display="none")},go:function(){this.trigger.checked?(this.addEvent(this.trigger.form,"submit",ToggleDetails.copyFields),this.secondary_fields.style.visibility="hidden",this.secondary_fields.style.display="none"):(this.removeEvent(this.trigger.form,"submit",ToggleDetails.copyFields),this.secondary_fields.style.visibility="visible",this.secondary_fields.style.display="block")},copyFields:function(){var a={},c={},b;for(i=0;i< ToggleDetails.primary_inputs.length;i+=1)b=ToggleDetails.primary_inputs[i].name.replace(ToggleDetails.primary_tag,ToggleDetails.secondary_tag),a[b]={},a[b].value=ToggleDetails.primary_inputs[i].value,ToggleDetails.primary_inputs[i].checked&&(a[b].checked=!0);for(i=0;i<ToggleDetails.primary_selects.length;i+=1)b=ToggleDetails.primary_selects[i].name.replace(ToggleDetails.primary_tag,ToggleDetails.secondary_tag),c[b]={},c[b].selectedIndex=ToggleDetails.primary_selects[i].selectedIndex;for(member in a)ToggleDetails.trigger.form[member]&& (ToggleDetails.trigger.form[member].value=a[member].value,ToggleDetails.trigger.form[member].checked=a[member].checked);for(member in c)ToggleDetails.trigger.form[member].selectedIndex=c[member].selectedIndex},addEvent:function(a,c,b){return a.addEventListener?(a.addEventListener(c,b,!1),!0):a.attachEvent?a.attachEvent("on"+c,b):!1},removeEvent:function(a,c,b){a.removeEventListener?a.removeEventListener(c,b,!1):a.detachEvent&&a.detachEvent("on"+c,b)}};ToggleDetails.init();	
		},
		
		// ---- Cart Summary Controls ---- //
		cartSummary: function () {
			var marker = $('#js-toggle-cart-summary-contents').find('span'),
				clickCount = 0;

			$('#js-toggle-cart-summary-contents').on('click', function (e) {
				e.preventDefault();
				if (clickCount) {
					marker.html('&#9660;');
					clickCount = 0;
					$('#js-cart-summary-contents').slideDown();
				}
				else {
					clickCount = 1;
					marker.html('&#9658;');
					$('#js-cart-summary-contents').slideUp();
				};
			});
			if ($(window).innerWidth() < 768) {
				$('#js-toggle-cart-summary-contents').click();
			};		
		},
		
		// ---- Open Forgot Password ---- //
		openForgotPassword: function (pageID) {
			$('#js-open-forgot-password').magnificPopup({
				callbacks: {
					open: function () {
						if (pageID == 'jsOCST') {
							magnificPopup.close();
						};
					}
				},
				focus: '#l-Customer_LoginEmail',
				items: {
					src: $('#js-forgot-password'),
					type: 'inline'
				}
			});
		},
		
		// ---- Conform all subcategory and/or product DIVs to same height ---- // 
		conformDisplay: function () {
			$('.category-product').conformity({mode: 'height'});
			$(window).on('resize', function () {
				$('.sub-category').conformity();
			});
		}
		
	},
	
	jsSFNT: function () {
		// ---- Product Carousels ---- //
		cornerstoneUX.sharedFunctions.productsCarousels('#js-most-popular-carousel');
		cornerstoneUX.sharedFunctions.productsCarousels('#js-on-sale-carousel');
	},
	
	jsCTGY: function () {
		// ---- Conform all subcategory and/or product DIVs to same height ---- //
		cornerstoneUX.sharedFunctions.conformDisplay();
	},
	
	jsPROD: function () {
		// ---- Open Gallery On Main Image Click ---- //
		if (gallery.length > 0) {
			$('#js-main-image, #js-main-image-zoom').magnificPopup({
				gallery: {
					enabled: true
				},
				image: {
					cursor: ''
				},
				items: gallery,
				type: 'image'
			});
		}
		else {
			$('#js-main-image, #js-main-image-zoom').magnificPopup({
				items: {
					src: $('#js-main-image').attr('src')
				},
				type: 'image'
			});
		};
		
		// ---- Update Button For "Out Of Stock" ---- //
		function outOfStock () {
			var button = $('#js-add-to-cart');
				
			if (button.is(':disabled') == true) {
				button.addClass('bg-gray').val('Sold Out');
			}
			else {
				button.removeClass('bg-gray').val('Add to Cart');
			};
		};
		outOfStock ();
		
		// ---- Update Display When Attribute Machine Fires ---- //
		MivaEvents.SubscribeToEvent('variant_changed', function () {
			outOfStock ();
		});
	
		// ---- Update Display Price Based on Attribute Selections (If Attribute Machine Is Not Being Used) ---- //
		if (typeof attrMachCall === 'undefined' && document.getElementById('js-product-attribute-count').value > 0) {
			for(var baseProductPrice=Number(document.getElementById("js-price-value").getAttribute("data-base-price")),regularProductPrice=Number(),productAttributeCount=Number(document.getElementById("js-product-attribute-count").value+1),productAttributes=document.getElementById("js-purchase-product").elements,attributeType=[""],i=0;i<productAttributes.length;i++){var tagName=productAttributes[i].tagName.toLowerCase(),elementType=productAttributes[i].type,type=productAttributes[i].getAttribute("data-attribute-type"), name=productAttributes[i].name;"hidden"==elementType&&null!=type&&attributeType.push(type);productAttributes[i].onchange=function(){updateProductDisplayPrice()}} function updateProductDisplayPrice(){for(var b,a,c=baseProductPrice,f=regularProductPrice,d=1;d<productAttributeCount;d++)if(b=document.getElementsByName("Product_Attributes["+d+"]:value"),"select"==attributeType[d])for(var e=0;e<b.length;e++)a=b.item(e),a=a.options.item(a.selectedIndex),c+=Number(a.getAttribute("data-option-price")),f+=Number(a.getAttribute("data-regular-price"));else if("radio"==attributeType[d]||"checkbox"==attributeType[d])for(e=0;e<b.length;e++)a=b.item(e),a.checked&&(c+=Number(a.getAttribute("data-option-price")), f+=Number(a.getAttribute("data-regular-price")));else if("text"==attributeType[d]||"memo"==attributeType[d])a=b.item(0),a.value&&(c+=Number(a.getAttribute("data-option-price")),f+=Number(a.getAttribute("data-regular-price")));b=document.getElementsByName("Quantity");c*=Number(b.item(0).value);b.item(0);document.getElementById("js-price-value").innerHTML=formatCurrency(c)} function formatCurrency(b){var a=!1;0>b&&(a=!0,b=Math.abs(b));return(a?"-$":"$")+parseFloat(b,10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,"$1,").toString()}updateProductDisplayPrice();
		};

		// ---- Quantity Incrementer ---- //
		$('#js-increase-quantity').on('click', function () {
			var $qty = $(this).parent().siblings('div').find('input'),
				currentVal = parseInt($qty.val());
				
			if (!isNaN(currentVal)) {
				$qty.val(currentVal + 1);
			};
		});
		$('#js-decrease-quantity').on('click', function () {
			var $qty = $(this).parent().siblings('div').find('input'),
				currentVal = parseInt($qty.val());
				
			if (!isNaN(currentVal) && currentVal > 0) {
				$qty.val(currentVal - 1);
			};
		});

		// ---- AJAX Add To Cart ---- //
		function addToCart () {
			$('#js-add-to-cart').on('click', function (e) {
				var purchaseForm = $('#js-purchase-product');
				// Check the form is not currently submitting
				if (purchaseForm.data('formstatus') !== 'submitting') {
					// Set up variables
					var form = purchaseForm,
						formData = form.serialize(),
						formUrl = form.attr('action'),
						randomNo = Math.ceil(Math.random() * 1000000), // IE6/7 Hack: Creating random number to refresh ajax call
						miniBasketURL = form.attr('action').slice(0, -4) + 'ABSK&v=' + randomNo,
						formMethod = form.attr('method'),
						responseMessage = $('#js-purchase-message'),
						miniBasket = $('#js-mini-basket-container'),
						processingImage = $('#js-processing-purchase'),
						purchaseButton = $(this);
					
					// Add status data to form
					form.data('formstatus', 'submitting');
					
					// Show processing message
					processingImage.show();
					purchaseButton.toggleDisabled().val('Processing...');
					responseMessage.html('').hide();
					
					// Send data to server for validation
					$.ajax({
						url: formUrl,
						type: formMethod,
						data: formData,
						success: function(data, textStatus, jqXHR) {
							if (data.search(/id="js-BASK"/i) != -1) {
								$('html, body').animate({scrollTop: '0px'}, 250);
								var responseMiniBasket = $(data).find('#js-mini-basket-container'),
									miniBasketCount = responseMiniBasket.contents()[1].dataset.itemcount,
									miniBasketSubtotal = ' ' + responseMiniBasket.contents()[1].dataset.subtotal,
									miniBasketLinkCount = $('#js-mini-basket-count, #js-mobile-basket-count, #js-mobile-footer-basket-count, #js-mobile-menu-basket-count'),
									miniBasketLinkSubtotal = $('#js-mini-basket-subtotal');
								
								miniBasketLinkCount.text(miniBasketCount); // Update basket quantity (display only)
								miniBasketLinkSubtotal.text(miniBasketSubtotal); // Update basket subtotal (display only)
								
								miniBasket.html(responseMiniBasket.contents()).addClass('open');
								setTimeout(function () {
									miniBasket.removeClass('open');
								}, 5000);

								// Re-Initialize Attribute Machine (if it is active)
								if (typeof attrMachCall !== 'undefined') {
									attrMachCall.Initialize();
								};
							}
							else if(data.search(/id="js-PATR"/i) != -1) {
								var missingAttrs = [];
								form.find('.required').each(function () {
									missingAttrs.push(' ' + $(this).attr('title'));
								});
								responseMessage.html('All <em class="red">Required</em> options have not been selected.<br />Please review the following options: <span class="red">' + missingAttrs + '</span>.').fadeIn().delay(5000).fadeOut();
							}
							else if(data.search(/id="js-PLMT"/i) != -1) {
								responseMessage.html('We do not have enough of the Size/Color you have selected.<br />Please adjust your quantity.').fadeIn().delay(3000).fadeOut();
							}
							else if(data.search(/id="js-POUT"/i) != -1) {
								responseMessage.html('The Size/Color you have selected is out of stock.<br />Please review your options or check back later.').fadeIn().delay(3000).fadeOut(); 
							}
							else {
								responseMessage.html('Please review options.').fadeIn().delay(3000).fadeOut();
							};
							
							// Hide processing message and reset formstatus
							processingImage.hide();
							purchaseButton.toggleDisabled().val('Add to Cart');
							form.data('formstatus', 'idle');
						},
						error: function (jqXHR, textStatus, errorThrown) {
						}
					});
				};
				// Prevent form from submitting
				e.preventDefault();
			});
		};
		var addToCart = new addToCart;

	},
	
	jsPLST: function () {
		// ---- Conform all subcategory and/or product DIVs to same height ---- //
		cornerstoneUX.sharedFunctions.conformDisplay();
	},
	
	jsSRCH: function () {
		// ---- Conform all subcategory and/or product DIVs to same height ---- //
		cornerstoneUX.sharedFunctions.conformDisplay();
	},
	
	jsBASK: function () {
		// ---- Remove Item From Basket (Compatible down to IE6) ---- //
		$('.remove-item').on('click', function () {
			$(this).children('input').prop('checked', 'checked');
			if ($(this).children('input').is(':checked')) {
				$('#js-bask-form').submit();
			}
		});
		
		// ---- Estimate Shipping Function ---- //
		function estimateShipping () {
			function resetFields () {
				$('#js-shipping-estimate-state-select').prop('selectedIndex', 0);
				$('#js-shipping-estimate-country').val('US');
				$('#js-shipping-estimate-state, #js-shipping-estimate-zip').val('');
			};
			
			$('#js-show-shipping-estimate').on('click', function (e) {
				e.preventDefault();
				$('#js-shipping-estimate-dialog').fadeToggle();
				resetFields ();
			});

			$('#js-shipping-estimate-recalculate').on('click', function (e) {
				e.preventDefault()
				$(this).hide();
				$('#js-shipping-estimate-results').fadeOut(function () {
					$('#js-shipping-estimate-fields').fadeIn();
				}).empty();
			});

			$('#js-shipping-estimate-form').on('submit', function (e) {
				e.preventDefault()
				if ($(this).data('formstatus') !== 'submitting') {

					var form = $(this),
						formData = form.serialize(),
						formUrl = form.attr('action'),
						formMethod = form.attr('method')
					
					form.data('formstatus', 'submitting');
					$.ajax({
						url: formUrl,
						type: formMethod,
						data: formData,
						success: function(data, textStatus, jqXHR) {
							$('#js-shipping-estimate-fields').fadeOut(function () {
								$('#js-shipping-estimate-results').html(data).fadeIn();
								$('#js-shipping-estimate-recalculate').fadeIn();
							});
							resetFields ();
							form.data('formstatus', 'idle');
						},
						error: function (jqXHR, textStatus, errorThrown) {
							console.log(errorThrown);
							form.data('formstatus', 'idle');
						}
					});
				};
			});
		};
		var estimateShipping = new estimateShipping;
	
	},
	
	jsACAD: function () {
		// ---- Copy Email Address to Shipping or Billing Email ---- //
		$('#js-Customer_LoginEmail').on('blur', function () {
			var primaryAddress = $(this).attr('data-primary'),
				shippingEmail = $('#js-Customer_ShipEmail'),
				billingEmail = $('#js-Customer_BillEmail');
			
			if (primaryAddress == 'shipping') {
				if (shippingEmail && (shippingEmail.val() == '')) {
					shippingEmail.val($(this).val());
				};
			}
			else if (primaryAddress == 'billing') {
				if (billingEmail && (billingEmail.val() == '')) {
					billingEmail.val($(this).val());
				};
			};
		});
		
		// ---- Toggle Customer Fields Controls ---- //
		cornerstoneUX.sharedFunctions.toggleCustomerFields();
	},
	
	jsACED: function () {
		// ---- Toggle Customer Fields Controls ---- //
		cornerstoneUX.sharedFunctions.toggleCustomerFields();
	},
	
	jsCTUS: function () {
		// ---- Additional Server Security To Help Against Spambots ---- //
		$.ajax({
			cache: true,
			crossDomain: true,
			dataType: 'script',
			url: '//ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js'
		}).done(function () {
			var contactForm = $('#js-contact-form');
			$('#js-noscript-warning').remove();
			contactForm.show();
			$.get('../forms/token.php', function (tkn) {
				contactForm.append('<input type="hidden" name="mms" value="' + tkn + '" />');
			});
			
			// ---- Form Validation ---- //
			contactForm.validate({
				errorContainer: '#js-contact-form div.message',
				errorLabelContainer: '#js-contact-form div.message small',
				errorElement: 'p',
				rules: {
					contactName: {required: true, minlength: 2},
					contactEmail: {required: true, email: true},
					contactComment: {required: true, minlength: 2}
				},
				messages: {
					contactName: {required: 'Your Name Is Required', minlength: jQuery.validator.format('Your Name must be a minimum of {0} characters!')},
					contactEmail: {required: 'Your Email Address Is Required', email: 'Your Email Address must be formatted like name@domain.com'},
					contactComment: {required: 'Comments or Questions Are Required', minlength: jQuery.validator.format('Your Message must be a minimum of {0} characters!')}
				},
				highlight: function (element, errorClass) {
					$(element.form).find('label[for=' + element.id + ']').addClass(errorClass);
				},
				unhighlight: function (element, errorClass) {
					$(element.form).find('label[for=' + element.id + ']').removeClass(errorClass);
				},
				submitHandler: function (form) {
					if ($(this).data('formstatus') !== 'submitting') {
						var form = contactForm,
							formData = form.serialize(),
							formUrl = form.attr('action'),
							formMethod = form.attr('method')
						
						form.data('formstatus', 'submitting');
						$.ajax({
							url: formUrl,
							type: formMethod,
							data: formData,
							success: function(data, textStatus, jqXHR) {
								// Show reponse message
								if (data.search(/error/i) != -1) {
									$('#js-contact-form div.message').fadeOut(200, function () {
										$(this).removeClass('message-info').addClass('message-error').text(data).fadeIn(200);
									});
								}
								else {
									$('#js-contact-form div.message').removeClass('message-error').addClass('message-success').text(data).fadeIn(200);
								};
								form.data('formstatus', 'idle');
							},
							error: function (jqXHR, textStatus, errorThrown) {
								console.log(errorThrown);
								form.data('formstatus', 'idle');
							}
						});
					};
				}
			});
		});
	},
	
	jsAFCL: function () {
		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword();
	},
	
	jsLOGN: function () {
		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword();
	},
	
	jsORDL: function () {
		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword();
	},
	
	jsORHL: function () {
		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword();
	},
	
	jsOCST: function () {
		// ---- Open Log-In Form ---- //
		$('#js-open-ocst-login').magnificPopup({
			focus: '#l-Customer_LoginEmail',
			items: {
				src: $('#js-ocst-login'),
				type: 'inline'
			}
		});

		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword('jsOCST');

		// ---- Cart Summary Controls ---- //
		cornerstoneUX.sharedFunctions.cartSummary();

		// ---- Toggle Customer Fields Controls ---- //
		cornerstoneUX.sharedFunctions.toggleCustomerFields();
		if ($(window).innerWidth() < 768) {
			$('#js-billing-to-show').click();
		};		

	},
	
	jsOSEL: function () {
		// ---- Cart Summary Controls ---- //
		cornerstoneUX.sharedFunctions.cartSummary();
	},
	
	jsOPAY: function () {
		// ---- Cart Summary Controls ---- //
		cornerstoneUX.sharedFunctions.cartSummary();
		
		// ---- Make Credit Card Expiration Fields More User-Friendly ---- //
		$('#js-cc_exp select').first().find('option:first').text('Month');
		$('#js-cc_exp select').last().find('option:first').text('Year');

		// ---- CVV Information Function ---- //
		$('#js-open-cvv-information').magnificPopup({
			items: {
				src: $('#js-cvv-information'),
				type: 'inline'
			}
		});

		// ---- Secondary Form Submit Button ---- //
		$('#js-opay-form-submit').on('click', function () {
			$('#js-opay-form').submit();
		});
	},
	
	jsINVC: function () {
	},
	
	jsORDP: function () {
		// ---- Launch Printer Dialog ---- //
		window.print();
	},
	jsSMAP: function () {
		$('.site-map').conformity({mode: 'height'});
		$(window).on('resize', function () {
			$('.site-map').conformity();
		});
	}
};
cornerstoneUX.init();