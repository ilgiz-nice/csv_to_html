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
		var level2 = [];
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
			if (level1[i] != "" && level1[i] != undefined) {
				var id = 'ac-'+i;
				var name = 'accordion-1';
				console.log(id);
				$('<input id="'+id+'" name="'+name+'" type="radio"><label for="'+id+'">'+level1[i]+'</label><article class="ac-medium" data-level1="'+level1[i]+'"></article>').appendTo('#csv_to_html > div');
				//2 level
				$.each(object.data, function (index, item) {
					if (item.level1 == level1[i] && $.inArray(item.level2, level2) == -1) {
						level2.push(item.level2);
						var id = 'ac-'+i+'-'+index;
						var name = 'accordion-2';
						$('<input id="'+id+'" name="'+name+'" type="radio" /><label for="'+id+'">'+item.level2+'</label><article class="ac-small" data-level2="'+item.level2+'"></article>').appendTo('#csv_to_html > div > .ac-medium:last-child');
					}
				});
			}
		}
		//table
		console.log(level2);
		for (var i = 0; i < level1.length; i++) {
			if (level1[i] != "" && level1[i] != undefined) {
				var el;
				for (var j = 0; j < level2.length; j++) {
					if (level2[j] != "" && level2[j] != undefined) {
						console.log(level1[i]+'_'+level2[j]);
						var el = $('#csv_to_html article[data-level1='+level1[i]+'] article[data-level2='+level2[j]+']');
						var string = '<table><thead><tr><td>Название</td><td>Описание</td><td>Цена</td></tr></thead><tbody>';
						$.each(object.data, function (index, item) {
							if (item.level1 == level1[i] && item.level2 == level2[j]) {
								string += '<tr><td>'+item.name+'</td><td>'+item.description+'</td><td>'+item.price+'</td></tr>';
							}
						});
						string += '</tbody></table>';
						$(el).append(string);
					}
				}
			}
		}
	}
});
