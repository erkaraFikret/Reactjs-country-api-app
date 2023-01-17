import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiURL } from './util/api'
import { Link } from 'react-router-dom'

function CountryInfo() {
    const [country, setCountry] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const { countryName } = useParams()

    useEffect(() => {
        const getCountryByName = async () => {
            try {
                const res = await fetch(`${apiURL}/name/${countryName}`);

                if (!res.ok) throw new Error("Could not found!");

                const data = await res.json();

                setCountry(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };

        getCountryByName();
    }, [countryName]);
    return (
        <div className='country-info-wrapper'>
            <button><Link to="/">Back</Link></button>
            {isLoading && !error && <h4>Loading...</h4>}
            {error && !isLoading && <h4>{error}</h4>}
            {
                country?.map((country, index) => (
                    <div className="country-info-container" key={index}>
                        <div className="country-info-img">
                            <img src={country.flags[1]} alt="" />
                        </div>
                        <div className="country-info">
                            <h3>{country.name.common}</h3>
                            <div className="country-info-left">
                                <h5>Population: <span>{new Intl.NumberFormat().format(country.population)}</span></h5>
                                <h5>Region: <span>{country.region}</span></h5>
                                <h5>Sub Region: <span>{country.subRegion}</span></h5>
                                <h5>Capital: <span>{country.capital}</span></h5>
                            </div>
                        </div>


                    </div>
                ))
            }
        </div>
    )
}

export default CountryInfo