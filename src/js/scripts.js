window.onload = function() {
  Particles.init({
    selector: '.background',
    maxParticles: 100,
    connectParticles: true,
    color: '#ffffff',

    responsive: [
    {
    	breakpoint: 940,
    	options: {
    		maxParticles: 60
    	}
    }, {
    	breakpoint: 768,
    	options: {
    		maxParticles: 30
    	}
    }]
  });
};

function openWindow(elem) {
	var elem = document.getElementById(elem);
	elem.style.display = "flex";
}

function openMenu(elem, menuId) {
	var menuId = document.getElementById(menuId);
	elem.classList.toggle("change");
	menuId.classList.toggle("menu-hide");
}

function animateOnClick(elem, type, animation) {
	elem.classList.add(type, animation);
	
	setTimeout(function() {
		elem.classList.remove(type, animation);
	}, 1000);
}

$(document).mouseup(function(elem) {
	var close = $(".close");
	var overlayer = $(".overlayer");
	var mail = $(".mail");

	if (elem.target != close[0] && close.has(elem.target).length === 0) {
		if (overlayer) {
			overlayer.fadeOut();
			var player = $("#player").prop("src");
			player = player.replace("&autoplay=1", "");
			$("#player").prop("src", "");
			$("#player").prop("src", player);
		}

		if (mail) {
			mail.delay(2500).fadeOut();
		}
	}	
});

$(".close").click(function() {
	$(".overlayer").fadeOut();
});

$(document).ready(function() {
	$("#phone").mask("+38(099) 999 99 99");
});

$(document).on("click", "#play-btn", function() {
	var video = $("#player");
	var src = video.attr("src");
	video.attr("src", src + "&autoplay=1");
	
});

$(document).ready(function() {
	$("#menuNav, #menu-mobile, #arrow").on("click", "a", function(event) {
		event.preventDefault();

		var id = $(this).attr("href");
		var top = $(id).offset().top;
		var btn = $('.burger');
		var menu = $('#menu-mobile');

		$("body, html").animate({scrollTop: top},1500);
		menu.addClass('menu-hide');
		btn.removeClass('change');
	});
});

$('#formMain').validate({
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
	$("#formMain").submit(function() {
		var id = $(this);
		$.ajax({
			type: "POST",
			url: "../../send.php",
			data: id.serialize()
		}).done(function(response) {
			var resultId = document.getElementById("messegeResult");
			resultId.style.display = "flex";
	    resultId.innerHTML = response;
	    setTimeout(function() {
	    	id.trigger("reset");
	    }, 1000);
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