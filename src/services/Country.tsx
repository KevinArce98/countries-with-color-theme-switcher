import axios from "axios";
import Country from "../interfaces/Country.interface";

const baseURL = process.env.REACT_APP_COUNTRIES_URL_API;

const API = axios.create({
    baseURL
});

export const getAllCountries = async (): Promise<Country[] | null> => {
    try {
        const result = await API.get(`/all`);
        if (result.status === 200 && result.data) {
            return result.data;
        }
        return [];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getCountryByAlphaCode = async (alphaCode: string): Promise<Country | null> => {
    try {
        const result = await API.get(`/alpha/${alphaCode}`);
        if (result.status === 200 && result.data) {
            return result.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }

}