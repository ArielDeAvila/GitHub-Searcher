import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
  
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  focus!: boolean;
  @ViewChild('userName') userName!: ElementRef;
  msgError!: string;

  constructor(
    private readonly builder: FormBuilder,
    private readonly dataSvc: DataService,
    private readonly userSvc:UserService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.OnInitForm();
    
  }

  OnInitForm(): FormGroup {
    return this.builder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]]
    })

  }

  OnSubmit(): void{
    this.msgError = '';
    let name = this.userName.nativeElement.value;

    this.dataSvc.GetUser(name).pipe(
      catchError(error => {      
        this.msgError = error;
        return of()
      })
    ).subscribe(res => {
      this.userSvc.setUser(res);
    })
  }  

}
