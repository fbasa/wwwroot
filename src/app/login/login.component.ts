import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../route.animations'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  user:any;
  form: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    //private auth: AuthService
  ) { 

    this.form = formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  ngOnInit() {
    // need to call api here
    // to determine api heartbeat

    
    this.user = {
      name: 'frank',
      password: '123456789'
    }
  }

  validate(e){
    // call service to validate user
    // then redirect to dashboard when authenticated
    this.router.navigate(['/dashboard']);
  }
}
