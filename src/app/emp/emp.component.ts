import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpModel } from './emp.model';
import { ApiService } from '../Shared/api.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit{

formValue!:FormGroup;
empObj:EmpModel = new EmpModel();
empdata!:any;
showAdd!:boolean;
showUp!:boolean;

constructor(private fb:FormBuilder , private api: ApiService){

}

  ngOnInit(): void {
    this.formValue=this.fb.group({
      Name:[''],
      Email:[''],
      Salary:['']
    })
    this.getAll();
  }


  clickEmp(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUp=false;
  }

postempDetail(){
  this.empObj.Name=this.formValue.value.Name;
  this.empObj.Email=this.formValue.value.Email;
  this.empObj.Salary=this.formValue.value.Salary;

  this.api.postEmp(this.empObj).subscribe(res=>{
    console.log(res);
    alert("Employe Aded!");
    let ref = document.getElementById('cancel');
    ref?.click();
    this.formValue.reset();
    this.getAll();
    },
  err=>{
    alert("Something Went Wrong")
  })


}
getAll(){
  this.api.getEmp().subscribe(res=>{
    this.empdata=res;
  })
}
 deleteEmp(row:any){
  this.api.deleteEmp(row.id).subscribe(res=>{
    alert("Employee Deleted");
    this.getAll();
  });
 }

 onEdit(row:any){
  this.showAdd=false;
    this.showUp=true;
  this.empObj.id=row.id;
  this.formValue.controls['Name'].setValue(row.Name);
  this.formValue.controls['Email'].setValue(row.Email);
  this.formValue.controls['Salary'].setValue(row.Salary);


 }
 updateempDetail(){
  this.empObj.Name=this.formValue.value.Name;
  this.empObj.Email=this.formValue.value.Email;
  this.empObj.Salary=this.formValue.value.Salary;
  this.api.updateEmp(this.empObj, this.empObj.id).subscribe(res=>{
    alert("Updated Successfully!");
    let ref = document.getElementById('cancel');
    ref?.click();
    this.formValue.reset();
    this.getAll();
  });
 }
}
