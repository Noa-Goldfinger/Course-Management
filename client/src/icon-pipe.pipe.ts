// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'icon'
// })
// export class DateOnlyPipe implements PipeTransform {

//   transform(value: string, icon:any): any {
//     switch(value){
//         case "פרונטלי":return "https://publicdomainvectors.org/tn_img/Boy-With-Computer-At-Desk.webp";
//         break;
//         case "זום":return "https://publicdomainvectors.org/tn_img/woman-working-on-laptop-clipart.webp";
//         break;
//         // default return "opssss";
//                 }
//     // const datePipe: DatePipe = new DatePipe('en-US');
//     // return datePipe.transform(value, 'dd/MM/yyyy'); 
//     // return `${value} icon`;
//   }

// }
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {
  transform(learningMode: string): string {
    switch (learningMode) {
      case "פרונטלי":
        return 'https://publicdomainvectors.org/tn_img/Boy-With-Computer-At-Desk.webp';
      case "זום":
        return 'https://publicdomainvectors.org/tn_img/woman-working-on-laptop-clipart.webp';
      default:
        return "https://publicdomainvectors.org/he/%D7%A7%D7%9C%D7%99%D7%A4%D7%A8%D7%98%20%D7%97%D7%99%D7%A0%D7%9D/%D7%A6%D7%92%D7%99-%D7%9E%D7%97%D7%A9%D7%91/86238.html";
    }
  }
}
