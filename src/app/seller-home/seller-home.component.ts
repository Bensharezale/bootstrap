import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
// import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | product[];
  productMessage: undefined | string;
  icone = faTrash;
  EditIcone = faEdit;

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.List()
  }

  deleteProduct(id: number) {
    console.warn('test id', id)

    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product is Deleted";
        this.List()
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000)
  }

  List() {
    this.product.productList().subscribe((result) => {
      console.warn(result)
      if (result) {
        this.productList = result;
      }
    });
  }
}
