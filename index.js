const mongoose = require("mongoose")

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model")
// Import of the data from './data.json'
const data = require("./data.json")
mongoose.set("strictQuery", false)

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app"

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)

  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  // Iteration 2
  /* .then(() => {
    Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Boiled Egg",
      level: "Amateur Chef",
      ingredients: [
        "1 egg",
 
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
    })

      .then((newRecipe) => {
        console.log(newRecipe.title)
      })
      .catch((error) => {
        console.error("Error connecting to the database", error)
      })
 */
  // Iteration 3
  .then(() => {
    Recipe.insertMany(data)
      .then(
        data.forEach((element) => {
          console.log(`${element.title}`)
        })
      )
      //Iteration 4
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        ).then(() => console.log("update successful"))
      })
      .catch((error) => {
        console.error("Error connecting to the database", error)
      })

      //Iteration 5
      .then(() => {
        Recipe.deleteOne({ title: "Carrot Cake" }) // it doesnt work
        console.log("deleted")
      })
      .catch((error) => {
        console.error("Error connecting to the database", error)
      })

    setTimeout(() => {
      mongoose.connection.close()
      console.log("connection stop")
    }, 1500)
  })
