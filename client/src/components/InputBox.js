import React, { useState } from "react"
import styled from "styled-components"

const Form = styled.form`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
  margin-right: 10px;
`

const Button = styled.button`
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
`

export default function InputBox({ onMessageSend, messages }) {
  const [message, setMessage] = useState("")

  const sendMessage = async (event) => {
    event.preventDefault()

    if (!message) return

    onMessageSend({
      role: "user",
      content: message,
    })

    // Make API call
    try {
      const response = await fetch("http://localhost:1330/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      })

      const data = await response.json()
      onMessageSend({ content: data.message, role: "assistant" })

      setMessage("")
    } catch (error) {
      console.error(error)
      onMessageSend({ content: "An error occurred", role: "assistant" })
    }
  }

  return (
    <Form onSubmit={sendMessage}>
      <Input
        id="inputbox"
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button type="submit">Send</Button>
    </Form>
  )
}
