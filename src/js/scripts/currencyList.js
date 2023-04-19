async function buildCurrencyTable(currencyData) {
	if (!currencyData) {
		throw new Error(`Invalid currency data`);
	}
	const table = document.querySelector('.currencyTable');
	const tbody = document.querySelector('#baseСurrency');

	for (let i = 0; i < currencyData.length; i++) {
		const item = currencyData[i];

		tbody.insertAdjacentHTML(
			'beforeend',
			`<tr class="curRow" data-abbr="${item.Cur_Abbreviation}">
						<td class="curCell nameColumn">${item.Cur_Name}</td>
						<td class="curCell">${item.Cur_Scale} ${item.Cur_Abbreviation}</td>
						<td class="curCell" data-rate-value="${item.Cur_OfficialRate}">${item.Cur_OfficialRate}</td>
						<td class="curCell curResult">${item.Cur_OfficialRate}</td>
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
			resWrapper.innerHTML = scale;
			continue;
		}

		const countResult = ((itemRateValue / rate) * scale).toFixed(4);

		resWrapper.innerHTML = countResult.replace(/.[0]$/gm, '');
	}
}

export {buildCurrencyTable, countExchange};
