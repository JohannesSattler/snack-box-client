import { CardMedia, Container, Divider, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'

const blog = [
    {
        image: 'https://i.pinimg.com/originals/9f/a8/98/9fa8980f4de428e6160e97f5fe832599.jpg', 
        header: 'Cookies Are Awesome and you know that!', 
        paragraps: [
            { subtitle: 'Cookies are great Stuff', body: 'Cookies cookies cookies cookies cookies cookies cookies cookies cookies and much more Cookies!'},
            { subtitle: 'So Why that is?', body: 'Seriously, is there anyone out there who doesn’t love cookies? If there is, we haven’t met one yet. Not only are cookies delicious, eating them will just make you feel good (unless, of course, you eat too many and give yourself a stomach ache)! Here are seven reasons that cookies are not only good for your taste buds, they’re also good for your soul.'},
            { subtitle: 'There are so many options and varieties', body: 'One of the absolute best things about cookies is the sheer variety. There is a cookie out there for everyone. Whether you like the classic chocolate chip, the healthy oatmeal raisin, the colorful sugar cookie, or even something that combines sweet and salty, no matter what your taste buds are craving, there is a cookie for you. Not only does this make cookies the perfect desert (they’re perfect for sharing!), it also means you’ll never get sick of them.'},
            { subtitle: 'They’re perfect for on the go', body: 'Have you ever tried to take a piece of cake home from a restaurant or pack an ice cream cone in your lunch? It’s not so easy. One of the reasons cookies are so great are because they’re super easy to take with you anywhere, anytime. Put a few in a plastic baggie, and you’re good to go. Best of all, if you don’t eat them, you can bring them home and save them for later.'},
            { subtitle: 'Their designs will make you smile', body: 'Cookies come in all shapes, sizes, patterns, and colors. People tend to get very creative with their cookie designs, and you can always find a cute cookie to make you smile. There are cookies with company logos, cookies decorated like fried eggs and bacon, cookies for sports fans, cookies for girly girls and everything in between. Whatever your interests are, you’re sure to be able to find a cookie that represents it.'},
            { subtitle: 'They will help you make friends', body: 'Since cookies are the perfect portion size and because they’re so easy to take on the go, this means they are also the perfect dessert to share. Hand over a cookie to someone who looks like they could use a good snack or a little cheering up, and you’re sure to make a new friend for life.'},
            { subtitle: 'There’s nothing better than a warm cookie right out of the oven', body: 'Ask anyone what dessert they remember most from their childhood, and there’s a good chance they’ll say cookies and milk. We’re not quite sure why cookies dipped in milk tastes so good, but we do know that as a kid, it was our favorite. Even though it’s not a desert that adults tend to eat as much (unless they’re eating it with their kids), we’re certain that any time you do, it will bring you right back to your childhood kitchen table.'},
            { subtitle: 'You can feel like you’re eating something healthy (sometimes)', body: 'Just because you’re eating a cookie doesn’t mean you’re eating something that’s not good for you. There are a lot of healthy cookie options out there. There are vegan cookies, oatmeal raisin cookies, whole wheat cookies, and even breakfast cookies with grains, nuts, and dried fruit. If you think of cookies as only an unhealthy desert, well, think again!'},
        ]
    },
    {
        image: 'https://empoweredmastery.com/wp-content/uploads/2016/09/eat-food.jpg', 
        header: '5 Reasons Why You Should Eat More Snacks', 
        paragraps: [
            { subtitle: '', body: `Snacks are great. They're delicious, they fill you up and they give you the energy that you need to keep going throughout your day. But there's one more reason why snacks are awesome - they're good for your health! Find out 5 reasons why eating snacks is beneficial for everyone in this blog post!`},
            { subtitle: `Eating snacks can help you stay full longer`, body: `Snack throughout the day to keep your blood sugar levels stable. If you eat small meals, your body starts releasing insulin (a hormone that helps turn sugar into energy) which leads to a crash in blood sugar and hunger pangs again. Eating snacks between these smaller meals will help ensure an even supply of nutrients with no peaks or lulls in your energy levels.`},
            { subtitle: `Snacking is a good way to get more nutrients into your diet on the go`, body: `Snacks are the perfect way to get more nutrients into your diet as you're moving from place to place during the day. When you eat a meal, it takes around 20 minutes for your stomach to tell your brain that you're full. And if you wait too long between meals then hunger pangs can be even stronger and harder to control. Snacks are the perfect way to keep yourself feeling full until your next meal.`},
            { subtitle: `Snacking can give you more energy throughout the day`, body: `Snacking is a great way of giving your body quick boosts of energy when you're running low on fuel, especially in the mid-afternoon slump where many people's blood sugar levels drop. Eating something small and healthy like a piece of fruit or a handful of nuts can give you the energy you need to power through the rest of your day.`},
            { subtitle: `Snacking can help you maintain a healthy weight`, body: `If you're trying to lose weight, snacking can actually be really helpful! By eating small snacks throughout the day instead of three large meals, you're not putting as much strain on your digestive system and you're less likely to overeat. It's a good idea to try eating three main meals per day, but keep snacking in reserve for those days when hunger pangs are stronger or if you need the energy boost.`},
            { subtitle: `Snacks can give you more control over your cravings`, body: `Some people find that if they snack throughout the day, they're less likely to crave unhealthy foods like candy bars or chips. When you wait too long between meals, your blood sugar levels drop and your body starts looking for a quick source of energy. If you have healthy snacks on hand then you'll be less likely to reach for something unhealthy when those cravings strike.`},
            { subtitle: `Final thoughts`, body: `So there you have it - five reasons why you should eat more snacks! Snacks are a great way to keep yourself feeling full, get more nutrients into your diet and maintain a healthy weight. They can also help control cravings for unhealthy foods, so make sure to stock up on some healthy snacks for when hunger strikes!`},
        ]
    },
    {
        image: 'https://www.thelocal.de/wp-content/uploads/2019/08/b08c6fe9ba475c54cc455937c0eeb204e7f97c4d4935100e27f7d98a2f11979e-646x402.jpg', 
        header: 'The Perfect Summer Treat: Delicious Ice Cream', 
        paragraps: [
            { subtitle: ``, body: `Ice cream is one of the most universal summer treats. Every culture has something that they love about this frozen dessert, and everyone can agree on how delicious it tastes. `},
            { subtitle: `What is ice cream made of?`, body: `Ice cream is made from milk, sugar and eggs. Most people are surprised to learn that vanilla ice cream actually doesn't contain any natural vanilla flavor at all! Instead it contains vanillin which is simply a chemical derived from the bark of an African evergreen tree. `},
            { subtitle: `What makes ice cream so delicious?`, body: `The secret to making really delicious ice cream is in the recipe and in the process. The milk and sugar are heated to a high temperature so that they form a thick custard. This custard is then cooled down slowly which allows it to thicken even more. It's this thickened custard that gives ice cream its creamy texture. Finally, the eggs help to give the ice cream a stable structure and prevent it from freezing too solid. `},
            { subtitle: ``, body: `So the next time you're enjoying a bowl of your favorite ice cream, take a moment to appreciate all of the hard work that went into making it so delicious!`},
            { subtitle: `How to make your own ice cream`, body: `Making your own ice cream is a great way to save money and enjoy some truly delicious flavors. All you need is an electric mixer, a large metal bowl and at least two kinds of ingredients (one for the custard base and one for whatever flavor you want). The process involves heating up the milk and sugar together until they form into a thick custard, then adding in the flavor ingredients and freezing it all in an ice cream maker. It's really that easy! `},
            { subtitle: ``, body: `So why not give it a try? The next time you have a craving for some delicious ice cream, make your own at home instead of buying it from the store. You'll be surprised at how much better it tastes!`},
            { subtitle: `Tips for making the perfect summer treat - delicious ice cream!`, body: ``},
            { subtitle: ``, body: `- Use high quality ingredients for the best flavor.`},
            { subtitle: ``, body: `- Make sure to heat the milk and sugar together until they form a thick custard.`},
            { subtitle: ``, body: `- Add in your favorite flavor ingredients and freeze in an ice cream maker.`},
            { subtitle: ``, body: `- Enjoy!`},
            { subtitle: `The best flavors of ice cream and toppings to pair with them`, body: `There are endless flavor possibilities when it comes to ice cream, but some of the most popular ones include vanilla, chocolate, strawberry and mint. As for toppings, everyone has their own favorites. Some people love a good old fashioned hot fudge sundae while others prefer fresh fruit or whipped cream. The sky's the limit when it comes to making your own ice cream creations!`},
            { subtitle: `Do you have a favorite flavor or topping?`, body: `Believe it or not, ice cream can actually be a healthy snack! It's a good source of protein and calcium, and it also contains antioxidants which can help to protect your body from disease. But the best reason to have a bowl of ice cream before bedtime is because it's delicious and relaxing. The sugar content will help to release serotonin in your brain, which is a hormone that promotes feelings of happiness and relaxation. So if you're looking for a way to wind down after a long day, indulge in a bowl of your favorite ice cream!`},
            { subtitle: `Health benefits from eating more ice cream`, body: `- It contains antioxidants which can help to protect your body from disease.`},
            { subtitle: ``, body: `- Ice cream is a good source of protein and calcium.`},
            { subtitle: ``, body: `- The sugar content releases serotonin in your brain, promoting feelings of happiness and relaxation.`},
            { subtitle: ``, body: `- Indulging in a bowl of ice cream before bedtime can be a healthy way to wind down after a long day.`},
            { subtitle: ``, body: `- Ice cream is a delicious and relaxing way to end the day!`},
        ]
    },
    
    
]

function BlogPage(props) {
    const params = useParams()
    
    const {image, header, paragraps} = blog[params.id-1]

    useEffect(() => window.scrollTo(0, 0), [])

    return (
        <>
        <Container maxWidth="lg" component={Paper} sx={{padding: '50px', backgroundColor: '#fff', filter: 'drop-shadow(0 0 5px gray)'}}>
            <CardMedia
                component="img"
                style={{objectFit: 'contain', opacity: '1', borderRadius: '50px', maxHeight: '400px'}}
                image={image}
                alt="snackbox_logo"
            />
            <br/>
            <br/>
            <br/>
            <Typography align="left" variant='h1'>{header}</Typography>
            <br/>
            <Divider/>
            <br/>
            <br/>
            <br/>
            <br/>
            {
                paragraps.map(paragrap => {
                    return (
                        <>
                            <Typography align="left" variant="h5">
                                <b>{paragrap.subtitle}</b>
                            </Typography>
                            <br/>
                            <Typography align="left" variant="body1">
                                {paragrap.body}
                            </Typography>
                            <br/>
                        </>
                    )
                })
            }

        </Container>
        <br/>
        <br/>
        <Footer/>
        </>
    )
}

export default BlogPage
