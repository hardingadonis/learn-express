import express from 'express';

let app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
	{ id: 1, name: 'VuongLM3' },
	{ id: 2, name: 'HuyTD34' },
	{ id: 3, name: 'HieuNT2' },
	{ id: 4, name: 'TuanNT1' },
	{ id: 5, name: 'HaiNT1' },
	{ id: 6, name: 'HieuNT1' },
	{ id: 7, name: 'HuyTD33' },
	{ id: 8, name: 'HuyTD32' },
	{ id: 9, name: 'HuyTD31' },
];

app.get('/', (req, res) => {
	res.status(200).send('Hello ExpressJS');
});

app.get('/api/v1/users', (req, res) => {
	let {
		query: { filter },
	} = req;

	// when filter is undefined or null
	if (!filter) {
		return res.status(200).send(mockUsers);
	}

	// check filter with lower case string
	return res
		.status(200)
		.send(
			mockUsers.filter((user) =>
				user.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
			),
		);
});

app.get('/api/v1/users/:id', (req, res) => {
	let id = parseInt(req.params.id);

	console.log('id', id);

	if (isNaN(id)) {
		res.status(400).send({ msg: 'Invalid id' });
		return;
	}

	const user = mockUsers.find((user) => user.id === id);
	if (!user) {
		return res.sendStatus(404);
	}

	res.status(200).send(user);
});

app.post('/api/v1/users', (req, res) => {
	const { body } = req;

	let newUser = {
		id: mockUsers.length + 1,
		...body,
	};

	mockUsers.push(newUser);

	console.log('Created new user: ', newUser);

	return res.sendStatus(201);
});

app.put('/api/v1/users/:id', (req, res) => {
	const {
		body,
		params: { id },
	} = req;

	const parsedId = parseInt(id);

	if (isNaN(parsedId)) {
		return res.sendStatus(400);
	}

	const userIndex = mockUsers.findIndex((user) => user.id === parsedId);

	if (userIndex === -1) {
		return res.sendStatus(404);
	}

	mockUsers[userIndex] = {
		id: parsedId,
		...body,
	};

	return res.sendStatus(200);
});

app.patch('/api/v1/users/:id', (req, res) => {
	const {
		body,
		params: { id },
	} = req;

	const parsedId = parseInt(id);

	if (isNaN(parsedId)) {
		return res.sendStatus(400);
	}

	const userIndex = mockUsers.findIndex((user) => user.id === parsedId);

	if (userIndex === -1) {
		return res.sendStatus(404);
	}

	mockUsers[userIndex] = {
		...mockUsers[userIndex],
		...body,
	};
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
