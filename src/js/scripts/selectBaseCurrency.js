import {countExchange} from './currencyList';
import {createCustomSelect} from '../modules/customSelect';

function setBaseSelect(currencyData) {
	const customSelectWrapper = document.querySelector('.selectWrapper');
	const customSelect = createCustomSelect(customSelectWrapper);

	if (!currencyData) {
		throw new Error(`Invalid currency data`);
	}

	for (let i = 0; i < currencyData.length; i++) {
		const item = currencyData[i];
		const dataValue = `${item.Cur_Scale} ${item.Cur_Abbreviation} ${item.Cur_OfficialRate}`;

		customSelect.addOption(item.Cur_Abbreviation, {class: 'customOption'}, {value: dataValue});
	}

	customSelectWrapper.addEventListener('change', (e) => {
		const [scale, abbr, rate] = e.detail.value.split(' ');
		countExchange(scale, abbr, rate);
	});
}

export {setBaseSelect};
