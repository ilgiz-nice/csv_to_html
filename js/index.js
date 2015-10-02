$(document).ready(function() {
	Papa.parse('/csv.csv', {
		download: true,
		header: true,
		complete: function(object) {
			console.log(object);
			construct(object);
		}
	});

	function construct(object) {
		var level1 = [];
		var output = [];
		//1 level
		$.each(object.data, function (index, item) {
			if ($.inArray(item.level1, level1) == -1) {
				level1.push(item.level1);
			}
		});
		//layout
		$('<div></div>').appendTo('#csv_to_html');
		for (var i = 0; i < level1.length; i++) {
			$('<input id="ac-'+i+'" name="accordion-'+i+'" type="radio" />
				<label for="ac-'+i+'">'+level1[i]+'</label>
				<article class="ac-medium"></article>').appendTo('#csv_to_html > div');
			if (level1[i] != "" && level1[i] != undefined) {
				var level2 = [];
				//2 level
				$.each(object.data, function (index, item) {
					if (item.level1 == level1[i] && $.inArray(item.level2, level2) == -1) {
						level2.push(item.level2);
						$('<input id="ac-'+i+'-'+index+'" name="accordion-'+i+'" type="radio" />
				<label for="ac-'+i+'">'+level1[i]+'</label>
						<article class="ac-small"></article>').appendTo('#csv_to_html > div > .ac-medium:last-child');
					}
				});
			}
		}
		//table
		for (var i = 0; i < level1.length; i++) {
			if (level1[i] != "" && level1[i] != undefined) {
				$.each(object.data, function (index, item) {
					$('#csv_to_html ul li#'+level1[i]+' ul li#'+item.level2).append(item.name);
				});
			}
		}
	}
});
