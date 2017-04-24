var mytableTemplate = document.querySelector('.mytableTem').innerHTML;
var showTemplate = Handlebars.compile(mytableTemplate);

var dropDownTemplate = document.querySelector('.dropdownTemp').innerHTML;
var drop = Handlebars.compile(dropDownTemplate);

var add = document.querySelector('.addingStock');
var mySearchBton = document.querySelector('.searchBton');
var myStockBton = document.querySelector('.stockshow');

var shoe = [{
    brand: 'albano',
    color: 'white',
    size: 3,
    price: 'R500',
    in_stock: 15
  },
  {
    brand: 'albano',
    color: 'white',
    size: 4,
    price: 'R500',
    in_stock: 7
  },
  {
    brand: 'albano',
    color: 'white',
    size: 5,
    price: 'R500',
    in_stock: 10
  },
  {
    brand: 'albano',
    color: 'white',
    size: 6,
    price: 'R500',
    in_stock: 6
  },
  {
    brand: 'albano',
    color: 'avocado green',
    size: 3,
    price: 'R500',
    in_stock: 18
  },
  {
    brand: 'albano',
    color: 'avocado green',
    size: 4,
    price: 'R500',
    in_stock: 20
  },
  {
    brand: 'albano',
    color: 'avocado green',
    size: 5,
    price: 'R500',
    in_stock: 15
  },
  {
    brand: 'albano',
    color: 'avocado green',
    size: 6,
    price: 'R500',
    in_stock: 15
  },
  {
    brand: 'albano',
    color: 'brown',
    size: 3,
    price: 'R500',
    in_stock: 15
  },
];

var stock = localStorage['stock']
//var Allshoes = shoe
if (stock) {
  shoe = JSON.parse(stock)
}
else{
  localStorage['stock'] = JSON.stringify(shoe);
}

//document.querySelector('.myDrop').innerHTML = drop({shoe:shoe});
//document.querySelector('.outcome').innerHTML = showTemplate({shoe:shoe});

function brandList(shoes) {
  var uniqBrandList = [];
  var brandMap = {};

  for (var i = 0; i < shoes.length; i++) {
    var shoe = shoes[i];
    if (brandMap[shoe.brand] === undefined) {
      brandMap[shoe.brand] = shoe.brand;
      uniqBrandList.push(shoe.brand)
    }

  }
  return uniqBrandList;
}


function shoeColorList(shoes) {
  //a list of unique colors
  var uniqColorList = [];
  var colorMap = {};

  for (var i = 0; i < shoes.length; i++) {
    var shoe = shoes[i];
    if (colorMap[shoe.color] === undefined) {
      colorMap[shoe.color] = shoe.color;
      uniqColorList.push(shoe.color);
    }
   }
  return uniqColorList;
}

function shoeSizeList(shoes) {
  var uniqSizeList = [];
  var sizeMap = {};

  for (var i = 0; i < shoes.length; i++) {
    var shoe = shoes[i];
    if (sizeMap[shoe.size] === undefined) {
      sizeMap[shoe.size] = shoe.size;
      uniqSizeList.push(shoe.size)
    }
  }
  return uniqSizeList;
}

var outcome = document.querySelector('.outcome');
var myDrop = document.querySelector('.myDrop');

   myDrop.innerHTML = drop({
   shoeBrand: brandList(shoes).sort(),
    shoeColors: shoeColorList(shoes).sort(),
    shoeSize: shoeSizeList(shoes).sort()
  });
}


function myStock() {
  var inbrand = document.querySelector('.inbrand');
  var incolor = document.querySelector('.incolor');
  var insize = document.querySelector('.insize');
  var inprice = document.querySelector('.inprice');
  var instock = document.querySelector('.instock');
  //alert(inbrand.value);
if (inbrand.value !== ''&&
 incolor.value !== '' &&
 insize.value !== ''&& inprice.value !== ''&&
 instock.value !== ''){

  var newstock = {
    brand: inbrand.value,
    color: incolor.value,
    size: Number(insize.value),
    price: inprice.value,
    in_stock: Number(instock.value)
  };
}
  var existingShoe = false;

  for (var i = 0; i < shoe.length; i++) {
    var currentShoe = shoe[i];

    if (currentShoe.brand === newstock.brand &&
      currentShoe.color === newstock.color &&
      currentShoe.size === newstock.size) {
      var shoeInStock = currentShoe;
      shoeInStock.in_stock += newstock.in_stock;
      existingShoe = true;
      break;
    }
  inbrand.value = '';
  incolor.value = '';
  insize.value = '';
  inprice.value = '';
  instock.value = ''
  };

  if (!existingShoe) {
    shoe.push(newstock);
  };

  localStorage['stock'] = JSON.stringify(shoe);

  showAll(shoe);
};

add.addEventListener('click', myStock);
showAll(shoe);


function showStock() {

  var brandSelect = document.querySelector('.selectBrand').value;
  var colorSelect = document.querySelector('.selectColor').value;
  var sizeSelect = document.querySelector('.selectSize').value;

  document.querySelector('.outcome').innerHTML = showTemplate({
    shoe: shoe
  });
};
myStockBton.addEventListener('click', showStock)

function showTableData() {

  var brandSelect = document.querySelector('.selectBrand').value;
  var colorSelect = document.querySelector('.selectColor').value;
  var sizeSelect = document.querySelector('.selectSize').value;
  var filteredShoes = [];

  for (var i = 0; i < shoe.length; i++) {

    var currentShoe = shoe[i];

    if (brandSelect.toLowerCase() === currentShoe.brand.toLowerCase() &&
      colorSelect.toLowerCase() === currentShoe.color &&
      Number(sizeSelect) === currentShoe.size
    ) {
      filteredShoes.push(currentShoe)

    }
  }

  document.querySelector('.outcome').innerHTML = showTemplate({
    shoe: filteredShoes
  });
};

mySearchBton.addEventListener('click', showTableData)
