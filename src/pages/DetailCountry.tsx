// Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';

// Components
import { Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "../components/FontAwesomeIcon";

// Services
import { getCountryByAlphaCode } from "../services/Country";
import Country from "../interfaces/Country.interface";

const DetailCountry = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true
    });

    const [country, setCountry] = useState<Country | null>(null);
    const params = useParams<any>();

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [params.alphaCode]);

    const getData = async () => {
        const result = await getCountryByAlphaCode(params.alphaCode);
        setCountry(result);
    }

    return (
        <Grid container spacing={isMobile ? 8 : 2} className="md:p-16 p-5">
            <Grid item xs={12}>
                <Link to="/">
                    <Button variant="contained" color="default">
                        <FontAwesomeIcon type="far" iconName="fa-long-arrow-alt-left" className="mr-2" style={{ fontSize: 20 }} />
                        Back
                    </Button>
                </Link>
            </Grid>
            {
                country &&
                <>
                    <Grid item xs={12} md={6}>
                        <img src={country.flag} alt={country.name} />
                    </Grid>
                    <Grid item xs={12} md={6} className="details">
                        <Typography variant="h4" className="title">{country.name}</Typography>
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={6}>
                                <Typography className="subtitle">
                                    <span className="font-semibold">Native Name:</span> {country.nativeName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className="subtitle">
                                    <span className="font-semibold">Top Level Domain:</span> {country.topLevelDomain}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className="subtitle">
                                    <span className="font-semibold">Population:</span> {new Intl.NumberFormat().format(country.population)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className="subtitle">
                                    <span className="font-semibold">Currencies:</span> {country.currencies.map(c => c.name).join(', ')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className="subtitle">
                                    <span className="font-semibold">Region:</span> {country.region}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className="subtitle">
                                    <span className="font-semibold">Languages:</span> {country.languages.map(l => l.name).join(', ')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography className="subtitle">
                                    <span className="font-semibold">Sub Region:</span> {country.subregion}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography className="subtitle">
                                    <span className="font-semibold">Capital:</span> {country.capital}
                                </Typography>
                            </Grid>
                        </Grid>

                        <div className="mt-20 md:flex items-center">
                            <Typography className="subtitle w-48">
                                <span className="font-semibold">Border Countries:</span>
                            </Typography>
                            <div className="countries-borders flex overflow-x-auto w-full pb-1">
                                {
                                    country.borders.map(countryLimit => (
                                        <div key={countryLimit} className="ml-3">
                                            <Link to={`/details/${countryLimit}`}>
                                                <Button className="mr-2" variant="contained" size="small">
                                                    {countryLimit}
                                                </Button>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Grid>
                </>
            }
        </Grid>
    )
}

export default DetailCountry
