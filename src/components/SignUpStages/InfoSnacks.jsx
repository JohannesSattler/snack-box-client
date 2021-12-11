import React, {useState, useEffect, useContext} from 'react'
import { Button, Alert, Container, Slider, Typography, ToggleButtonGroup, ToggleButton, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../context/UserContext";

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
        props.onFormSubmit(e, {snackInfo: form, signupStage: 2})
    }

    return (
        <Container maxWidth="xl">
            <Typography id="input-slider" gutterBottom>
                Amount of People
            </Typography>
            <Slider
            onChange={handleInputChange}
            name="amountPeople"
            defaultValue={1}
            step={1}
            marks
            min={0}
            max={8}
            valueLabelDisplay="auto"
            />

            <Typography id="input-slider" gutterBottom>
                How often do you snack a day?
            </Typography>
            <ToggleButtonGroup
            color="primary"
            exclusive
            value={alignment}
            name='perDay'
            onChange={handleAlignmentChange}
            >
                <ToggleButton name='perDay' value="not-often">not often</ToggleButton>
                <ToggleButton name='perDay' value="often">often</ToggleButton>
                <ToggleButton name='perDay' value="all-the-time">All the time</ToggleButton>
            </ToggleButtonGroup>
            
            <Typography id="input-slider" gutterBottom>
                What type of snacks do you like?
            </Typography>
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

            <br/>
            {
                error ? (
                    <Alert style={{maxWidth: '500px', margin: '0 auto'}} variant="filled" severity="error">
                        {error}
                    </Alert>
                ) : (<></>)
            }
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
