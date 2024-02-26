import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import styled from "styled-components"
import ChatBox from "./ChatBox"
import InputBox from "./InputBox"

const Container = styled.div`
  width: 600px;
  margin: auto;
`

const Title = styled.h1`
  text-align: center;
`

function App() {
  const [messages, setMessages] = useState([])

  const onMessageSend = (message) => {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  return (
    <div>
      <Title>Chat with A.I</Title>
      <Container>
        <ChatBox messages={messages} />
        <InputBox onMessageSend={onMessageSend} />
      </Container>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
