$(document).ready(() => {
	const checkedAmenities = [];

	const apiStatus = document.createElement('div');
	apiStatus.setAttribute('id', 'api_status');
	$('header').append(apiStatus);

	$.get('http://localhost:5001/api/v1/status/', (data, textStatus) => { // Get API status
		const { status } = data;
		if (status === 'OK') {
			apiStatus.classList.toggle('available');
		}
	});

	$('input').on('change', (e) => {
		const amenity = {
			id: e.target.attributes['data-id']['value'],
			name: e.target.attributes['data-name']['value']
		};

		if (e.target.checked) {
			checkedAmenities.push(amenity);
		} else {
			const index = checkedAmenities.findIndex((element) => element.id === amenity.id);
			if (index !== -1) checkedAmenities.splice(index, 1);
		}

		$('.amenities h4').text(checkedAmenities.map(({ name }) => name).join(', '));
	});
});
