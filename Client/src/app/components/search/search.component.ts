import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  value= ''
  seachData(event: Event){
    this.value = (event.target as HTMLInputElement).value;
  }


}
