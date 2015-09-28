$(document).ready(function() {
	var csv;
		$.ajax({
	    url: "pathto/filename.csv",
	    async: false,
	    success: function (csvd) {
	        csv = $.csv.toArray(csvd);
	    },
	    dataType: "text",
	    complete: function () {
	        console.log(csv);
	    }
	});
});