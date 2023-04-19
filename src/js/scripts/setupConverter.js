import {createCustomSelect} from '../modules/customSelect';

function setConverterSelect(target, currencyData) {
	const customSelect = createCustomSelect(target);

	if (!currencyData) {
		throw new Error(`Invalid currency data`);
	}

	for (let i = 0; i < currencyData.length; i++) {
		const item = currencyData[i];
		const dataValue = [item.Cur_Scale, item.Cur_Abbreviation, item.Cur_OfficialRate];

		customSelect.addOption(item.Cur_Abbreviation, {class: 'customOption'}, {value: dataValue});
	}
}

export {setConverterSelect};
