//start game and remove button
$(".btn-primary").on('click', function(){
	game.start()
});

//next click saves answers and repopulates questions.
$('.wrapper').on('click', '#next', function(){
	game.next()
	game.saveSelector()
});


var triviaQ = [{
	question:"What is the most visited National Park?",
	guesses:[" Grand Teton  ", " Great Smokey Mountains  ", " Yosimite  ", " Yellow Stone  "],
	answer: " Great Smokey Mountains ",
}, {
	question:"What national park has banned nearly all it's vehicles from its roads during peak season?",
	guesses:[" Zion  ", " Yosimite  ", " Joshua Tree  ", " Grand Canyon  "],
	answer: " Zion  ",
}, {
	question:"What park is the newest national park?",
	guesses:[" Big Bend  ", " Mount Rainer  ", " Great Sand Dunes  ", " Congaree  "],
	answer: " Great Sand Dunes  ",
}, {
	question:"What causes Yellowstone National Park's geothermal Morning Glory Pool to change color over the years?",
	guesses:[" Sulfur Evaporation  ", " Trash  ", "  Climate Change  ", " Bird Droppings  "],
	answer: " Trash  ",
}, {
	question:"Which of the following presidents more than doubles the acreage of the National Park System",
	guesses:[" Calvin Coolidge  ", " Richard Nixon  ", " Jimmy Carter  ", " George H.W. Bush  "],
	answer: " Jimmy Carter  ",
}, {
	question:"What is the smallest national park?",
	guesses:[" Dry Tortugas  ", " Hot Springs  ", " Petrified Forest  ", " Black Canyon of the Gunnison  "],
	answer: " Hot Springs  ",
}, {
	question:"What shape is the emblem of the National Park Service",
	guesses:[" Arrowhead  ", " Diamond  ", " Log cabin  ", " Redwood tree  "],
	answer: " Arrowhead  ",
},{
	question:"What was the first national park established east of the Mississippi River",
	guesses:[" Mammoth Cave  ", " Everglades  ", " Shenandoah  ", " Acadia  "],
	answer: " Acadia  ",
}]



var game = {

	correct: 0,
	incorrect: 0,
	counter: 100,
	time: 0,
	countdown: function(){
		game.counter--;
		$("#counter").html("<h2> Time Remaining: <span id:'counter'>" + game.counter +" </span> Seconds </h2>");
			if(game.counter<=0){
				alert("Time is up!");
				game.done();
				game.result();

		}
	},
	start: function(){
		$(".btn-primary").remove()
		time = setInterval(game.countdown, 1000);
		tQuestions = 0
		$(".wrapper").html("<h2>" + triviaQ[tQuestions].question + "</h2>");

		for(var g=0; g<triviaQ[tQuestions].guesses.length; g++) {
			$(".wrapper").append("<input type='radio' name='guesses-"+ tQuestions + "' value='"+ triviaQ[tQuestions].guesses[g] + "'/>" + triviaQ[tQuestions].guesses[g]);
		}
			$(".wrapper").append("<br> <button id='next'> Next </button>");	
	},

	next: function() {
			tQuestions++;
			$(".wrapper").html("<h2>" + triviaQ[tQuestions].question + "</h2>");
			
			for(var g=0; g<triviaQ[tQuestions].guesses.length; g++) {
				$(".wrapper").append("<input type='radio' name='guesses-"+ tQuestions + "' value='"+ triviaQ[tQuestions].guesses[g] + "'/>" + triviaQ[tQuestions].guesses[g]);
			}
			
			$(".wrapper").append("<br> <button id='next'> Next </button>");	
	},

	saveSelector: function() {

		var questionNumber = 1

		$.each($("input[name=guesses-" + questionNumber + "]:checked", function(){
			if($(this).val()==triviaQ[questionNumber].answer) {
				game.correct++;
			}else{
				game.incorrect++;
			}
		}));

			questionNumber++;
	},

	done: function(){
		this.result();
	},

	result: function() {
		clearInterval(time);
		$('.wrapper h2').remove();
		$('.wrapper').html("<h2> All Done! </h2>"); 
		$('.wrapper').append("<h3> Correct Answer: '" + this.correct + "'</h3>");
		$('.wrapper').append("<h3> Incorrect Answers: '" + this.incorrect + "'</h3>");
		$('.wrapper').append("<h3> Unanswered: '" +(triviaQ.length-(this.incorrect+this.correct)) + "'</h3>");
		}
	}
