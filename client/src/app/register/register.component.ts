import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // הוספת הייבוא הנדרש
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  user: User = new User(); 
  userName:string='';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });

    this.route.paramMap.subscribe(params => {
      const username = params.get('name');
      if (username) {
        this.userName = username; 
        this.userForm.patchValue({
          name: this.userName
        });
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.checkUserExists(this.userForm.get('name').value).subscribe(
        (exists) => {
          if (exists) {
            this.errorMessage = 'המשתמש כבר קיים';
          } 
          else {
            this.user = this.userForm.value; 
            this.userService.addUser(this.user).subscribe(
              (response:User) => {
                console.log(response);
                sessionStorage.setItem('userData', JSON.stringify(response));
                sessionStorage.setItem('isLecturer', JSON.stringify(false));
                this.router.navigate(['/courses']);
              },
              error => {
                console.error(error);
                this.errorMessage = 'אירעה שגיאה בהרשמה, אנא נסה שוב מאוחר יותר';
              }
            );
          }
        },
        error => {
          console.error(error);
          this.errorMessage = 'אירעה שגיאה בבדיקת המשתמש, אנא נסה שוב מאוחר יותר';
        }
      );
    } else {
      this.errorMessage = 'אנא מלא את כל השדות הנדרשים בצורה תקינה';
    }
  }
}





// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserService } from '../user.service'; // נדרש להשלמת הדוגמה, החלף בנתיב המתאים
// import { User } from '../models/user.model';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit {

//   user: User = new User();
//   //userName:string='';
//   errorMessage: string = '';

//   constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) {}

//   onSubmit() {
//     this.userService.checkUserExists(this.user.name).subscribe(
//       (exists) => {
//         if (exists) {
//           this.errorMessage = 'המשתמש כבר קיים';
//         } else {
//           this.userService.addUser(this.user).subscribe(
//             (response) => {
//               this.router.navigate(['/courses']);
//             },
//             (error) => {
//               console.error(error);
//               this.errorMessage = 'אירעה שגיאה בהרשמה, אנא נסה שוב מאוחר יותר';
//             }
//           );
//         }
//       },
//       (error) => {
//         console.error(error);
//         this.errorMessage = 'אירעה שגיאה בבדיקת המשתמש, אנא נסה שוב מאוחר יותר';
//       }
//     );
//   }
  
//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       const username = params.get('name');
//       if (username) {
//         this.user.name = username;
//       }
//     });
//   } 
// }
