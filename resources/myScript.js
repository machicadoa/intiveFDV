$(document).ready( function() {
	var myViewModel = {
		currentWelcomeMessage : 'Hola {nombre} de {pais}. el día {día} del {mes} tendrás {años}',
		currentInterviewee: {
			name: null,
			country: null,
			birthdate: null
		},
		
		listOfInterviewees: ko.observableArray(),
		
		countryCandidates: ko.observableArray(),
		
		addInterviewee: function (form){
			if (moment(form.birthdate.value, 'DD/MM/YYYY',true).isValid()){
				var newItem = new Interviewee(form.name.value, form.birthdate.value, form.country.selectedOptions[0].text);
				myViewModel.listOfInterviewees.push(newItem);
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