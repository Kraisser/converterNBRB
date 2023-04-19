function createCustomSelect(wrapper) {
	wrapper.insertAdjacentHTML(
		'beforeend',
		`
  <div class="startWrapper">
    <div class="selectLabel">BYN</div>
    <svg class="selectIcon closed">
      <line x1="0" y1="0" x2="8" y2="7" stroke-width="1" stroke="rgb(0,0,0)" />
      <line x1="8" y1="7" x2="16" y2="0" stroke-width="1" stroke="rgb(0,0,0)" />
    </svg>
  </div>
  <ul class="optionsWrapper hidden">
  </ul>
  `
	);

	const optionsList = wrapper.querySelector('.optionsWrapper');
	const startWrapper = wrapper.querySelector('.startWrapper');
	const selectLabel = wrapper.querySelector('.selectLabel');
	const selectIcon = wrapper.querySelector('.selectIcon');

	const toggleSelect = () => {
		optionsList.classList.toggle('hidden');
		selectIcon.classList.toggle('opened');
	};

	const addOption = (value, attributes, dataset = {}) => {
		const newOption = document.createElement('li');
		newOption.innerHTML = value;

		if (attributes) {
			for (let key in attributes) {
				if (attributes.hasOwnProperty(key)) {
					newOption.setAttribute(key, attributes[key]);
				}
			}
		}
		if (dataset) {
			for (let key in dataset) {
				if (dataset.hasOwnProperty(key)) {
					newOption.dataset[key] = dataset[key];
				}
			}
		}

		newOption.addEventListener('click', (e) => {
			if (newOption.classList.contains('selected')) {
				return;
			}
			selectLabel.innerHTML = value;
			toggleSelect();

			const customEvent = new CustomEvent('change', {
				detail: dataset,
				bubbles: true,
			});
			newOption.dispatchEvent(customEvent);
			wrapper.dataset.activeValue = dataset.value;

			optionsList.querySelectorAll('li').forEach((item) => {
				item.classList.remove('selected');
			});
			newOption.classList.add('selected');
		});

		optionsList.insertAdjacentElement('beforeend', newOption);
	};

	addOption(
		'BYN',
		{
			class: 'customOption selected',
		},
		{
			value: [1, 'BYN', 1],
			default: true,
		}
	);
	wrapper.dataset.activeValue = '1,BYN,1';

	startWrapper.addEventListener('click', () => {
		toggleSelect();
	});

	return {addOption, wrapper};
}

export {createCustomSelect};
