declare let google: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '198178406901-bfkiqm3r592qsgjbjdi2i2vpuc66v0dv.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response),
    });

    google.accounts.id.renderButton(document.getElementById('btn-google'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    });
  }

  decodeToken(token: any) {
    // jwt token made of 3 things: header, payload, and secret key
    // more interested in the payload
    const [header, payload, secret] = token.split('.');
    return JSON.parse(atob(payload)); // The atob() function decodes a string of data which has been encoded using Base64 encoding
  }

  handleLogin(response: any) {
    // response contains a property called credential which you can decode on jwt.io
    // 1. decode the token
    const payload = this.decodeToken(response.credential);
    // 2. store in session
    
    // 3. navigate to homepage
  }
}
