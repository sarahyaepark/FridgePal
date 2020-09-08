# FridgePal

_Your virtual "fridge" to keep track of your groceries and give you recipes based on what you have_

* No more moldy, sad, forgotten veggies in your vegetable drawer!
* Great way to save $$ and reduce your food waste

## DEMO

* Login or Sign up with an email and password
<img width="300px" height="650px" src="./public/logIn.gif">

* Enter or delete the ingredients in your fridge in the "My Fridge" tab
* The "Recipes" tab will automatically generate results based off the current fridge
<img width="300px" height="650px" src="./public/appDemo.gif">


## Get Cookin!

Now that you've got the code, follow these steps to get acclimated:

* run npm install to get the node packages
* make a secrets file
* Create postgres database (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):

```
npm install
touch secrets.js
createdb FridgePal
```

* Go to https://spoonacular.com/food-api to generate your own Spoonacular API key!
* In your secrets file, input the following

```
const Spoonacular_API_KEY = "YOUR_KEY_HERE"
module.exports = Spoonacular_API_KEY
```


## Start

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

Enjoy!