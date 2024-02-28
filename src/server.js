import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import openai from "openai"
import dotenv from "dotenv"

// load environment variables
dotenv.config()

// setup express app
const app = express()

// setup middleware to parse JSON bodies
app.use(bodyParser.json())

// setup CORS
app.use(cors())

// setup OpenAI API
openai.apiKey = process.env.OPENAI_API_KEY

// setup routes
// index route
app.get("/", (req, res) => {
  res.send("Welcome to the AI Chatbot API!")
})

// chat route
app.post("/chat", async (req, res) => {
  try {
    const response = await openai.ChatCompletion.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: req.body.message },
      ],
    })

    res.json({ message: response.data.choices[0].message.content })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "An error occurred" })
  }
})

const PORT = process.env.PORT || 1330

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
