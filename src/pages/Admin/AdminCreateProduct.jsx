import { Alert, Button, CardMedia, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'

const randomIngredients = [
    'Enriched flour (wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid), palm oil, water, sugar, onion powder, maltodextrin, dextrose, whey (milk), salt, vinegar powder (maltodextrin, modified corn starch, vinegar), honey powder, hydrolyzed soy protein, mustard [(vinegar, water, mustard, salt, turmeric), maltodextrin, corn starch], wheat starch, yeast, spices, extract of turmeric, citric acid, horseradish powder, natural flavors, soda.',
    'Sugar, cocoa butter, whole milk powder, hazelnuts (14%), almonds, cocoa mass, vanilla extract, minimum solids in the chocolate: cocoa 39%, milk 20%.',
    'Tepary beans flour (43%), vegetable oil (peanut, corn & cotton seed), chickpeas flour (12%), salt, black pepper powder, ginger powder, mace powder, nutmeg powder and cardamom powder.',
    'Organic whole wheat flour (graham flour), organic wheat flour, organic cane sugar, organic sunflower oil, organic honey, leavening (baking soda, ammonium bicarbonate, cream of tartar), organic molasses, sea salt, organic brown sugar, organic dried molasses, natural flavor, mixed tocopherols (vitamin e) to protect flavor, organic rosemary extract.',
    'Sugar, semisweet chocolate (sugar, unsweetened chocolate processed with alkali (cocoa mass), cocoa butter, milk fat, soy lecithin (emulsifier), and natural flavors), butter (cream, salt), palm oil, corn syrup, soy lecithin (emulsifier), oil of peppermint (natural flavor), vanilla (natural flavor), vegetable juice color and caramel color.',
    'Corn syrup, sugar, partially hydrogenated vegetable oil (contains one or more of the following: palm kernel, palm, soybean), cocoa, nonfat dry milk, lactose, milk protein concentrate, egg albumen. soya lecithin, soya protein, artificial flavor, salt.',
    'Glucose syrup, sugar, vegetable oil, (hydrogenated palm kernel oil, palm kernel oil), less than 2% of gelatin, mango puree, malic acid, citric acid, natural and artificial flavors, sucrose fatty acid esters, sorbitan monostearate, beta-carotene (color), s',
    'Glucose syrup, sugar, hydrogenated palm kernel oil, gelatin, apple concentrated juice, dl-malic acid, citric acid, natural and artificial flavors, emulsifiers (sucrose fatty acid esters, sorbitan monostearate)',
    'Potatoes, canola oil, maltodextrin, sea salt, vinegar powder, malic acid, citric acid, salt, dextrose, acetic acid, sugar, apple cider vinegar powder.',
    'Dried potato, rice flour, sunflower and/or safflower oil, seasoning (salt, sugar, autolyzed yeast extract, whey powder [milk], maltodextrin, spice, buttermilk powder, tomato powder, citric acid, onion powder, ascorbic acid, gum arabic, paprika oleoresin [color], cheddar cheese [milk, cultures, salt, enzymes], natural flavors, vinegar, garlic powder, annatto [color]), potato starch.',
]

function seedRemainingData() {
    const data = {
        palmOil: Math.random() > 0.5 ? "true" : "false",
        fat: Math.random() > 0.5 ? "high" : "low",
        salty: Math.random() > 0.5 ? "true" : "false",
        saturatedFat: Math.random() > 0.5 ? "high" : "low",
        sugars: Math.random() > 0.5 ? "high" : "low",
        ingredients: randomIngredients[Math.floor(Math.random() * randomIngredients.length)],
        nutriScore: Math.random() > 0.5 ? "A" : "C",
        nutrtionTable: {
            energy: Math.random() * 3,
            energyUnit: 'kcal',
            fat: Math.random() * 3,
            fatUnit: 'g',
            salt: Math.random() * 3,
            saltUnit: 'g',
            sugars: Math.random() * 3,
            sugarsUnit: 'g',
            proteins: Math.random() * 3,
            proteinsUnit: 'g',
            carbohydrates: Math.random() * 3,
            carbohydratesUnit: 'g',
            calcium: Math.random() * 3,
            calciumUnit: 'mg',
            fiber: Math.random() * 3,
            fiberUnit: 'g',
        }
    }
    return data
}

function AdminCreateProduct() {
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        image: '',
        describtion: '',
        name: '',
        brand: '',
        price: 0,
        vegan: '',
        vegetarian: '',
        sweet: '',
        salt: '',
        organic: ''
    });

    const {         
        image,
        describtion,
        name,
        brand,
        price,
        vegan,
        vegetarian,
        sweet,
        salt,
        organic
    } = form;

    async function handleFormSubmission(event) {
        event.preventDefault();

        const data = {
            image,
            name,
            describtion,
            brand,
            price: Number(price),
            vegan: vegan==="true",
            vegetarian: vegetarian==="true",
            sweet: sweet==="true",
            salt: salt==="true",
            organic: organic==="true",
        };

        const random = seedRemainingData()
        const newData = {...data, ...random}
        console.log(newData)

        const base_url = process.env.REACT_APP_API_BASE_URL
        const response = await axios.post(base_url + '/admin/product/create', newData)
        console.log(response)
    }    

    function handleInputChange(event) {
        const { name, value } = event.target;
        return setForm({ ...form, [name]: value });
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{my: 3, paddingTop: '10px', backgroundColor: '#f7f7f7', filter: 'drop-shadow(0 0 5px gray)'}}>
          <Typography variant="h4" className='color-text'><b>Create a product</b></Typography>
          <Divider/>
          <Box component="form" onSubmit={handleFormSubmission} noValidate sx={{ mt: 1}}>
            <TextField
                margin="dense"
                label="image"
                name="image"
                fullWidth
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
                placeholder='please provide url'
              />
            <TextField
                margin="dense"
                label="describtion"
                name="describtion"
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
                fullWidth
                multiline
                placeholder='please provide a description'
              />
              <TextField
                margin="dense"
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
              />
              <TextField
                margin="dense"
                id="brand"
                label="brand"
                name="brand"
                autoComplete="brand"
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
              />
             <TextField
                margin="dense"
                id="price"
                type="number"
                label="price"
                name="price"
                defaultValue={0}
                autoComplete="number"
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
              />
              <TextField
                margin="dense"
                label="vegan"
                name="vegan"
                defaultValue={false}
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
                placeholder='true or false'
              />
              <TextField
                margin="dense"
                label="vegetarian"
                name="vegetarian"
                defaultValue={false}
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
                placeholder='true or false'
              />
              <TextField
                margin="dense"
                label="sweet"
                name="sweet"
                defaultValue={false}
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
                placeholder='true or false'
              />
              <TextField
                margin="dense"
                label="salt"
                name="salt"
                defaultValue={false}
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
                placeholder='true or false'
              />
              <TextField
                margin="dense"
                label="organic"
                name="organic"
                defaultValue={false}
                onChange={handleInputChange}
                style={{marginRight: 2}}
                variant="standard"
                placeholder='true or false'
              />
            {error && (
              <Alert severity="error">{error.message}</Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Save
            </Button>
          </Box>
          <br/>
      </Container>
    )
}

export default AdminCreateProduct
