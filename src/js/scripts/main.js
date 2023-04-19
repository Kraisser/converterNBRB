import {getLocalCurrency} from './getCurrency';
import {buildCurrencyTable} from './currencyList';
import {setBaseSelect} from './selectBaseCurrency';

getLocalCurrency()
	.then((res) => {
		buildCurrencyTable(res);
		setBaseSelect(res);
	})
	.catch((e) => console.log(e));
