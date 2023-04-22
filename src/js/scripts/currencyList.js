async function buildCurrencyTable(currencyData) {
	if (!currencyData) {
		throw new Error(`Invalid currency data`);
	}

	const extendedData = [
		{
			Cur_Abbreviation: 'BYN',
			Cur_ID: 1,
			Cur_Name: 'Белорусский рубль',
			Cur_OfficialRate: 1,
			Cur_Scale: 1,
			Date: '2023-04-22T00:00:00',
		},
		...currencyData,
	];

	const table = document.querySelector('.currencyTable');
	const tbody = document.querySelector('#baseСurrency');

	for (let i = 0; i < extendedData.length; i++) {
		const item = extendedData[i];

		tbody.insertAdjacentHTML(
			'beforeend',
			`<tr class="curRow" data-abbr="${item.Cur_Abbreviation}">
						<td class="curCell nameColumn">${item.Cur_Name}</td>
						<td class="curCell">${item.Cur_Scale} ${item.Cur_Abbreviation}</td>
						<td class="curCell" data-rate-value="${item.Cur_OfficialRate}">${item.Cur_OfficialRate}</td>
						<td class="curCell curResult">${item.Cur_OfficialRate} BYN</td>
					</tr>`
		);
	}

	table.insertAdjacentHTML(
		'beforeend',
		`<tfoot>
      <tr>
        <td class="headCell nameColumn">Название валюты</td>
        <td class="headCell courseAmountColumn">Количество валюты в ед</td>
        <td class="headCell currentCourseColumn">Курс BYN/ед</td>
        <td class="headCell">Результат</td>
      </tr>
    </tfoot>`
	);

	document.querySelector('.tableSkeleton').remove();
}

function countExchange(scale, abbr, rate) {
	const currList = document.querySelectorAll('#baseСurrency .curRow');

	for (let i = 0; i < currList.length; i++) {
		const item = currList[i];
		const itemRateValue = item.querySelector('[data-rate-value]').dataset.rateValue;
		const resWrapper = item.querySelector('.curResult');

		if (itemRateValue == rate && item.dataset.abbr === abbr) {
			resWrapper.innerHTML = `${scale} ${abbr}`;
			continue;
		}

		const countResult = ((itemRateValue / rate) * scale).toFixed(4).replace(/.[0]$/gm, '');

		resWrapper.innerHTML = `${countResult} ${abbr}`;
	}
}

export {buildCurrencyTable, countExchange};
