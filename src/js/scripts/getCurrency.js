async function getLocalCurrency() {
	const previousData = localStorage.getItem('currencyData');
	const expiredDate = localStorage.getItem('expiredDate');

	if (!previousData || expiredDate < new Date()) {
		return await fetchCurrency();
	}

	return await JSON.parse(previousData);
}

function setExpiredDate(date) {
	const lastUploadDate = new Date(date);
	const expiredDate = new Date().setDate(lastUploadDate.getDate() + 1);
	localStorage.setItem('expiredDate', expiredDate);
}

async function fetchCurrency() {
	try {
		const request = await fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0');

		if (request.ok && request.status === 200) {
			const data = await request.json();
			localStorage.setItem('currencyData', JSON.stringify(data));

			setExpiredDate(data[0].Date);
			return data;
		}
	} catch (err) {
		console.error(err);
	}
}

export {getLocalCurrency};
