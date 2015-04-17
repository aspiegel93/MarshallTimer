var timerInterval;
var currentTime;
var initialTime;
var alertOne;
var alertTwo;
var alertThree;
var alertSound;
var completeSound;
var showingOptions;

$(document).ready(InitializePage);

function InitializePage() {
	$("#startButton").click(StartTimer);
	$("#stopButton").click(StopTimer);
	$("#resetButton").click(ResetTimer);
	$("#setTimer").click(SetTimer);
	$("#showOptions").click(ToggleTimerOptions);
	$("[id=alertPreview]").click(AlertPreview);
	$("#completePreview").click(CompletePreview);
	$("[id*='options-']").change(ValidateTimer);

	$("#resetButton").prop("disabled", true);
	$("#startButton").prop("disabled", true);
	$("#stopButton").prop("disabled", true);

	$("#timerField").text("00:00:00");

	$("#errorMessage").hide();

	alertSound = new Audio('alert.mp3');
	completeSound = new Audio('complete.mp3');

	showingOptions = false;

	var allInputs = $(":input");
    $(allInputs).attr('autocomplete', 'off');
}

function StartTimer() { // Start timer from set time
	$("#resetButton").prop("disabled", true);
	$("#startButton").prop("disabled", true);
	$("#stopButton").prop("disabled", false);
	$("[id*='options-']").prop("disabled", true);

	timerInterval = setInterval(Timer, 1000);
}

function StopTimer() { // Stop timer at current time
	$("#resetButton").prop("disabled", false);
	$("#startButton").prop("disabled", false);
	$("#stopButton").prop("disabled", true);
	$("[id*='options-']").prop("disabled", false);
	
	clearInterval(timerInterval);
}

function ResetTimer() { // Reset timer to default time
	$("#resetButton").prop("disabled", true);
	currentTime = initialTime;

	clearInterval(timerInterval);

	SetTimerField();
}

function SetTimer() { // Read inputs and set timer
	$("#errorMessage").hide();
		
	/* Set time */
	initialTime = parseInt($("#options-timerHours").val()) * 3600;
	if(isNaN(initialTime)) { // If timerHours is blank
		initialTime = 0;
	}
	if(!isNaN(parseInt($("#options-timerMins").val()) * 60)) { // If timerMins is not blank
		initialTime += parseInt($("#options-timerMins").val()) * 60;
	}
	currentTime = initialTime;

	/* Set alert one */
	alertOne = parseInt($("#options-alert1Hours").val()) * 3600;
	if(isNaN(alertOne)) { // If alert1Hours is blank
		alertOne = 0;
	}
	if(!isNaN(parseInt($("#options-alert1Mins").val()) * 60)) { // If alert1Mins is not blank
		alertOne += parseInt($("#options-alert1Mins").val()) * 60;
	}

	/* Set alert two */
	alertTwo = parseInt($("#options-alert2Hours").val()) * 3600;
	if(isNaN(alertTwo)) { // If alert2Hours is blank
		alertTwo = 0;
	}
	if(!isNaN(parseInt($("#options-alert2Mins").val()) * 60)) { // If alert2Mins is not blank
		alertTwo += parseInt($("#options-alert2Mins").val()) * 60;
	}

	/* Set alert three */
	alertThree = parseInt($("#options-alert3Hours").val()) * 3600;
	if(isNaN(alertThree)) { // If alert3Hours is blank
		alertThree = 0;
	}
	if(!isNaN(parseInt($("#options-alert3Mins").val()) * 60)) { // If alert3Mins is not blank
		alertThree += parseInt($("#options-alert3Mins").val()) * 60;
	}


	//check if timer value and alert values are in descending order
	if(initialTime == 0){
		//alert("Please enter a time value");
		errorMessage("Please enter a time value");
		$("#startButton").prop("disabled", true);
		SetTimerField();
	}	
	else if(initialTime <= alertOne){
		errorMessage("Timer value must be greater than Alert 1 value");
		$("#startButton").prop("disabled", true);
	}
	else if(alertOne <= alertTwo && alertOne!=0 && alertTwo!=0){
		errorMessage("Alert 1 value must be greater than Alert 2 value");
		$("#startButton").prop("disabled", true);
	}
	else if(alertTwo <= alertThree && alertTwo!=0 && alertThree!=0){
		errorMessage("Alert 2 value must be greater than Alert 3 value");
		$("#startButton").prop("disabled", true);
	}
	else{
		$("#stopButton").prop("disabled", true);
		$("#resetButton").prop("disabled", true);
		$("#startButton").prop("disabled", false);
		SetTimerField();
		ToggleTimerOptions();
	}

	
	

}

function ValidateTimer() { // Validate timer fields and reset if necesarry
	
	if(event.target.id == "options-completeSound" || event.target.id == "options-alert1Sound"
		|| event.target.id == "options-alert2Sound" || event.target.id == "options-alert3Sound"){
		//don't alert if unchecking sound box when no timer values are entered yet
	}

	else if(isNaN(event.target.value)) {
		
		errorMessage("Please enter a valid number");	
		event.target.value = "";	
	}

	var hours = parseInt($("#options-timerHours").val());
	var minutes = parseInt($("#options-timerMins").val());

	var a1hours = document.getElementById("options-alert1Hours").value;
	var a1mins = document.getElementById("options-alert1Mins").value;

	var a2hours = document.getElementById("options-alert2Hours").value;
	var a2mins = document.getElementById("options-alert2Mins").value;

	var a3hours = document.getElementById("options-alert3Hours").value;
	var a3mins = document.getElementById("options-alert3Mins").value;


	if(hours==0 && minutes==0){
		errorMessage("Must enter time value greater than zero");
		document.getElementById("options-timerHours").value = "";
		document.getElementById("options-timerMins").value = "";
		initialTime = 0;
		ResetTimer();
	}

	if(a1hours=="0" && a1mins=="0"){
		errorMessage("Must enter alert value greater than zero");
		document.getElementById("options-alert1Hours").value = "";
		document.getElementById("options-alert1Mins").value = "";
		$("#startButton").prop("disabled", true);
	}

	if(a2hours=="0" && a2mins=="0"){
		errorMessage("Must enter alert value greater than zero");
		document.getElementById("options-alert2Hours").value = "";
		document.getElementById("options-alert2Mins").value = "";
		$("#startButton").prop("disabled", true);
	}

	if(a3hours=="0" && a3mins=="0"){
		errorMessage("Must enter alert value greater than zero");
		document.getElementById("options-alert3Hours").value = "";
		document.getElementById("options-alert3Mins").value = "";
		$("#startButton").prop("disabled", true);
	}


}

function ToggleTimerOptions() { // Toggle timerOptions divs
	$("[id=timerOptions]").toggle();
	
	showingOptions = !showingOptions;
	if(!showingOptions) $("#showOptions").html("&#x25B6; SET TIMER");
	else $("#showOptions").html("&#x25BC; SET TIMER");

	if(currentTime == 0) ResetTimer();
}

function SetTimerField() { // Set timer field to current time
	var hour = PadNumber(((currentTime - (currentTime % 3600)) / 3600));
	var minute = PadNumber(((currentTime - (currentTime % 60)) / 60) - ((currentTime - (currentTime % 3600)) / 60));
	var second = PadNumber(currentTime % 60);

	$("#timerField").text( hour.toString() + ":" + minute.toString() + ":" + second.toString());
}

function SetAlertBanner() {
	var hour = ((currentTime - (currentTime % 3600)) / 3600);
	var minute = ((currentTime - (currentTime % 60)) / 60) - ((currentTime - (currentTime % 3600)) / 60);

	/* SET ALERT TEXT */
	var minuteString = null;
	var hourString = null;
	if(minute == 1) minuteString = " Minute ";
	if(minute > 1) minuteString = " Minutes ";
	if(hour == 1) hourString = " Hour ";
	if(hour > 1) hourString = " Hours ";

	if(hourString != null && minuteString != null) { // If there are hours and minutes remaining
		$("#alertBanner").text(hour.toString() + hourString + minute.toString() + minuteString + "Remaining!");
	}
	else if (hourString != null && minuteString == null) { // If there are only hours remaining
		$("#alertBanner").text(hour.toString() + hourString + "Remaining!");
	}
	else if (hourString == null && minuteString != null) { // If there are only minutes remaining
		$("#alertBanner").text(minute.toString() + minuteString + "Remaining!");
	}

	$("#alertBanner").css("visibility", "visible");

	setTimeout(ClearAlertBanner, 5000);
}

function ClearAlertBanner() {
	$("#alertBanner").css("visibility", "hidden");
}

function Timer() { // Decrement and display time every second
	if (currentTime != 0) {
		currentTime--;
		SetTimerField();
		if(currentTime == alertOne && currentTime != 0) { // Show alert banner if alertOne
			SetAlertBanner();
			if($("#options-alert1Sound").prop("checked")) { // Play alert sound if checked
				alertSound.play();
			} 
		}
		if(currentTime == alertTwo && currentTime != 0) { // Show alert banner if alertTwo
			SetAlertBanner();
			if($("#options-alert2Sound").prop("checked")) { // Play alert sound if checked
				alertSound.play();
			} 
		}
		if(currentTime == alertThree && currentTime != 0) { // Show alert banner if alertThree
			SetAlertBanner();
			if($("#options-alert3Sound").prop("checked")) { // Play alert sound if checked
				alertSound.play();
			} 
		}
	}
	if (currentTime == 0) {
		if($("#options-completeSound").prop("checked")){
			completeSound.play();
		}
		$("#timerField").fadeOut(300);
		$("#timerField").text("TIME'S UP!")
		$("#timerField").fadeIn(300);
	}
}

/* UTILITY FUNCTIONS */
function PadNumber(n) { // Pad numbers < 9 with 0
    return n > 9 ? "" + n : "0" + n;
}

function AlertPreview() {
	alertSound.play();
}

function CompletePreview() {
	completeSound.play();
}

function errorMessage(errorMessageText) {
	document.getElementById("errorText").innerHTML = errorMessageText;
	$("#errorMessage").fadeIn(500);
}