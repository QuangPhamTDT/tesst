import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  popup = false;
  update = false;
  headers: string[] = ['ID', 'Delete', 'Time', 'Reporter', 'Poster', 'Content', 'Action'];
  body: any[] = [
    { time: '20/10/2020 16:25', reporter: 'system', poster: 'Lê Trung Kiên', content: 'Lorem ipsum dolor sit amet,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    { time: '20/10/2020 15:21', reporter: 'system', poster: 'Hoàng Đình Trọng	', content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...' },
    { time: '20/10/2020 09:09', reporter: 'user', poster: 'Nguyễn Ngọc Đoài	', content: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...' },
    { time: '20/10/2020 08:02', reporter: 'system', poster: 'Nguyễn Duy Hoàng', content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.' },
    { time: '20/10/2020 14:09', reporter: 'user', poster: 'Lê Thị Thúy Hiền', content: 'From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.' },
    { time: '20/10/2020 09:35', reporter: 'system', poster: 'Nguyễn Đức Thành', content: 'The purpose of A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.' },

  ]
  searchValue = '';
  time = '';
  reporter = '';
  poster = '';
  content = '';
  searchValueUpate = '';
  timeUpate = '';
  reporterUpate = '';
  posterUpate = '';
  contentUpate = '';
  currentItemNeededUpdate: number| undefined;
  constructor() { }

  ngOnInit(): void {
  }
  onDeleteItem(item: any, index: number): void {
    console.log('xoa item nay: ', item, 'index: ', index);
    this.body = this.body.filter((ele, id) => id !== index)
  }
  somethingChanged(): void {
    
    const filterResult = this.body.filter((ele, id) => {
      ele.poster.toLowerCase().includes(this.searchValue.toLowerCase())
    })
    console.log(filterResult);
    this.body = filterResult;
    
  }
  openAddPopup(): void {
    this.popup = !this.popup;
  }
  addAnItem(): void {
    const item = {
      time: this.time,
      reporter: this.reporter,
      poster: this.poster,
      content: this.content, 
    }
    this.body.push(item)
  }
  openEditPopup(item: any, index: number) {
    this.update = !this.update;
      this.timeUpate = item.time;
      this.reporterUpate = item.reporter;
      this.posterUpate = item.poster;
      this.contentUpate = item.content;
      this.currentItemNeededUpdate = index
    
  }
  updateAnItem() {
    const item = {
      time: this.timeUpate  ,
      reporter: this.reporterUpate ,
      poster: this.posterUpate ,
      content: this.contentUpate , 
    }
   

      if(this.currentItemNeededUpdate !== undefined) {
        console.log(
          item, this.currentItemNeededUpdate
        );
        this.body[this.currentItemNeededUpdate].time = this.timeUpate ;
        this.body[this.currentItemNeededUpdate].reporter = this.reporterUpate ;
        this.body[this.currentItemNeededUpdate].poster = this.posterUpate ;
        this.body[this.currentItemNeededUpdate].content = this.contentUpate ;
      }
  }
}
