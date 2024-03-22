import { CourseDetailsComponent } from './app/course-details/course-details.component';
import { AddCourseComponent } from './app/add-course/add-course.component';
import { AllCoursesComponent } from './app/all-courses/all-courses.component';
import { RegisterComponent } from './app/register/register.component';
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import {PageNotFoundComponent} from "./app/page-not-found/page-not-found.component"
import { AuthGuardService } from './app/auth-guard-service.service';


const APP_ROUTES:Route[]=[
    {path:"", redirectTo:"login", pathMatch: "full"},
    {path:"login", component:LoginComponent},
    {path: "register/:name", component: RegisterComponent},
    {path: "register", component: RegisterComponent},
    {path:"courses", component:AllCoursesComponent},
    {path:"addCourses", component:AddCourseComponent},
    {path:"singleCourse/:id", component:CourseDetailsComponent, canActivate:[AuthGuardService]},
    {path:"editCourse", component:AddCourseComponent},
    {path:"logout", component:LoginComponent},
    {path: "**", component:PageNotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingMudule{

}