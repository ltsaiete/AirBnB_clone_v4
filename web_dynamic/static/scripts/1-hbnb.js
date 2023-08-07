$(document).ready(() => {
	const checkedAmenities = [];

	$('input').on('change', (e) => {
		const amenity = {
			id: e.target.attributes['data-id']['value'],
			name: e.target.attributes['data-name']['value']
		};

		if (e.target.checked) {
			checkedAmenities.push(amenity);
		} else {
			const index = checkedAmenities.findIndex(
				(element) => element.id === amenity.id
			);
			if (index !== -1) checkedAmenities.splice(index, 1);
		}

		$('.amenities h4').text(
			checkedAmenities.map(({ name }) => name).join(', ')
		);
	});
});
