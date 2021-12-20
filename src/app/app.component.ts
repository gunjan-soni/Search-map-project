import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, pluck, switchMap } from 'rxjs';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  statesList: any = [];
  data: any =[];

  @ViewChild('searchForm') searchForm: NgForm | any;

  constructor(private searchService: SearchService) { }

  ngAfterViewInit(): void {

    this.searchService.getSearches(this.data).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.statesList = res.data
        console.log(this.statesList);

        this.statesList.forEach((state:any) => {
            if(state.code == 'DL'){
              console.log("State:", state);
            }
        });

      }
    })

    const formValue = this.searchForm.valueChanges;

    formValue.pipe(
      // map((data:any) => data.searchTerm),
      pluck('searchTerm'),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(data => this.searchService.getSearches(data))
    ).subscribe((res: any) => {
        console.log(res)
      })
  }
  title = 'SearchMap';
}
