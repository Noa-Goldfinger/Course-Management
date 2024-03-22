import { LoginComponent } from './../login/login.component';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { AppRoutingMudule } from 'src/app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseService } from './course.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { DateOnlyPipe } from 'src/date-pipe.pipe';
import { CategoryService } from './category.service';
import { CourseComponent } from './course/course.component';
import { IconPipe } from 'src/icon-pipe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './auth-guard-service.service';


@NgModule({
declarations:[AppComponent,LoginComponent, PageNotFoundComponent, RegisterComponent, AllCoursesComponent, CourseDetailsComponent, AddCourseComponent,DateOnlyPipe,IconPipe, CourseComponent],//הקומפוננטות שמשתתפות במודול הזה
imports:[BrowserModule,FormsModule,ReactiveFormsModule,AppRoutingMudule,HttpClientModule, BrowserAnimationsModule],//המודולים הנוספים שאני משתמשת
providers: [ UserService, CourseService, CategoryService,AuthGuardService],
bootstrap:[AppComponent]// רק במודול הראשי, מי המודול שפותח את הגלגל, הכול מתחיל ממנו
})
export class AppModule{

}