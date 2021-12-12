import React, {useState, useEffect, useContext} from 'react'
import { Button, Alert, Container, Slider, Typography, ToggleButtonGroup, ToggleButton, Checkbox, FormControlLabel, TableContainer, Paper, TableBody, TableRow, TableCell, Grid, Divider } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../context/UserContext";
import { Box } from '@mui/system';

function InfoSnacks(props) {
    const {user, setUser} = useContext(UserContext)
    const [error, setError] = useState()
    const [form, setForm] = useState({
        perDay: 'not-often',
        amountPeople: 1,
        sweet: false,
        salty: false,
        organic: false,
        vegan: false,
        vegetarian: false,
    }) 
    const [alignment, setAlignment] = useState('not-often');

    const handleAlignmentChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        handleInputChange(event, 'perDay')
    };

    function handleInputChange(event, nameTemp=null) {
        let { name } = event.target;
        
        if(!nameTemp) {
            name = nameTemp
        }
        
        setError()
        return setForm({ ...form, [name]: event.target.value });
    }

    function handleCheckBoxChange(event) {
        setError()
        return setForm({ ...form, [event.target.name]: event.target.checked })
    }

    async function handleFormSubmit(e) {
        props.onFormSubmit(e, {snackInfo: form, signupStage: 1})
    }

    return (
        <Container maxWidth="xl">
            <Typography align="center" variant="h5" gutterBottom>
                What snacks do you like?
            </Typography>
            <Divider/>
            <Grid container sx={{p: 2}}>
                <Grid item xs={4}>
                    <Typography align="left" id="input-slider" gutterBottom>
                        How often do you snack a day?
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <ToggleButtonGroup
                    style={{float: 'right'}}
                    color="primary"
                    exclusive
                    value={alignment}
                    name='perDay'
                    onChange={handleAlignmentChange}
                    size="small"
                    >
                        <ToggleButton name='perDay' value="not-often">not often</ToggleButton>
                        <ToggleButton name='perDay' value="often">often</ToggleButton>
                        <ToggleButton name='perDay' value="all-the-time">All the time</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Divider/>

            <Grid container sx={{p: 2}}>
                <Grid item xs={8}>
                    <Typography align="left" id="input-slider" gutterBottom>
                        How many snack partners do you have?
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Slider
                    style={{width: '100%', float: 'right'}}
                    onChange={handleInputChange}
                    name="amountPeople"
                    defaultValue={1}
                    step={1}
                    marks
                    min={1}
                    max={8}
                    valueLabelDisplay="auto"
                    />
                </Grid>
            </Grid>
            <Divider/>

            <Grid container sx={{p: 2}}>
                <Grid item xs={7}>
                    <Typography align="left" id="input-slider" gutterBottom>
                        How do you want your snacks?
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Box style={{ float: 'right'}}>
                        <FormControlLabel
                            control={
                                <Checkbox onChange={handleCheckBoxChange} name="sweet" />
                            }
                            label="sweet"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox onChange={handleCheckBoxChange} name="salty" />
                            }
                            label="salty"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox onChange={handleCheckBoxChange} name="organic" />
                            }
                            label="organic"
                        />
                    </Box>
                </Grid>
            </Grid>
            <Divider/>

            <Grid container sx={{p: 2}}>
                <Grid item xs={8}>
                    <Typography align="left" id="input-slider" gutterBottom>
                        Are you vegetarian or vegan?
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Box style={{ float: 'right'}}>
                        <FormControlLabel
                            control={
                                <Checkbox onChange={handleCheckBoxChange} name="vegan" />
                            }
                            label="vegan"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox onChange={handleCheckBoxChange} name="vegetarian" />
                            }
                            label="vegetarian"
                        />
                    </Box>
                </Grid>
            </Grid>

            <br/>
            {
                error ? (
                    <Alert style={{maxWidth: '500px', margin: '0 auto'}} variant="filled" severity="error">
                        {error}
                    </Alert>
                ) : (<></>)
            }
            <Divider/>
            <Button
            type="submit"
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 1, mb: 2 }}
            >
            Save
            </Button>
        </Container>
    )
}

export default InfoSnacks
