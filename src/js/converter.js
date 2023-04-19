import 'normalize.css';
import '../style/style.scss';
import '../style/converter.scss';
import '../style/customSelect.scss';

import {getLocalCurrency} from './scripts/getCurrency';
import {setConverterSelect} from '../js/scripts/setupConverter';

let currencyData = {};

const converterData = {
	input1: {value: 0, currency: [1, 'BYN', 1]},
	input2: {value: 0, currency: [1, 'BYN', 1]},
};

getLocalCurrency()
	.then((res) => {
		const converterSelects = document.querySelectorAll('.converterSelect');
		converterSelects.forEach((item) => setConverterSelect(item, res));
		currencyData = res;
	})
	.catch((e) => console.log(e));

const converterInputs = document.querySelectorAll('.converterInput');
converterInputs.forEach((item) => item.addEventListener('input', checkConverterInput));

const converterSelects = document.querySelectorAll('.converterSelect');
converterSelects.forEach((item) => item.addEventListener('change', changeCurrency));

const validateNumberInput = (str) => str.match(/^(0|[1-9]\d*)([.,]\d+)?$/gm);
const deleteZeroBeforeNum = (str) => str.replace(/^[0]+(?=\d)/gm, '');
const resetToZero = () => {
	for (let key in converterData) {
		if (Object.hasOwnProperty.call(converterData, key)) {
			converterData[key].value = 0;
			document.querySelector(`[data-target-input="${key}"]`).value = '';
		}
	}
};

function checkConverterInput(e) {
	const target = e.target;
	target.value = deleteZeroBeforeNum(target.value);

	if (!target.value) {
		target.classList.remove('wrongInput');
		resetToZero();
		return;
	}

	if (!validateNumberInput(target.value)) {
		target.classList.add('wrongInput');
		return;
	}

	target.classList.remove('wrongInput');
	countCurrency(target);
}

function changeCurrency(e) {
	const targetKey = e.currentTarget.dataset.converterTarget;
	const currency = e.detail.value;
	const targetInput = document.querySelector(`[data-target-input="${targetKey}"]`);

	converterData[targetKey].currency = currency;

	countCurrency(targetInput);
}

function countCurrency(target) {
	if (!target || !target.value) {
		return;
	}

	const targetKey = target.dataset.targetInput;
	const targetValue = target.value.replace(/,/gm, '.');
	const [defScale, , defRate] = converterData[targetKey].currency;
	converterData[targetKey].value = targetValue;

	for (let key in converterData) {
		if (Object.hasOwnProperty.call(converterData, key) && key !== targetKey) {
			const resultInput = document.querySelector(`[data-target-input="${key}"]`);

			const item = converterData[key];
			const [scale, abbr, rate] = item.currency;

			if (abbr === 'BYN') {
				item.value = ((defRate * targetValue) / defScale).toFixed(4).replace(/.[0]$/gm, '');
				resultInput.value = item.value;
			} else {
				const crossBYN = (defRate * targetValue) / defScale;
				item.value = ((crossBYN / rate) * scale).toFixed(4).replace(/.[0]$/gm, '');
				resultInput.value = item.value;
			}
		}
	}
}
