import axios from 'axios';

export const getChatFromBackends = async (id) => {
	const r = await axios.get(`http://localhost:8080/${id}`);
	return { data: r.data, status: r.status };
};
