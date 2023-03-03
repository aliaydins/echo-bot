import axios from 'axios';

export const postChats = async (id, message) => {
	await axios
		.post(
			`http://localhost:8080/echo/${id}`,
			{ message },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		.then(function (r) {
			return { data: r.data, status: r.status };
		})
		.catch(function (err) {
			return { data: err?.data, status: err?.status };
		});
};
