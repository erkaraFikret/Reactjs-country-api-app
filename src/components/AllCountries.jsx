import React, { useState, useEffect } from "react";
import { apiURL } from './util/api';
import { Link } from "react-router-dom";

import SearchInput from "./SearchInput";
import FilterCountry from "./FilterCountry";


const AllCountries = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const getAllCountries = async () => {
        try {
            const res = await fetch(`${apiURL}/all`);
            if (!res.ok) throw new Error("Something went wrong!");
            const data = await res.json();
            console.log(data);
            setCountries(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const getCountryByName = async (countryName) => {
        try {
            const res = await fetch(`${apiURL}/name/${countryName}`)
            if (!res.ok) throw new Error('not found any country')
            const data = await res.json();
            setCountries(data)
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            setError(error.message)
        }
    }
    const getCountrByRegion = async (regionName) => {
        try {
            const res = await fetch(`${apiURL}/region/${regionName}`)
            if (!res.ok) throw new Error('Failed....')
            const data = await res.json()

            setCountries(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(false)
        }
    }

    useEffect(() => {
        getAllCountries();
    }, []);

    return (
        <div className="all-country-wrapper">
            <div className="country-top">
                <div className="search">
                    <SearchInput onSearch={getCountryByName} />
                </div>
                <div className="filter">
                    <FilterCountry onSelect={getCountrByRegion} />
                </div>
            </div>
            <div className="country-bottom">
                {isLoading && !error && <h4>Loading...</h4>}
                {error && !isLoading && <h4>{error}</h4>}
                {
                    countries?.map(country => (
                        <Link to={`/country/${country.name.common}`}>
                            <div className="country-card" key={country.area}>
                                <div className="country-img">
                                    <img src={country.flags[1]} alt="" />
                                </div>
                                <div className="country-data">
                                    <h3>{country.name.common}</h3>
                                    <h6>Population: {country.population}</h6>
                                    <h6>Region: {country.region}</h6>
                                    <h6>Capital: {country.capital}</h6>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default AllCountries;