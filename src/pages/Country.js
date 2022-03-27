import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryByName } from "../api/country";
import CountryDetails from "../components/CountryDetails";

function Country(){
    const {name} =useParams();
    const [countryDetails, setCountryDetails] = useState(null);
    useEffect(()=>{
        const countryData = getCountryByName(name);
        console.log(name, countryData);
        setCountryDetails(countryData);
    }, []);
    return (
        <Box>
            {!countryDetails && (
                <Box>
                    <Typography variant="h4"> No Country Data Found </Typography>
                </Box>
            )}
            {countryDetails && (
                <>
                    {(countryDetails || []).map((countryData, index) => {
                        return(
                            <CountryDetails countryData={countryData}  key = {index} />
                        )
                    })}
                </>
            )}
        </Box>
    )
}

export default Country;