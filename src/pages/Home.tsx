// Hooks
import React, { useEffect, useRef, useState } from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';

// Components
import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";

// Interfaces
import Country from "../interfaces/Country.interface";

// Services
import { getAllCountries } from "../services/Country";
import CountryCard from "../components/CountryCard";
import FontAwesomeIcon from "../components/FontAwesomeIcon";
import Loading from "../components/Loading";


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
        const countriesFiltered = stateCountries.current.filter(country => {
            if (regionSelected) {
                return country.name.toLowerCase().includes(value.toLowerCase()) && country.region === regionSelected;
            }
            return country.name.toLowerCase().includes(value.toLowerCase());
        });
        setCountries(countriesFiltered);
        setIsLoading(false);
    }

    const handleChangeFilterByRegion = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setIsLoading(true);
        const region: any = e.target.value;
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
                <TextField
                    id="search"
                    label="Search for a country..."
                    variant="filled"
                    fullWidth
                    onChange={searchingCountries}
                    value={searchValue}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon type="fal" iconName="fa-search" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6} className="md:text-right">
                <FormControl variant="filled" className="w-44">
                    <InputLabel id="filter-region-label">Filter by Region</InputLabel>
                    <Select
                        labelId="filter-region-label"
                        id="filter-region"
                        value={regionSelected}
                        onChange={handleChangeFilterByRegion}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Africa">Africa</MenuItem>
                        <MenuItem value="Americas">Americas</MenuItem>
                        <MenuItem value="Asia">Asia</MenuItem>
                        <MenuItem value="Europe">Europe</MenuItem>
                        <MenuItem value="Oceania">Oceania</MenuItem>
                    </Select>
                </FormControl>
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
