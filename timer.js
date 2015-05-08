var timerInterval;
var currentTime;
var initialTime;
var alertOne;
var alertTwo;
var alertThree;
var alertSound;
var completeSound;
var showingOptions;
var validate;

$(document).ready(InitializePage);

function InitializePage() {
	$("#startButton").click(StartTimer);
	$("#stopButton").click(StopTimer);
	$("#resetButton").click(ResetTimer);
	$("#clearButton").click(clearTimer);
	$("#setTimer").click(SetTimer);
	$("#showOptions").click(ToggleTimerOptions);
	$("#helpWindow").click(HelpWindow);
	$("[id=alertPreview]").click(AlertPreview);
	$("#completePreview").click(CompletePreview);
	//$("[id*='options-']").change(ValidateTimer);

	$("#resetButton").prop("disabled", true);
	$("#startButton").prop("disabled", true);
	$("#stopButton").prop("disabled", true);
	$("#clearButton").prop("disabled", true);

	$("#timerField").text("00:00:00");

	$("#errorMessage").hide();

	alertSound = new Audio('alert.mp3');
	completeSound = new Audio('complete.mp3');

	showingOptions = false;
	validate = true;		

	var allInputs = $(":input");
    $(allInputs).attr('autocomplete', 'off');
}

function StartTimer() { // Start timer from set time
	$("#resetButton").prop("disabled", true);
	$("#startButton").prop("disabled", true);
	$("#stopButton").prop("disabled", false);
	$("[id*='options-']").prop("disabled", true);
	$("#setTimer").prop("disabled", true);
	$("#clearButton").prop("disabled",true);
	timerInterval = setInterval(Timer, 1000);
}

function StopTimer() { // Stop timer at current time
	if(currentTime==0){
		$("#startButton").prop("disabled", true);
	}
	else{
		$("#startButton").prop("disabled", false);
	}

	$("#resetButton").prop("disabled", false);	
	$("#stopButton").prop("disabled", true);
	$("[id*='options-']").prop("disabled", false);
	$("#setTimer").prop("disabled", false);
	$("#clearButton").prop("disabled",false);
	clearInterval(timerInterval);
}

function ResetTimer() { // Reset timer to default time
	$("#resetButton").prop("disabled", true);
	$("#startButton").prop("disabled", false);
	currentTime = initialTime;

	clearInterval(timerInterval);

	SetTimerField();
}

function SetTimer() { // Reads inputs, validates inputs, and set timer
	$("#errorMessage").hide();
	resetColors();		
	clearValues(); 
	$("#clearButton").prop("disabled", false);

	var timerH = parseInt($("#options-timerHours").val());
	var timerM = parseInt($("#options-timerMins").val());
	var a1H = parseInt($("#options-alert1Hours").val());
	var a1M = parseInt($("#options-alert1Mins").val());
	var a2H = parseInt($("#options-alert2Hours").val());
	var a2M = parseInt($("#options-alert2Mins").val());
	var a3H = parseInt($("#options-alert3Hours").val());
	var a3M = parseInt($("#options-alert3Mins").val());



	
	


	//Set TIMER

/*	if($("#options-timerHours").val().search(/./) == -1 && $("#options-timerMins").val().search(/./) == -1){
		errorMessage("Please enter a time value");
		document.getElementById("options-timerHours").style.backgroundColor = "#FFFF99";
		document.getElementById("options-timerMins").style.backgroundColor = "#FFFF99";
		$("#startButton").prop("disabled", true);
		validate = false;
	}
	
	else if($("#options-timerHours").val().search(/\d{1,2}/) == -1){  //if input contains no numbers
		errorMessage("Please enter numerical value for SetTimer hours");
		document.getElementById("options-timerHours").style.backgroundColor = "#FFFF99";
		$("#startButton").prop("disabled", true);
		validate = false;
	}
	else if($("#options-timerMins").val().search(/\d{1,2}/) == -1){  //if input contains no numbers
		errorMessage("Please enter numerical value for SetTimer minutes");
		document.getElementById("options-timerMins").style.backgroundColor = "#FFFF99";
		$("#startButton").prop("disabled", true);
		validate = false;
	}
*/

	if($("#options-timerHours").val().search(/./) == -1){
		if($("#options-timerMins").val().search(/./) == -1){
			//both inputs are blank
			errorMessage("Please enter a time value");
			document.getElementById("options-timerHours").style.backgroundColor = "#FFFF99";
			document.getElementById("options-timerMins").style.backgroundColor = "#FFFF99";
			$("#startButton").prop("disabled", true);
			validate = false;
		}
		else{
			//hours input is blank, mins input has value
			if($("#options-timerMins").val().search(/\D/) != -1){  //if contains characters other than digits
				errorMessage("Please enter numerical value for SetTimer minutes");
				document.getElementById("options-timerMins").style.backgroundColor = "#FFFF99";
				$("#startButton").prop("disabled", true);
				validate = false;
			}
			else{
				initialTime = timerM*60;
			}
		}
	}
	else{
		//hours input has value 
		if($("#options-timerHours").val().search(/\D/) != -1){  //if contains characters other than digits
			errorMessage("Please enter numerical value for SetTimer hours");
			document.getElementById("options-timerHours").style.backgroundColor = "#FFFF99";
			$("#startButton").prop("disabled", true);
			validate = false;
		}
		else{
			initialTime = timerH*3600;
			if($("#options-timerMins").val().search(/./) != -1){
				//hours and mins input has value 
				if($("#options-timerMins").val().search(/\D/) != -1){  //if contains characters other than digits
					errorMessage("Please enter numerical value for SetTimer minutes");
					document.getElementById("options-timerMins").style.backgroundColor = "#FFFF99";
					$("#startButton").prop("disabled", true);
					validate = false;
				}
				else{
					initialTime += timerM*60;
				}
			}
		}
	}




/*	if(hours is blank){
		if(mins is blank){
			both values are blank
		}
		else{
			hours is blank, mins has value
			validate mins input 
		}
	}
	else{
		hours has value
		validate hours input
		if(mins has value){
			validate mins input 
		}
	}*/


/*
	if(isNaN(timerH) && !isNaN(timerM)){
		if(timerM<=0){
			errorMessage("SetTimer value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-timerMins").style.backgroundColor = "#FFFF99";
			validate = false;
		}
		else{
			initialTime = timerM*60;
		}
	}
	else if(!isNaN(timerH) && isNaN(timerM)){
		if(timerH<=0){
			errorMessage("SetTimer value should be greater than zero");
			document.getElementById("options-timerHours").style.backgroundColor = "#FFFF99";
			$("#startButton").prop("disabled", true);
			validate = false;
		}
		else{
			initialTime = timerH*3600;
		}
	}

	else if(!isNaN(timerH) && !isNaN(timerM)){
		if(timerH<=0 && timerM<=0){
			errorMessage("SetTimer value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-timerMins").style.backgroundColor = "#FFFF99";
			document.getElementById("options-timerHours").style.backgroundColor = "#FFFF99";
			validate = false;
		}
		else{
			initialTime = timerH*3600 + timerM*60;
		}
	}
	else if(isNaN(timerH) && isNaN(timerM)){
		errorMessage("Please enter a time value");
		$("#startButton").prop("disabled", true);		
		document.getElementById("options-timerMins").style.backgroundColor = "#FFFF99";
		document.getElementById("options-timerHours").style.backgroundColor = "#FFFF99";
		validate = false;
	}
*/
	
		currentTime = initialTime;
	
	
/*
	//Set ALERT 1
	if(isNaN(a1H) && !isNaN(a1M)){
		if(a1M<=0){
			errorMessage("AlertOne value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-alert1Mins").style.backgroundColor = "#FFFF99";
			validate = false;

		}
		else{
			alertOne = a1M*60;
		}
	}
	else if(!isNaN(a1H) && isNaN(a1M)){
		if(a1H<=0){
			errorMessage("AlertOne value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-alert1Hours").style.backgroundColor = "#FFFF99";
			validate = false;


		}
		else{
			alertOne = a1H*3600;
		}
	}

	else if(!isNaN(a1H) && !isNaN(a1M)){
		if(a1H<=0 && a1M<=0){
			errorMessage("AlertOne value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-alert1Mins").style.backgroundColor = "#FFFF99";
			document.getElementById("options-alert1Hours").style.backgroundColor = "#FFFF99";
			validate = false;


		}
		else{
			alertOne = a1H*3600 + a1M*60;
		}
	}

*/
/*
	//Set ALERT 2
	if(isNaN(a2H) && !isNaN(a2M)){
		if(a2M<=0){
			errorMessage("AlertTwo value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-alert2Mins").style.backgroundColor = "#FFFF99";
			validate = false;
		}
		else{
			alertTwo = a2M*60;
		}
	}
	else if(!isNaN(a2H) && isNaN(a2M)){
		if(a2H<=0){
			errorMessage("AlertTwo value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-alert2Hours").style.backgroundColor = "#FFFF99";
			validate = false;
		}
		else{
			alertTwo = a2H*3600;
		}
	}

	else if(!isNaN(a2H) && !isNaN(a2M)){
		if(a2H<=0 && a2M<=0){
			errorMessage("AlertTwo value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-alert2Mins").style.backgroundColor = "#FFFF99";
			document.getElementById("options-alert2Hours").style.backgroundColor = "#FFFF99";
			validate = false;
		}
		else{
			alertTwo = a2H*3600 + a2M*60;
		}
	}

	*/
/*
		//Set ALERT 3
	if(isNaN(a3H) && !isNaN(a3M)){
		if(a3M<=0){
			errorMessage("AlertThree value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-alert3Mins").style.backgroundColor = "#FFFF99";
			validate = false;
		}
		else{
			alertThree = a3M*60;
		}
	}
	else if(!isNaN(a3H) && isNaN(a3M)){
		if(a3H<=0){
			errorMessage("AlertThree value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-alert3Hours").style.backgroundColor = "#FFFF99";
			validate = false;
		}
		else{
			alertThree = a3H*3600;
		}
	}

	else if(!isNaN(a3H) && !isNaN(a3M)){
		if(a3H<=0 && a3M<=0){
			errorMessage("AlertThree value should be greater than zero");
			$("#startButton").prop("disabled", true);
			document.getElementById("options-alert3Mins").style.backgroundColor = "#FFFF99";
			document.getElementById("options-alert3Hours").style.backgroundColor = "#FFFF99";
			validate = false;
		}
		else{
			alertThree = a3H*3600 + a3M*60;
		}
	}

*/

/*
	//check if timer value and alert values are in descending order
	if(initialTime <= 0){
		//errorMessage("SetTimer value should be greater than zero");
		document.getElementById("options-timerMins").style.backgroundColor = "#FFFF99";
		document.getElementById("options-timerHours").style.backgroundColor = "#FFFF99";
		$("#startButton").prop("disabled", true);
		SetTimerField();
		validate = false;
	}	
	else if(initialTime <= alertOne){
		errorMessage("SetTimer value should be greater than AlertOne value");
		$("#startButton").prop("disabled", true);
		document.getElementById("options-timerMins").style.backgroundColor = "#FFFF99";
		document.getElementById("options-timerHours").style.backgroundColor = "#FFFF99";
		validate = false;
	}
	else if(alertOne <= alertTwo && alertOne>0 && alertTwo>0){
		errorMessage("AlertOne value should be greater than AlertTwo value");
		$("#startButton").prop("disabled", true);
		document.getElementById("options-alert1Mins").style.backgroundColor = "#FFFF99";
		document.getElementById("options-alert1Hours").style.backgroundColor = "#FFFF99";
		validate = false;
	}
	else if(alertTwo <= alertThree && alertTwo>0 && alertThree>0){
		errorMessage("AlertTwo value should be greater than AlertThree value");
		$("#startButton").prop("disabled", true);
		document.getElementById("options-alert2Mins").style.backgroundColor = "#FFFF99";
		document.getElementById("options-alert2Hours").style.backgroundColor = "#FFFF99";
		validate = false;
	}

	
	*/


	//if all inputs are validated then enable start button
	if(validate==true){
		$("#stopButton").prop("disabled", true);
		$("#resetButton").prop("disabled", true);
		$("#startButton").prop("disabled", false);
		SetTimerField();
		ToggleTimerOptions();
	}
	else{
		validate = true;
	}



}

/*function ValidateTimer() { // Validate timer fields and reset if necesarry
	
	if(event.target.id == "options-completeSound" || event.target.id == "options-alert1Sound"
		|| event.target.id == "options-alert2Sound" || event.target.id == "options-alert3Sound"){
		//don't alert if unchecking sound box when no timer values are entered yet
	}

	else if(isNaN(event.target.value)) {
		
		errorMessage("Please enter a valid number");	
		event.target.value = "";	
	}

}
*/


function ToggleTimerOptions() { // Toggle timerOptions divs
	$("[id=timerOptions]").toggle();
	
	showingOptions = !showingOptions;
	if(!showingOptions) {
		$("#showOptions").html("&#x25B6; SET TIMER");	
	}
	else {
		$("#showOptions").html("&#x25BC; SET TIMER");
	}

	if(currentTime == 0) ResetTimer();

	$("#errorMessage").hide();
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

function resetColors() {  //resets background color of text boxes
	document.getElementById("options-timerMins").style.backgroundColor = "white";
	document.getElementById("options-timerHours").style.backgroundColor = "white";
	document.getElementById("options-alert1Mins").style.backgroundColor = "white";
	document.getElementById("options-alert1Hours").style.backgroundColor = "white";
	document.getElementById("options-alert2Mins").style.backgroundColor = "white";
	document.getElementById("options-alert2Hours").style.backgroundColor = "white";
	document.getElementById("options-alert3Mins").style.backgroundColor = "white";
	document.getElementById("options-alert3Hours").style.backgroundColor = "white";
}

function errorColor(errorId) { //set background color for error 
	document.getElementById("errorId").style.backgroundColor = "#FFFF99";
}

function clearValues() {  //clear current time values on backend 
	currentTime = 0;
	initialTime = 0;
	alertOne = 0;
	alertTwo = 0;
	alertThree = 0;
}

function clearTimer() {  //clear front end and back end timer values, when user clicks clear button

	clearValues();
	resetColors();
	$("#errorMessage").hide();

	document.getElementById("options-timerMins").value = "";
	document.getElementById("options-timerHours").value = "";
	document.getElementById("options-alert1Mins").value = "";
	document.getElementById("options-alert1Hours").value = "";
	document.getElementById("options-alert2Mins").value = "";
	document.getElementById("options-alert2Hours").value = "";
	document.getElementById("options-alert3Mins").value = "";
	document.getElementById("options-alert3Hours").value = "";

	ResetTimer();
	$("#startButton").prop("disabled",true);
	$("#clearButton").prop("disabled",true);

}

function HelpWindow() {  //displays help window when "help" link clicked
	var helpWindow = window.open("Help.html", "timerHelp", "width=500,height=400,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes");
}

function isInteger(x) {
    var a = x.indexOf(".");
    if(n == -1){ 
    	return true;
    }
    else{
    	return false;
    }
}