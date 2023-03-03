import React, { useEffect, useState, useRef } from 'react';
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import UserLogin from './UserLogin';
import { getChatFromBackends } from '../service/getChatFromBackends';
import { postChats } from '../service/postChats';

export default function ChatContainer() {
	const [chats, setChats] = useState([]);
	const [user, setUser] = useState(localStorage.getItem('user'));
	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	async function getChat() {
		const { data, status } = await getChatFromBackends(user);
		if (status === 200) {
			setChats(data);
		} else {
			console.log('not found any data with user ');
		}
	}

	useEffect(() => {
		scrollToBottom();
	}, [chats]);

	useEffect(() => {
		getChat();
	}, [user]);

	function logout() {
		localStorage.removeItem('user');
		setUser('');
	}

	async function addMessage(chat) {
		await postChats(user, chat);
		setChats([
			...chats,
			{ user, userMessage: chat, echoMessage: null },
			{ user, userMessage: null, echoMessage: chat },
		]);
	}

	function ChatsList() {
		return (
			<div style={{ height: '75vh', overflow: 'scroll', overflowX: 'hidden' }}>
				{chats.map((chat, index) => {
					if (chat.user === user && chat.userMessage !== null)
						return <ChatBoxSender key={index} message={chat.userMessage} user={'User'} />;
					return <ChatBoxReciever key={index} message={chat.echoMessage} user={'Echo Bot'} />;
				})}
				<div ref={messagesEndRef} />
			</div>
		);
	}

	return (
		<div>
			{user ? (
				<div>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<h4>conversation-id: {user}</h4>
						<p onClick={() => logout()} style={{ color: 'blue', cursor: 'pointer' }}>
							log out
						</p>
					</div>

					<ChatsList />

					<InputText addMessage={addMessage} />
				</div>
			) : (
				<UserLogin setUser={setUser} getChat={getChat} />
			)}
		</div>
	);
}
