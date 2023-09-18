import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { CacheStore } from "../interfaces/cacheStore.interface";
import { Country } from "../interfaces/country";
import { Region } from "../interfaces/region.type";

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor (private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage() {
    if (localStorage.getItem('cacheStorage')) return

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

  searchCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${alphaCode}`

    return this.http
      .get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null))
      )
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(url)
      .pipe(
        catchError( () => of([])),
      )
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`
    return this
      .getCountriesRequest(url)
      .pipe(
        tap((countries) => {
          this.cacheStore.byCapital = { term, countries }
        }),
        tap(() => this.saveToLocalStorage())
      )
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`
    return this
      .getCountriesRequest(url)
      .pipe(
        tap((countries) => {
          this.cacheStore.byCountries = { term, countries }
        }),
        tap(() => this.saveToLocalStorage())
      )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`
    return this
      .getCountriesRequest(url)
      .pipe(
        tap((countries) => {
          this.cacheStore.byRegion = { region, countries }
        }),
        tap(() => this.saveToLocalStorage())
      )
  }
}
