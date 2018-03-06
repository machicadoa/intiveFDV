$(document).ready( function() {
	var myViewModel = {
		currentWelcomeMessage : ko.pureComputed(function() {
			var current = myViewModel.currentInterviewee();
			var day = current.intervieweeBirthdate.format('DD');
			var month = current.intervieweeBirthdate.format('MMMM');
			
			var years = moment().year() - current.intervieweeBirthdate.year();
			return 'Hola ' + current.intervieweeName + ' de ' + current.intervieweeCountry + '. El día ' + day + ' de ' + month + ' tendrás ' + years + '.';
			}, this),
		
		currentInterviewee: ko.observable(),
		
		listOfInterviewees: ko.observableArray(),
		
		countryCandidates: ko.observableArray(),
		
		addInterviewee: function (form){
			var date = moment(form.birthdate.value, 'DD/MM/YYYY', 'es', true);
			if (date.isValid()){
				var newItem = new Interviewee(form.name.value, date, form.country.selectedOptions[0].text);
				myViewModel.currentInterviewee(newItem);
				myViewModel.listOfInterviewees.push(newItem);
				form.reset();
			} else {
				alert("Fecha Inválida");
			}
		}
	};
	
	var Interviewee = function(name, birthdate, country) {
        this.intervieweeName = name;
		this.intervieweeBirthdate = birthdate;
		this.intervieweeCountry = country;
    };
	
	ko.applyBindings(myViewModel);
	
	$.ajax({
		type: 'GET',
		url: 'https://restcountries.eu/rest/v2/all',
		dataType: "JSON",
		success: function (data) {
			myViewModel.countryCandidates(data);
		},
		error: function() {
			console.log('Error: No se pudo obtener el listado de paises.');
		}
	});
	
	currentViewModel = ko.dataFor(document.body);
});

var currentViewModel = null;