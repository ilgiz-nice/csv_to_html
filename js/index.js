jQuery.fn.extend({
  csvParse: function(path, file) {
  	var path = path;
  	var file = file;
  	Papa.parse(file, {
		download: true,
		header: true,
		complete: function(object) {
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
		$('<div></div>').appendTo(path);
		for (var i = 0; i < level1.length; i++) {
			if (level1[i] != "" && level1[i] != undefined) {
				var id = 'ac-'+i;
				var name = 'accordion-1';
				$('<input id="'+id+'" name="'+name+'" type="radio"><label for="'+id+'">'+level1[i]+'</label><article class="ac-medium" data-level1="'+level1[i]+'"></article>').appendTo(path + ' > div');
				//2 level
				$.each(object.data, function (index, item) {
					if (item.level1 == level1[i] && $.inArray(item.level2, level2) == -1) {
						level2.push(item.level2);
						var id = 'ac-'+i+'-'+index;
						var name = 'accordion-2';
						$('<input id="'+id+'" name="'+name+'" type="radio" /><label for="'+id+'">'+item.level2+'</label><article class="ac-small" data-level2="'+item.level2+'"></article>').appendTo(path + ' > div > .ac-medium:last-child');
					}
				});
			}
		}
		//table
		for (var i = 0; i < level1.length; i++) {
			if (level1[i] != "" && level1[i] != undefined) {
				var el;
				for (var j = 0; j < level2.length; j++) {
					if (level2[j] != "" && level2[j] != undefined) {
						var el = $(path + ' article[data-level1='+level1[i]+'] article[data-level2='+level2[j]+']');
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
  }
});

$(document).csvParse('#csv_to_html', '/csv.csv');