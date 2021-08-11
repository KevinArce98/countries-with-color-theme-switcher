// Components
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

// Interfaces
import Country from "../interfaces/Country.interface";

interface Props {
    country: Country;
}

const CountryCard = ({ country }: Props) => {
    return (
        <Link to={`/details/${country.alpha3Code}`}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        image={country.flag}
                        title={country.name}
                        className="h-60"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h5">
                            <strong>{country.name}</strong>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Population:</strong> {country.population}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Region:</strong> {country.region}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Capital:</strong> {country.capital}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

export default CountryCard
