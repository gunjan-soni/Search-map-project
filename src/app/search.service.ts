import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url = 'https://jusbid.in:1337/get-states';

  constructor(private http: HttpClient) { }

  getSearches(data:any) {
    return this.http.get(this.url)
  }
}
