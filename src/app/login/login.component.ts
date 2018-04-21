import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../route.animations'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  user:any;
  form: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder,) { 

    this.form = formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  ngOnInit() {

    this.user = {
      name: 'frank',
      password: '123456789'
    }
  }

  validate(e){
    this.router.navigate(['/dashboard']);
  }
}
