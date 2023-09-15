import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CountriesService } from "../../services/countries.service";
import { switchMap } from "rxjs/operators";
import { Country } from "../../interfaces/country";

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit{
  public country?: Country;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ alphaCode }) => this.countriesService.searchCountryByAlphaCode(alphaCode))
      )
      .subscribe( country => {
        if (!country) return this.router.navigateByUrl('')

        return this.country = country
      })
  }
}
