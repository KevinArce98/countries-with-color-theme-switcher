// Hooks
import React, { useEffect, useRef, useState } from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';

// Components
import { Grid, Input, InputAdornment, Paper } from "@material-ui/core";
import CountryCard from "../components/CountryCard";
import FontAwesomeIcon from "../components/FontAwesomeIcon";
import Loading from "../components/Loading";

// Interfaces
import Country from "../interfaces/Country.interface";

// Services
import { getAllCountries } from "../services/Country";
import Filter from "../components/Filter";


const Home = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true
    });

    const [countries, setCountries] = useState<Country[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [regionSelected, setRegionSelected] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const stateCountries = useRef<Country[]>([]);

    useEffect(() => {
        gettingData();
    }, []);

    const gettingData = async () => {
        setIsLoading(true);
        const result = await getAllCountries();
        if (result) {
            setCountries(result);
            stateCountries.current = result;
        }
        setIsLoading(false);
    }

    const searchingCountries = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setIsLoading(true);
        const { value } = e.target;
        setSearchValue(value);
        const query = value.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const countriesFiltered = stateCountries.current.filter(country => {
            if (regionSelected) {
                return country.name.toLowerCase().includes(query) && country.region === regionSelected;
            }
            return country.name.toLowerCase().includes(query);
        });
        setCountries(countriesFiltered);
        setIsLoading(false);
    }

    const handleChangeFilterByRegion = (region: string) => {
        setIsLoading(true);
        setRegionSelected(region);

        if (region) {
            const countriesFiltered = stateCountries.current.filter(country => {
                if (searchValue) {
                    return country.region === region && country.name.toLowerCase().includes(searchValue.toLowerCase())
                }
                return country.region === region;
            });
            setCountries(countriesFiltered);
        }
        else {
            let countriesFiltered = stateCountries.current;
            if (searchValue) {
                countriesFiltered = stateCountries.current.filter(country => {
                    return country.name.toLowerCase().includes(searchValue.toLowerCase());
                });
            }
            setCountries(countriesFiltered);
        }
        setIsLoading(false);
    }

    return (
        <Grid container spacing={isMobile ? 8 : 2} className="md:p-16 p-5">
            <Grid item xs={12} md={6}>
                <Paper>
                    <Input
                        placeholder="Search for a country..."
                        inputProps={{ 'aria-label': 'search' }}
                        className="px-5 py-3"
                        fullWidth
                        onChange={searchingCountries}
                        value={searchValue}
                        disableUnderline
                        startAdornment={
                            (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon type="fal" iconName="fa-search" />
                                </InputAdornment>
                            )
                        }
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} className="md:text-right">
                <Filter regionSelected={regionSelected} changeRegion={handleChangeFilterByRegion}/>
            </Grid>

            {
                isLoading ?
                    <Loading />
                    :
                    countries.map(country => (
                        <Grid item xs={12} md={4} lg={3} key={country.alpha3Code}>
                            <CountryCard
                                country={country}
                            />
                        </Grid>
                    ))
            }
        </Grid>
    )
}

export default Home
