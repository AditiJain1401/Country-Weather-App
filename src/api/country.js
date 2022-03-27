import { request } from "../helper";

const COUNTRY_DETAILS_API_URL = "https://restcountries.com/v3.1";

export function getCountryDetails({countryName= ""}){
    return request({
        url:`${COUNTRY_DETAILS_API_URL}/name/${countryName}`,
        method:"get"
    });
}
export function saveCountryDetails(countryName, country){
    let countries = localStorage.getItem("countries");
    if (countries) {
        countries = JSON.parse(countries);  
        countries = {
                ...countries,
                [countryName.toLowerCase()]: country,
        };
    } 
    else {
    countries = { [countryName]: country };
    }
  localStorage.setItem('countries', JSON.stringify(countries));
}
export function getCountryByName(countryName=''){
    let countries= localStorage.getItem('countries');
    if(countries){
        countries = JSON.parse(countries);
        return countries[countryName.toLowerCase()];
    }
    return null;
}
