/**
 * 
 */
(function ($) {
	$('#swal1').click(function(){
		swal("Hello world!");
	});
	$('#swal2').click(function(){
		swal("Here's the title!", "...and here's the text!");
	});
	$('#swal3').click(function(){
		swal("Good job!", "You clicked the button!", "success");
	});
	$('#swal4').click(function(){
		swal("warning alert", "You clicked the button!", "warning");
	});
	$('#swal5').click(function(){
		swal("error alert", "You clicked the button!", "error");
	});
	$('#swal6').click(function(){
		swal("info alert", "You clicked the button!", "info");
	});
	$('#swal7').click(function(){
		swal("Click on either the button or outside the modal.")
		.then((value) => {
		  swal(`The returned value is: ${value}`);
		});
	});
	$('#swal8').click(function(){
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this imaginary file!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				swal("Poof! Your imaginary file has been deleted!", {
				icon: "success",
				});
			} else {
				swal("Your imaginary file is safe!");
			}
		});
	});
	$('#swal9').click(function(){
		swal({
			title: '회원가입',
			text: '회원가입을 진행하시겠습니까?',
			buttons: {
				done: {
				    text: '취소',
				    value: false,
				    visible: true,
				    className: "done",
				    closeModal: true,
				},
				next: {
				    text: '진행',
				    value: true,
				    visible: true,
				    className: "next",
				    closeModal: false,
				},
			},
			closeOnClickOutside: false,
			closeOnEsc: false,
		})
		.then((value) => {
			if (value) {

			}
		});
	});
	
}(jQuery));
// End ready