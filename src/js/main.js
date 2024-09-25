import 'the-new-css-reset/css/reset.css';
import '../styles/style.css';

let stores = [];
let products = [];
let shopProducts = [];
let nameSort = 'name-asc';
const toppings = [];
const fetchData = async () => {
  try {
    const responseStores = await fetch('./src/data/stores.json');
    const dataStores = await responseStores.json();
    stores = dataStores.stores;
  } catch (error) {
    console.error('Error fetching stores:', error);
  }

  try {
    const responseProducts = await fetch('./src/data/products.json');
    const dataProducts = await responseProducts.json();
    products = dataProducts.products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  try {
    const responseShopProducts = await fetch('./src/data/storeProducts.json');
    const dataShopProducts = await responseShopProducts.json();
    shopProducts = dataShopProducts.shopProducts;
  } catch (error) {
    console.error('Error fetching shop products:', error);
  }
};
await fetchData();

document.querySelector('#app').innerHTML = `
  <button id="btnOpenSidebar" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100">
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
  </button>
  <aside id="cta-button-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full py-4 overflow-y-auto bg-[#1d2c53]">
    <div id="dropdown-cta" class="text-[#fff] text-xl capitalize text-center pt-2 pb-6 relative">
      <h3>milk tea store</h3>
      <svg class="absolute top-[5px] right-[10px] text-[#ffffff] sm:hidden" fill="#000000" height="32px" width="32px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 460.775 460.775" xml:space="preserve">
        <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
          c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
          c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
          c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
          l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
          c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
      </svg>
    </div>

    <ul id="list-stores" class="font-medium">
    </ul>
   </div>
  </aside>  
  <div id="main-content" class="px-16 py-8 sm:ml-64 bg-[#f0f0f0] h-screen overflow-auto">
    <h2 id="titleMainContent"></h2>
    <div class="flex justify-between items-center my-4">
      <button id='filterButton' class="py-2 px-6 rounded-md bg-[#1d2c53] text-[#ffffff]">Filter</button>
      <div class="flex justify-between items-center">
        <p>Sort by:</p>
        <div class="ml-2 relative inline-block text-left">
          <button id="dropdownButton" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            <p id="dropdownName">123</p>
            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414l-3.293 3.293a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M5.293 12.293a1 1 0 011.414 0L10 16.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <div id="dropdownMenu" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-[#ffffff] z-50 hidden">
            <div class="py-1" role="none">
              <a href="#" data-sort="name-asc" class="sortOption block px-4 py-2 text-sm">Name: A-Z</a>
              <a href="#" data-sort="name-desc" class="sortOption block px-4 py-2 text-sm">Name: Z-A</a>
              <a href="#" data-sort="price-asc" class="sortOption block px-4 py-2 text-sm">Price: Low to High</a>
              <a href="#" data-sort="price-desc" class="sortOption block px-4 py-2 text-sm">Price: High to Low</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="listFilter" class="hidden my-4 p-4 w-full bg-[#ffffff]">
      <h3 class="mb-4 font-semibold ">Toppings:</h3>
      <div id="filterMenu" class="grid grid-cols-2 lg:grid-cols-3 gap-4 text-left my-4">
        <div>
          <input class="topping-checkbox appearance-auto" type="checkbox" id="white_pearl" value="White pearl" />
          <label for="white_pearl">
            White pearl
          </label>
        </div>
        <div>
          <input class="topping-checkbox appearance-auto" type="checkbox" id="milk_foam" value="Milk foam" />
          <label for="milk_foam">
            Milk foam
          </label>
        </div>
        <div>
          <input class="topping-checkbox appearance-auto" type="checkbox" id="pearl" value="Pearl" />
          <label for="pearl">
            Pearl
          </label>
        </div>
        <div>
          <input class="topping-checkbox appearance-auto" type="checkbox" id="aloe" value="Aloe" />
          <label for="aloe">
            Aloe
          </label>
        </div>
      </div>

    </div>

    <div id="listItem" >

    </div>
  </div>
`;
document.getElementById('btnOpenSidebar').addEventListener('click', () => {
  document
    .getElementById('cta-button-sidebar')
    .classList.remove('-translate-x-full');
});

document.getElementById('Capa_1').addEventListener('click', () => {
  document
    .getElementById('cta-button-sidebar')
    .classList.add('-translate-x-full');
});

let countDropdown = 1;
const dropdownMenu = document.getElementById('dropdownMenu');

document.getElementById('dropdownButton').addEventListener('click', (event) => {
  countDropdown += 1;
  if (countDropdown % 2 === 0) {
    dropdownMenu.classList.remove('hidden');
  } else {
    dropdownMenu.classList.add('hidden');
  }
});

let countFilter = 1;

const listFilter = document.getElementById('listFilter');

document.getElementById('filterButton').addEventListener('click', (event) => {
  countFilter += 1;
  if (countFilter % 2 === 0) {
    listFilter.classList.remove('hidden');
  } else {
    listFilter.classList.add('hidden');
  }
});

const sortProducts = (_products, criteria) => {
  switch (criteria) {
    case 'name-asc':
      return _products.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return _products.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return _products.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return _products.sort((a, b) => b.price - a.price);
    default:
      return _products;
  }
};

const filterProducts = (storeProducts, selectedToppings) => {
  return storeProducts.filter((product) => {
    if (selectedToppings.length > 0) {
      const hasMatchingTopping = selectedToppings.some((topping) =>
        product.toppings.toLowerCase().includes(topping.toLowerCase()),
      );

      return hasMatchingTopping;
    }
    return true;
  });
};

const getSelectedCheckboxValues = (checkboxClass) => {
  const checkboxes = document.querySelectorAll(checkboxClass);
  return Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value.toLowerCase());
};

const setupMainContent = (element, storeName, sortCriteria = 'name-asc') => {
  const mainElement = element;

  const title = document.createElement('h2');
  title.id = 'titleMainContent';
  title.innerText = `${decodeURIComponent(storeName)} Menu`;

  const dropdownName = document.createElement('p');
  dropdownName.id = 'dropdownName';
  dropdownName.innerText = nameSort;

  const findStoreIdByName = (name) => {
    const store = stores.find((_store) => _store.name === name);
    return store ? store.id : null;
  };

  const idStore = findStoreIdByName(decodeURIComponent(storeName));

  const idItemOfStore = shopProducts
    .filter((shopProduct) => {
      return shopProduct.shop === idStore;
    })
    .map((shopProduct) => shopProduct.id);

  const itemOfStore = products.filter((product) =>
    idItemOfStore.includes(product.id),
  );

  const listItem = document.createElement('div');
  listItem.id = 'listItem';
  const sortedItemOfStore = sortProducts(itemOfStore, nameSort);

  const selectedToppings = getSelectedCheckboxValues('.topping-checkbox');
  const filteredProducts = filterProducts(sortedItemOfStore, selectedToppings);

  filteredProducts.forEach((_item) => {
    const item = document.createElement('div');
    item.innerHTML = `  
        <div class="p-4 h-[250px] rounded overflow-hidden shadow-xl relative">
          <p>MT-${_item.id < 10 ? `0${_item.id}` : _item.id}</p>
          <div class="font-bold min-h-[3.5rem] md:text-sm lg:text-lg xl:text-xl">${_item.name}</div>
          <div class="my-3 border-solid border-[#1d2c54]">
          </div>
          <div>
            <h4 class="font-medium text-lg">Toppings:</h4>
            <p>
              ${_item.toppings}
            </p>
          </div>
          <div class="absolute right-4 bottom-4">
            $${_item.price}
          </div>
        </div>
    `;
    listItem.appendChild(item);
  });

  mainElement.replaceChild(title, document.getElementById('titleMainContent'));
  mainElement.replaceChild(listItem, document.getElementById('listItem'));
  document.getElementById('dropdownName').replaceWith(dropdownName);
};

const setupListStores = (element) => {
  const ulElement = element;

  stores.forEach((_data) => {
    const li = document.createElement('li');
    li.innerHTML = `
          <a href="#${_data.name}"   class="p-2 flex items-center justify-center text-[#767d97] hover:text-[#ffffff] hover:bg-[#304476] transition">
              <span >${_data.name}</span>
          </a>`;
    li.querySelector('a').addEventListener('click', (event) => {
      document.querySelectorAll('#list-stores a').forEach((link) => {
        link.classList.remove('text-[#ffffff]');
        link.classList.remove('bg-[#304476]');
        link.classList.add('text-[#767d97]');
      });

      event.currentTarget.classList.remove('text-[#767d97]');
      event.currentTarget.classList.add('text-[#ffffff]');
      event.currentTarget.classList.add('bg-[#304476]');
      // setupMainContent(document.querySelector('#main-content'), _data.name);
      document
        .getElementById('cta-button-sidebar')
        .classList.add('-translate-x-full');
    });
    ulElement.appendChild(li);
  });

  if (!window.location.hash) {
    window.location.hash = `#${stores[0].name}`;
    setupMainContent(document.querySelector('#main-content'), stores[0].name);
  }

  document.querySelectorAll('#list-stores a').forEach((link) => {
    console.log(link.getAttribute('href'));
    if (
      link.getAttribute('href') === decodeURIComponent(window.location.hash)
    ) {
      console.log(link.getAttribute('href'));

      link.classList.remove('text-[#767d97]');
      link.classList.add('bg-[#304476]');
      link.classList.add('text-[#ffffff]');
    }
  });
};

setupListStores(document.querySelector('#list-stores'));

const initStoreName = window.location.hash.slice(1);
setupMainContent(document.querySelector('#main-content'), initStoreName);

window.addEventListener('hashchange', () => {
  const storeName = window.location.hash.slice(1);
  setupMainContent(document.querySelector('#main-content'), storeName);
});

document.querySelectorAll('.sortOption').forEach((option) => {
  option.addEventListener('click', (e) => {
    e.preventDefault();
    const sortCriteria = e.target.getAttribute('data-sort');
    nameSort = e.target.getAttribute('data-sort');

    const storeName = window.location.hash.slice(1);

    setupMainContent(
      document.querySelector('#main-content'),
      storeName,
      sortCriteria,
    );
  });
});

document.querySelectorAll('.topping-checkbox').forEach((filter) => {
  filter.addEventListener('change', () => {
    const storeName = window.location.hash.slice(1);
    setupMainContent(document.querySelector('#main-content'), storeName);
  });
});
