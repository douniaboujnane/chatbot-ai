import React from "react"
import styled from "styled-components"

const ChatBoxContainer = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  border-radius: 5px;
`

const MessageContainer = styled.div`
  margin: 10px 0;
  text-align: ${(props) => (props.role === "assistant" ? "right" : "left")};
`

const Message = styled.div`
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.role === "assistant" ? "lightgrey" : "#007bff"};
  color: white;
`

export default function ChatBox({ messages }) {
  return (
    <ChatBoxContainer>
      {messages.map((message, index) => (
        <MessageContainer key={index} role={message.role}>
          <Message role={message.role}>
            {Array.isArray(message.content)
              ? message.content.map((item, idx) => <div key={idx}>{item}</div>)
              : String(message.content)}
          </Message>
        </MessageContainer>
      ))}
    </ChatBoxContainer>
  )
}
