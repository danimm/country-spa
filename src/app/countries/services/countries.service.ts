import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { Country } from "../interfaces/country";

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) {}

  searchCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${alphaCode}`

    return this.http
      .get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null))
      )
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`

    return this.http
      .get<Country[]>(url)
      .pipe(
        catchError( () => of([]))
      )
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`

    return this.http
      .get<Country[]>(url)
      .pipe(
        catchError( () => of([]))
      )
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`

    return this.http
      .get<Country[]>(url)
      .pipe(
        catchError( () => of([]))
      )
  }
}
