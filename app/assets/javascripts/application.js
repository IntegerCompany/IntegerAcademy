// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery/2.1.4/jquery.min
//= require jquery.maskedinput/1.4.0/jquery.maskedinput.min
//= require bootstrap/3.3.5/bootstrap.min
//= require nicescroll-master/3.6.0/jquery.nicescroll.min
//= require jquery_ujs
//= require turbolinks

"use strict";
		
		(function($){
			$(document).ready(function() {

				var formLaun4Soon = document.querySelector('form#launching-soon'),
					submitBtn = formLaun4Soon.querySelector('.submit-btn'),

					niceScrollBox = 'body',
			 		niceScrollOptions = {
				        cursorborderradius: '0px',
				        background: 'rgba(193, 236, 255, 0.51)',
				        cursorwidth: '12px',
				        cursorwidth: '12px',
				        cursorborder: '0px solid #fff',
				        cursoropacitymin: '0.4',
				        cursoropacitymax: '1',
				        cursorcolor: '#76D6FF'
				    },

					userNameInput = '[name="user-name"]',
					userBirthdayInput = '[name="user-birthday"]',
					userCityInput = '[name="user-city"]',
					userGenderInput = '[name="user-gender"]',
					userEmailInput = '[name="user-email"]',
					userCountryInput = '[name="user-country"]',
					userDeveloperInput = '[name="user-developer"]',

			 		userName = formLaun4Soon.querySelector(userNameInput),
			 		userBirthday = formLaun4Soon.querySelector(userBirthdayInput),
			 		userCity = formLaun4Soon.querySelector(userCityInput),
			 		userGender = formLaun4Soon.querySelector(userGenderInput),
			 		userEmail = formLaun4Soon.querySelector(userEmailInput),
			 		userCountry = formLaun4Soon.querySelector(userCountryInput),
			 		userDeveloper = formLaun4Soon.querySelector(userDeveloperInput),
			 		labels = formLaun4Soon.querySelectorAll('label'),

			 		gueryMessBoxId = 'guery-message-box',

			 		loadClass = 'load',
			 		inputIncorClass = 'input-incorrect',

			 		ajaxFile = "action.php";


			 	function addClass(el, cl) {
			 		el.classList.add(cl);
			 	}

			 	function removeClass(el, cl) {
			 		el.classList.remove(cl);
			 	}

			 	function isValidEmail(email) {
				    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
				    return re.test(email);
				}

				function isNotValidForm() {

					var trouble = 0;

					if(userName.value.length < 3) {
						addClass(userName, inputIncorClass);
						trouble++;
					}

					var now = new Date(),
						today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf(),
						entrDate = new Date(userBirthday.value).valueOf();

					if ( isNaN(entrDate) || today <= entrDate) {
						addClass(userBirthday, inputIncorClass);
						trouble++;
					}

					if( !isValidEmail(userEmail.value) ) {
						addClass(userEmail, inputIncorClass);
						trouble++;
					}

					if(userCity.value.length < 3) {
						addClass(userCity, inputIncorClass);
						trouble++;
					}

					if(userCountry.value.length < 3) {
						addClass(userCountry, inputIncorClass);
						trouble++;
					}

					if(userGender.value == 'noset') {
						addClass(userGender, inputIncorClass);
						trouble++;
					}

					return trouble === 0 ? false: true;
				}

				function createDataObject() {
					return {
						"user-name": 	userName.value,
						"user-birthday": new Date(userBirthday.value).getTime() / 1000,
						"user-city": 	userCity.value,
						"user-gender": userGender.value,
						"user-country": userCountry.value,
						"user-email": userEmail.value,
					};
				}

				function showAjaxMess(data) {

					var responseData = JSON.parse(data);

                    $('body').append("<div id='" + gueryMessBoxId + "' class='" + responseData['responseClass'] +
                    	"'><p>" + responseData['responseText'] + "</p></div>");

                    removeClass(submitBtn, loadClass);
                    $('#' + gueryMessBoxId).slideDown();
				}

				$(niceScrollBox).niceScroll(niceScrollOptions);

				$(userBirthday).mask("99.99.9999", {placeholder:"mm.dd.yyyy"});
				$("#user-phone").mask("+38 (099) 999 99 99", {placeholder:"+38 (0__) ___ __ __"});

				$(document).on('click', labels, function(){
					if(this.querySelector('.'+inputIncorClass) ) {
						this.querySelector('.'+inputIncorClass).classList.remove(inputIncorClass);
					}
				});

				$(document).on("change keyup input click", userNameInput+', '+userCityInput+', '+userCountryInput, function() {
				    if (this.value.match(/[^A-z ]/g)) {
				        this.value = this.value.replace(/[^A-z ]/g, '');
				    }
				});

				$(document).on("change", userDeveloperInput, function() {
					var val = this.value.toLowerCase();
					$('.skills-' + val ).fadeIn(800);
					$('.skills-section:not(.skills-' + val +')').fadeOut(300);
				});

                $(document).on('click', '#'+gueryMessBoxId , function(){
            		$(this).slideUp(400, function(){
		            	this.classList.contains('success') ? window.location = window.location.href : this.remove();
            		});
            	});

				$(formLaun4Soon).submit(function() {

					if( isNotValidForm() ) return false;

					submitBtn.classList.add(loadClass);

					$.ajax({  
		                url: ajaxFile,
						type: "POST",
						data : { 
							"formOperation" : createDataObject()
						},
						success: function(data, html){
							showAjaxMess(data);
		                }
		            });

		            return false;
		        });
			});
		})(window.jQuery);

		(function($){
			$(document).ready(function() {
			// File Preload

				if (window.FileReader === undefined) {
			       alert("Your browser doesn't support FileReader!!!")
			    } else {

				  var reader;
				  var progress = document.querySelector('.percent'),

				    userPhotoId = 'user-photo-preview',
				    userPhotoEl = document.getElementById(userPhotoId),

				    maxWidth  = 1024,
				    maxHeight = 768,
				    maxSize   = 5242880; // 2 Mega bytes

					function errorHandler(evt) {
					    switch(evt.target.error.code) {
					      case evt.target.error.NOT_FOUND_ERR:
					        alert('File Not Found!');
					        break;
					      case evt.target.error.NOT_READABLE_ERR:
					        alert('File is not readable');
					        break;
					      case evt.target.error.ABORT_ERR:
					        break; // noop
					      default:
					        alert('An error occurred reading this file.');
					    };
					    document.getElementById('user-photo-head').innerText = 'Змінити фото';
					}

					function updateProgress(evt) {
						// evt is an ProgressEvent.
					    if (evt.lengthComputable) {
					      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
					      // Increase the progress bar length.
					      if (percentLoaded < 100) {
					        progress.style.width = percentLoaded + '%';
					        progress.textContent = percentLoaded + '%';
					      }
					    }
					}

					function errMsg(x) {
				        alert('Error ' + x);
				        prev.src = '';
				        input.value = '';
				    }


					function handleFileSelect(evt) {

						    console.log(evt.target.files[0]);

						if( evt.target.files[0].type.indexOf('image') === -1  ) {
							console.log('is no image');
							return false;
						}

						if( evt.target.files[0].size /*> maxSize*/  ) {
							console.log('> 5 Mb');
							/*return false;*/
						} else {
						    console.log('Type: ' + evt.target.files[0].type );
						    console.log('Size: ' + evt.target.files[0].size );
						}

					    console.log('--------------');


					    // Reset progress indicator on new file selection.
					    progress.style.width = '0%';
					    progress.textContent = '0%';

					    reader = new FileReader();
					    reader.onerror = errorHandler;
					    reader.onprogress = updateProgress;
					    reader.onabort = function(e) {
					        alert('File read cancelled');
					    	document.getElementById('user-photo-head').innerText = 'Завантажити фото';
					    };
					    reader.onloadstart = function(e) {
					      document.getElementById('progress-bar').className = 'loading';
					      document.getElementById('user-photo-head').classList.add('loading');
					    };
					    reader.onload = (function (e, file, data) {
						    // Ensure that the progress bar displays 100% at the end.
						    progress.style.width = '100%';
						    progress.textContent = '100%';

						    setTimeout(function(){
						    	document.getElementById('user-preview-img').classList.remove('loading');
						    }, 5);

						    setTimeout(function(){
						    	document.getElementById('user-photo-head').innerText = 'Змінити фото';
						    	document.getElementById('progress-bar').className='';
						    }, 1000);

						    setTimeout(function(){
					      		document.getElementById('user-photo-head').classList.remove('loading');
						    }, 1500);

			                var img = new Image();
			                img.src = reader.result;
			                img.id = "user-preview-img";
			                img.className = "preview-img loading";

			                img.width < img.height ? userPhotoEl.classList.add('vertical') : userPhotoEl.classList.remove('vertical');

			                $('#'+userPhotoId).html('');
			                $('#'+userPhotoId).append(img);
						});

					    // Read in the image file as a binary string.
					    reader.readAsDataURL(evt.target.files[0]);
					}

					document.getElementById('user-photo').addEventListener('change', handleFileSelect, false);

			    }
		    });
		})(window.jQuery);
