import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Paper} from "@mui/material";
import { useNavigate } from "react-router-dom"

import { getCountryDetails, saveCountryDetails } from "../api/country";

function Home(){

    const [countryInput, setCountryInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    useEffect(()=>{
        return ()=>{
            setCountryInput("")
        }
    }, [])

    async function onSearchClick(){
        try{
            setIsLoading(true);
            const res = await getCountryDetails({countryName: countryInput});
            if(res.data){
                saveCountryDetails(countryInput, res.data);
                navigate(`country/${countryInput.toLowerCase()}`)
            }
            console.log(res.data);
        }
        catch(error){
            console.log(error);
            let message = "Something went wrong";
            if(error && error.message){
                error.message =message;
            }
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        <Box
        height="90vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        >
            <Box width={0.3} display="flex" flexDirection="column">
                <Paper elevation={6}>
                  <Box py={4} px={2}>
                    <Box m={1}>
                      <h5>
                        Search country
                      </h5>
                    </Box>
                    <Box m ={1}>
                      <TextField 
                          inputProps={{'data-testid': 'asteroid-text-box'}}
                          size="small"
                          variant="outlined"
                          placeholder="Enter Country Name"
                          value={countryInput}
                          onChange={(e)=>setCountryInput(e.target.value)}
                          fullWidth
                      />
                    </Box>  
                    <Box m ={1}> 
                      <LoadingButton
                        loading={isLoading}
                        variant="outlined"
                        disabled={!countryInput.length}
                        onClick={onSearchClick}
                        fullWidth
                        data-testid='get-asteroid-button'
                      >
                        Search
                      </LoadingButton>
                    </Box>
                  </Box>
                </Paper>
            </Box>
        </Box>
    );
}

export default Home;