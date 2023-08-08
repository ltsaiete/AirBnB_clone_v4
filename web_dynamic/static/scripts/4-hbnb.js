$(document).ready(() => {
	const apiStatus = document.createElement('div');
	apiStatus.setAttribute('id', 'api_status');
	$('header').append(apiStatus);
	$.get('http://localhost:5001/api/v1/status/', (data, textStatus) => {
		const { status } = data;
		if (status === 'OK') {
			apiStatus.classList.toggle('available');
		}
	});

	const checkedAmenities = [];
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

	const placesSection = $('section.places');
	function loadPlaces() {
		$.post({
			url: 'http://localhost:5001/api/v1/places_search/',
			data: JSON.stringify({
				amenities: checkedAmenities
			}),
			contentType: 'application/json',
			success: (data, message) => {
				data.forEach((place) => {
					const placeNode = document.createElement('article');
					placeNode.innerHTML = `
						<div class="title_box">
							<h2>${place.name}</h2>
							<div class="price_by_night">${place.price_by_night}</div>
						</div>
						<div class="information">
							<div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
							<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
							<div class="number_bathrooms">
								${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}
							</div>
						</div>
						<div class="description">${place.description || 'safe'}</div>
				`;

					placesSection.append(placeNode);
				});
			}
		});
	}

	$('button').click(loadPlaces);

	loadPlaces();
});
