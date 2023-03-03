import React, { useState } from 'react';
import uuid from 'react-uuid';

const button = {
	width: '20%',
	height: 50,
	fontWeight: 'bold',
	borderRadius: 10,
	fontSize: 18,
	backgroundColor: '#222',
	borderWidth: 0,
	color: '#fff',
	margin: 10,
};

export default function UserLogin({ setUser }) {
	function handleSetUser() {
		const conversationId = uuid();
		localStorage.setItem('user', conversationId);
		setUser(conversationId);
	}

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<h1>This is start page</h1>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<button onClick={() => handleSetUser()} style={button}>
					Start Echo Bot
				</button>
			</div>
		</div>
	);
}
