import { Component, Input } from '@angular/core';
import { Course, LearningMode } from '../models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
@Input()
course:Course;

  getLearningModeName(mode: LearningMode): string {
    switch (mode) {
      case LearningMode.Frontal:
        return 'פרונטלי';
      case LearningMode.Zoom:
        return 'זום';
      default:
        return '';
    }
  }
}
