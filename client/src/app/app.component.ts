import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./app.component.html",
    selector: "app-root"
})
export class AppComponent {
    constructor(private router: Router) {}

    logout() {
      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('isLecturer');
      this.router.navigate(['/logout']);
    }
}