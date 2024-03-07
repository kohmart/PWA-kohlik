import React, { useContext, useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AppContext } from '../context/appContext';
import { addNotifications, resetNotifications } from '../features/userSlice';
import './Sidebar.css'

function Sidebar() {
    const user = useSelector((state) => state.user);
    const { socket, setMembers, members, setCurrentRoom, currentRoom, setRooms, privateMemberMsg, setPrivateMemberMsg } = useContext(AppContext);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            getRooms();
            socket.emit("new-user");
        }
    }, [])

    socket.off("new-user").on("new-user", (payload) => {
        // console.log(payload)
        setMembers(payload);
    });


    function getRooms() {
        fetch('https://pwa-chat-server.onrender.com')
        //fetch('http://localhost:3000//rooms')
            .then((res) => res.json())
            .then((data) => setRooms(data));
    }

    if (!user) {
        return <></>;
    }

    function joinRoom(room, isPublic = true) {
        if (!user) {
            return alert('please login');
        }
        socket.emit("join-room", room, currentRoom);
        setCurrentRoom(room);
        if (isPublic) {
            setPrivateMemberMsg(null);
        }
        //dispatch notifications
        dispatch(resetNotifications(room));

    }
    socket.off('notifications').on('notifications', (room) => {
        if (currentRoom != room) {
            dispatch(addNotifications(room));
        }

    })

    function handlePrivateMemberMsg(member) {
        setPrivateMemberMsg(member);
        const roomId = orderIds(user._id, member._id);
        joinRoom(roomId, false);
    }

    function orderIds(id1, id2) {
        if (id1 > id2) {
            return id1 + "-" + id2;
        } else {
            return id2 + "-" + id1;
        }
    }

    function handlePrivateMemberMsg(member) {
        setPrivateMemberMsg(member);
        const roomId = orderIds(user._id, member._id);
        joinRoom(roomId, false);
    }
    return <>
        <h2 className='side-margin'>Users</h2>
        {members.map((member) => (
            <ListGroup.Item key={member.id} style={{ cursor: "pointer" }} active={privateMemberMsg?._id == member?._id} onClick={() => handlePrivateMemberMsg(member)} disabled={member._id === user._id}>
                <Row>
                    <Col xs={9}>
                        {member.name}
                        {member._id === user?._id && " (You)"}
                    </Col>
                    <Col xs={1}>
                        <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>
                    </Col>
                </Row>
            </ListGroup.Item>
        ))}
    </>
}

export default Sidebar