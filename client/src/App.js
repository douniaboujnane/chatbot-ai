import React, { useState } from "react"
import styled from "styled-components"
import ChatBox from "./components/ChatBox"
import InputBox from "./components/InputBox"

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
        <InputBox onMessageSend={onMessageSend} messages={messages} />
      </Container>
    </div>
  )
}

export default App
