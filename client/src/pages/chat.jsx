import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Navigation from '../components/navigation.component';
import ChatTab from '../components/chat-tab/chat-tab.component';
import ChatBody from '../components/chat-body.component';


const Chat = () => {

    return (
        <Row className="mt-3 w-100">
            <Navigation/>
            <Col xs={6} className="">
                    <ChatTab />
                    <ChatTab />
                    <ChatTab />
                    <ChatTab />
                    <ChatTab />
                    <ChatTab />
            </Col>
            <Col xs={4}>
            </Col>
        </Row>
    );
}

export default Chat;