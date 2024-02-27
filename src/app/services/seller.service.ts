import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp, login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/Seller', data, { observe: 'response' })
      .subscribe((result) => {
        // console.warn(result)
        if (result) {
          localStorage.setItem('seller', JSON.stringify(result.body)); // La ba a line po k page refresh manta kamprek ki dam de jok
          this.router.navigate(['seller-home']);
        }
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    // console.warn(data);
    this.http.get(`http://localhost:3000/Seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      // console.warn(result)
      if (result && result.body && result.body.length) {
        // console.warn("User logged in")
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      } else {
        console.warn("Login failed");
        this.isLoginError.emit(true);
      }
    })
  }

}
