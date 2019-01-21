$(document).ready(function() {
  Particles.init({
    selector: '.background',
    maxParticles: 100,
    connectParticles: true,
    color: '#ffffff',

    responsive: [
    {
    	breakpoint: 940,
    	options: {
    		maxParticles: 100
    	}
    }, {
    	breakpoint: 768,
    	options: {
    		maxParticles: 30
    	}
    }]
  });
});

function openWindow(elem) {
	var elem = document.getElementById(elem);
	elem.style.display = "flex";
}

function animateOnClick(elem, type, animation) {
	elem.classList.add(type, animation);
	
	setTimeout(function() {
		elem.classList.remove(type, animation);
	}, 1000);
}

function show(classHide, classShow) {
	var classShow = document.querySelector(classShow);
	classShow.style.display = "flex";
	classHide.style.display = "none";
}

function hide(classHide, classShow) {
	var classHide = document.querySelector(classHide);
	var classShow = document.querySelector(classShow);
	classHide.style.display = "none";
	classShow.style.display = "flex";
}

$(document).ready(function() {
	var input = document.getElementById("phone");
    window.intlTelInput(input, {
      allowExtensions: true,
      preventInvalidNumbers: true,
      nationalMode: false,
      geoIpLookup: function(callback) {
         $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
           var countryCode = (resp && resp.country) ? resp.country : "";
           callback(countryCode);
         });
       },
      initialCountry: "auto",
      placeholderNumberType: "MOBILE",
      preferredCountries: ['ua', 'us'],
      utilsScript: "../app/js/utils.js",
    });
  });

$(document).on("click", "#play-btn", function() {
	var video = $("#player");
	var src = video.attr("src");
	video.attr("src", src + "&autoplay=1");
});

$('#formMain, #formConsultation').validate({
	rules: {
		name: "required",
		phone: "required",
		email: {
			required: true,
			email: true
		}
	},
	focusCleanup: true,
	focusInvalid: false
});

$(document).ready(function() {
	$("#formConsultation").submit(function() {
		var form = $(this);
		$.ajax({
			type: "POST",
			url: "../../consultation.php",
			data: form.serialize()
		}).done(function(response) {
			setTimeout(function() {
	    	form.trigger("reset");
	    }, 500);
		});
		return false;
	});
});

$(document).ready(function() {
	$("#formMain").submit(function() {
		var form = $(this);
		$.ajax({
			type: "POST",
			url: "../../send.php",
			data: form.serialize()
		}).done(function(response) {
			if(!form.valid()) return false;
			var id = document.getElementById("messegeResult");
			id.style.display = "flex";
	    id.innerHTML = response;
	    setTimeout(function() {
	    	form.trigger("reset");
	    }, 500);
		});
		return false;
	});
});

$(document).ready(function() {
	$(".benefits-description .benefits-text").hide().prev().click(function() {
		$(".benefits-description .benefits-text").not(this).slideUp();

		if ($(this).hasClass("active")) {
				$(this).toggleClass("active");
			} else {
				$(".benefits-title").removeClass("active");
				$(this).toggleClass("active");
			}

		$(this).next().not(":visible").slideDown();
	})
});

$(document).mouseup(function(elem) {
	var block = $(".block");
	var overlayer = $(".overlayer");
	var playerWindow = $("#playerWindow");
	var messageResult = $("#messegeResult");

	if (!block.is(elem.target) && block.has(elem.target).length === 0) {
		if (playerWindow) {
			overlayer.fadeOut();
			var player = $("#player").prop("src");
			player = player.replace("&autoplay=1", "");
			$("#player").prop("src", "");
			$("#player").prop("src", player);
		}

		if (messageResult) {
			messageResult.delay(3000).fadeOut();
		}
	}
});