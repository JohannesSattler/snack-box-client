import React, {useState, useEffect, useContext} from 'react'
import { Button, Alert, Container, Slider, Typography, ToggleButtonGroup, ToggleButton, Checkbox, FormControlLabel, TableContainer, Paper, TableBody, TableRow, TableCell, Grid, Divider } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../context/UserContext";
import { Box } from '@mui/system';
import { Bookmark, BookmarkBorder, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

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
            <Typography align="center" variant="body1" gutterBottom>
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
                        <ToggleButton name='perDay' value="not-often">not often 🤔</ToggleButton>
                        <ToggleButton name='perDay' value="often">often 🙂</ToggleButton>
                        <ToggleButton name='perDay' value="all-the-time">All the time 😁</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Divider/>

            <Grid container sx={{p: 2}}>
                <Grid item xs={4}>
                    <Typography align="left" id="input-slider" gutterBottom>
                        How many snack partners do you have?
                    </Typography>
                </Grid>
                <Grid item xs={8}>
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
                <Grid item xs={4}>
                    <Typography align="left" id="input-slider" gutterBottom>
                        How do you want your snacks?
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Box style={{ float: 'right'}}>
                        <FormControlLabel
                            sx={{borderRadius: '10px', padding: '5px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 2px gray)'}}
                            control={
                                <Checkbox 
                                onChange={handleCheckBoxChange} 
                                name="sweet" 
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={<CheckCircle />}
                                color="success"
                                />
                            }
                            label={
                                <>
                                    <img alt="sweet" src="https://www.pngitem.com/pimgs/m/132-1328245_sweet-png-image-with-transparent-background-big-candy.png" width="auto" height="50px"  style={{borderRadius:'10px'}}/>
                                    <Typography align="center" gutterBottom>
                                        <b>Sweet </b> 🍬
                                    </Typography>
                                </>
                            }
                        />

                        <FormControlLabel
                            sx={{borderRadius: '10px', padding: '5px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 2px gray)'}}
                            control={
                                <Checkbox 
                                onChange={handleCheckBoxChange} 
                                name="salty" 
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={<CheckCircle />}
                                color="success"
                                />
                            }
                            label={
                                <>
                                    <img alt="salty" src="https://www.pngall.com/wp-content/uploads/2/Salt-PNG-Pic.png" width="auto" height="50px" style={{borderRadius:'10px'}}/>
                                    <Typography align="center" gutterBottom>
                                        <b>Salty </b> 🍟
                                    </Typography>
                                </>
                            }
                        />

                        <FormControlLabel
                            sx={{borderRadius: '10px', padding: '5px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 2px gray)'}}
                            control={
                                <Checkbox 
                                onChange={handleCheckBoxChange} 
                                name="organic" 
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={<CheckCircle />}
                                color="success"
                                />
                            }
                            label={
                                <>
                                    <img alt="organic" src="https://png.pngitem.com/pimgs/s/160-1608909_what-we-do-organic-leaf-png-transparent-png.png" width="auto" height="50px" style={{borderRadius:'10px'}}/>
                                    <Typography align="center" gutterBottom>
                                        <b>Organic </b> 🌱
                                    </Typography>
                                </>
                            }
                        />
                    </Box>
                </Grid>
            </Grid>
            <Divider/>

            <Grid container sx={{p: 2}}>
                <Grid item xs={4}>
                    <Typography align="left" id="input-slider" gutterBottom>
                        Are you vegetarian or vegan?
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Box style={{ float: 'right'}}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                onChange={handleCheckBoxChange} 
                                name="vegan" 
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={<CheckCircle />}
                                color="success"
                                />
                            }
                            label="🌿 vegan"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox 
                                onChange={handleCheckBoxChange} 
                                name="vegetarian" 
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={<CheckCircle />}
                                color="success"
                                />
                            }
                            label="🐮 vegetarian"
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
