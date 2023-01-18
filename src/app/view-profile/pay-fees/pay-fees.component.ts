import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeDetails } from 'src/app/Model/FeeDetails';
import { StudentResponse } from 'src/app/Model/StudentResponse.model';
import { ColumbusService } from 'src/app/service/columbus.service';
import { FormsModule } from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay-fees',
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css']
})
export class PayFeesComponent implements OnInit {

  @ViewChild('closebutton') closebutton;
  amoutn=false
  feesAmount=true;
  universityRollNo:number
  feeAmount:number;
  datas:any=[];
  studentResponse:StudentResponse=new StudentResponse();
  
  feeDetails:FeeDetails=new FeeDetails();
  

  constructor(private columbusService:ColumbusService,
    private route:ActivatedRoute,
    private router:Router) { }

  data={
    "feeAmount": 15000,
    "universityRollNo": "D21MCA12137",
    "lastdate": "23-10-2022",
    "lastFeeCharges": "15000",
    "extensionDetails": "jkjkjkj",
}

  ngOnInit(): void {
   
    this.universityRollNo=this.route.snapshot.params['unversityRollNo'];
    this.columbusService.getStudentFeeDetails(this.universityRollNo).subscribe(data=>{
      this.datas=this.studentResponse=data
      console.log(this.datas.feeDetailsDto)
    })


    // if(this.data.feeAmount>0){
    //   this.feesAmount=true;
    // }else{
    //   this.feesAmount=true;
    // }
  }

  updateFeeDetails(universityRollNo:String,feeAmount:number){
console.log("Check");

    this.feeDetails.universityRollNo=universityRollNo;
    console.log(universityRollNo);
    this.feeDetails.feeAmount=feeAmount;
    console.log(this.feeDetails);
    this.columbusService.updateStudentFeeDetails(this.feeDetails).subscribe(data=>{
      this.datas=this.studentResponse=data;
      console.log(this.datas.statusCode);
      if(this.datas.statusCode.charAt(0)=='S'){
        //this.valid_cred=true;
        Swal.fire("Fee Paid..",'Successfully!','success')
        this.router.navigate(['student/view_profile',this.feeDetails.universityRollNo,'/payfees']);
       }
      
    });


  }

  public onSave() {
    this.closebutton.nativeElement.click();
  }

}
