var timerInterval;
var time;

$(document).ready(InitializePage);

function InitializePage() {
	$("#startButton").click(StartTimer);
	$("#stopButton").click(StopTimer);
	$("#resetButton").click(ResetTimer);

	time = 30;
}

function StartTimer() { // Start timer from set time
	$("#resetButton").prop("disabled", true);
	$("#startButton").prop("disabled", true);

	timerInterval = setInterval(Timer, 1000);
}

function StopTimer() { // Stop timer at current time
	$("#resetButton").prop("disabled", false);
	$("#startButton").prop("disabled", false);
	
	clearInterval(timerInterval);
}

function ResetTimer() { // Reset timer to default time
	$("#timerField").text("00:00:30");

	clearInterval(timerInterval);

	time = 30;
}

function Timer() { // Increment and display time every second
	if (time != 0)
	{
		time--;
		var hour = PadNumber(((time - (time % 3600)) / 3600));
		var minute = PadNumber(((time - (time % 60)) / 60));
		var second = PadNumber((time % 60));

		$("#timerField").text( hour.toString() + ":" + minute.toString() + ":" + second.toString());
	}
	else {

	}
}

/* UTILITY FUNCTIONS */
function PadNumber(n) { // Pad numbers < 9 with 0
    return n > 9 ? "" + n : "0" + n;
}