import { Controller, Get, Render, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Product } from './productInterface.js';
import { productDto } from './createProducts.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  products: Product[] = [
  {
    "name": "Vezeték nélküli egér",
    "category": "elektronika",
    "price": 8990,
    "stock": 12
  },
  {
    "name": "Programozás kezdőknek",
    "category": "könyv",
    "price": 6490,
    "stock": 4
  },
  {
    "name": "Mechanikus billentyűzet",
    "category": "elektronika",
    "price": 24990,
    "stock": 3
  },
  {
    "name": "Fekete kapucnis pulóver",
    "category": "ruházat",
    "price": 12990,
    "stock": 8
  },
  {
    "name": "Catan társasjáték",
    "category": "játék",
    "price": 11990,
    "stock": 0
  },
  {
    "name": "USB-C töltőkábel",
    "category": "elektronika",
    "price": 4990,
    "stock": 25
  },
  {
    "name": "Adidas sportcipő",
    "category": "ruházat",
    "price": 27990,
    "stock": 2
  },
  {
    "name": "A kis herceg",
    "category": "könyv",
    "price": 3990,
    "stock": 15
  },
  {
    "name": "LEGO City rendőrségi állomás",
    "category": "játék",
    "price": 34990,
    "stock": 5
  },
  {
    "name": "Bluetooth hangszóró",
    "category": "elektronika",
    "price": 15990,
    "stock": 7
  }
]


  @Get()
  @Render('index')
  productKiiras() {
    return {
      products: this.products.toSorted((a, b) => a.price - b.price)
    }
  }

  @Get("filter")
  @Render('filter')
  szures(@Query("category") category: string) {
    return {
      products: this.products
      .filter(a=> a.category == category)
      .toSorted((a,b) => a.price - b.price)
    }
  }

  @Get("new")
  @Render('new')
  newDataForm() {

  }

  @Post("new")
  newData(@Body() body: productDto) {
    const newProduct: Product = {
      name: body.name,
      category: body.category,
      price: body.price,
      stock: body.stock
    }
    this.products.push(newProduct);
    return{
      success: true,
    }
  }


  @Get("stats")
  @Render('stats')
  stats() {
    let totalStock = 0
    for (const product of this.products) {
      totalStock += product.stock;
    }

    let averagePrice = 0;
    for (const product of this.products) {
      averagePrice += product.price;
    }
    averagePrice /= this.products.length;

    let mostExpensiveProduct = 0;
    for (const product of this.products) {
      if (product.price > mostExpensiveProduct) {
        mostExpensiveProduct = product.price;
      }
    }

    let leastExpensiveProduct = this.products[0].price;
    for (const product of this.products) {
      if (product.price < leastExpensiveProduct) {
        leastExpensiveProduct = product.price;
      }
    }
    return{
      totalStock,
      averagePrice,
      mostExpensiveProduct,
      leastExpensiveProduct

    }
  }
}
