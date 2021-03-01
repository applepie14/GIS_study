/**
 * 
 */	
$( document ).ready(function() {

	$.ajax({
        type: "POST",
        url: "testURL",
        async: false,
        success: function (data, textStatus, jqXHR) {
			var parentNode = document.getElementById('testDiv');
        	for(var i = 0;i < data;i++){
				var createSafetyChartDiv = document.createElement('li');
				createSafetyChartDiv.innerHTML = `<input type="checkbox" class="safetyChartDiv">`;
				parentNode.appendChild(createSafetyChartDiv);
        	}
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(jqXHR.responseText);
            console.log(errorThrown);
        }
    })

	console.log($('.safetyChartDiv'));
	
});

