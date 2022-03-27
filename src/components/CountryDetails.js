import {Box,
    Card,
    CardActions,
    CardContent,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {LoadingButton} from "@mui/lab"
import {request} from "../helper";

function CountryDetails({countryData}){

    const {
        name: {common},
        flags: {png : flagImg},
        capital= [] ,
    } = countryData || {};

    const [isLoading, setIsLoading]= useState(false);
    const [weatherData, setWeatherData]= useState(null);

    async function getWeatherDetails(){
        try{
            setIsLoading(true);
            const weatherData = await request(
                `http://api.weatherstack.com/current?access_key=15fe57216397dc86f6c1b3084da98bcc&query=${capital[0]}`
            );
            setWeatherData(weatherData.data);
        }
        catch (error){
            let message = "Something went wrong";
            if (error && error.message) {
                message = error.message;
            }
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        <Box m={1} p={1}>
            <Card elevation={6}>
                <CardContent>

                    <Box display="flex">
                        <Box width={0.1}>
                            <img src={flagImg} alt={common} style={{ width: "100px", height: 100 }} />
                        </Box>
                        <Box width={0.9}>
                            <Typography variant="h5">{common}</Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Box>
                            <Typography variant="subtitle2"></Typography>
                        </Box>
                        <Box display="flex" flexDirection="column">
                            {(weatherData && weatherData.current) && (
                             (Object.keys(weatherData.current) || [] ).map(key => {
                                return (
                                    <Box key = {key} display="flex">
                                        <Typography color="purple">{key}</Typography>
                                        <Typography>{weatherData.current[key]}</Typography>
                                    </Box>
                                )
                             })
                            )}
                        </Box>
                    </Box>
                </CardContent>

                <CardActions>
                    <LoadingButton
                        loading={isLoading}
                        variant="outlined"
                        disabled={!capital.length}
                        onClick={getWeatherDetails}
                    >
                        Weather
                    </LoadingButton>
                </CardActions>
            </Card>
        </Box>
    )
};

export default CountryDetails;