const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const corsOption = {
	origin: true,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: false,
	exposedHeaders: ['x-auth-token'],
};

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb+srv://admin:test@cluster0.rf7yp.mongodb.net/jobs?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

const jobsSchema = {
	title: String,
	salary: Number,
	rating: Number,
	location: String,
	description: String,
	companyName: String,
	companySize: Number,
	industry: String,
	status: String,
};
const companySchema = {
	name: String,
};

const contactSchema = {
	phoneNumber: String,
};

const userSchema = {
	email: String,
	jobs: [jobsSchema],
	contacts: [contactSchema],
};

const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Company = mongoose.model('Company', companySchema);

app.route('/api/v1/contacts')
	.post(async function (req, res) {
		const { phoneNumber } = req.body;
		try {
			const newContact = new Contact({
				phoneNumber: phoneNumber,
			});
			newContact.save();
			res.send(`Contact with phone number ${phoneNumber} Successfully Created`);
		} catch (err) {
			res.send('error ', err.message);
		}
	})
	.get(async function (req, res) {
		try {
			const contacts = await Contact.find({});
			res.send(contacts);
		} catch (err) {
			res.send('error', err.message);
		}
	});

app.route('/api/v1/contacts/:id')
	.patch(async function (req, res) {
		try {
			const { id } = req.params;
			const { phoneNumber } = req.body;
			const updatedContact = await Contact.findOneAndUpdate({ _id: id }, { phoneNumber: phoneNumber }, { new: true });
			res.send(updatedContact);
		} catch (err) {
			res.send('error ', err.message);
		}
	})
	.get(async function (req, res) {
		const { id } = req.params;
		try {
			const contact = await Contact.findOne({ _id: id });
			res.send(contact);
		} catch (err) {
			res.send('error ', err.message);
		}
	})
	.delete(async function (req, res) {
		const { id } = req.params;
		try {
			await Contact.deleteOne({ _id: id });
			res.send(`Contact ${id} Successfully Deleted`);
		} catch (err) {
			res.send('error ', err.message);
		}
	});

app.route('/api/v1/companies').post(async function (req, res) {
	const { companyName } = req.body;
	try {
		const newCompany = new Company({
			name: companyName,
		});
		newCompany.save();
		res.send(`Company ${companyName} Successfully Created`);
	} catch (err) {
		res.send('error ', err.message);
	}
});

app.route('/api/v1/companies/:ID').delete(async function (req, res) {
	const { ID } = req.params;
	try {
		await Company.deleteOne({ _id: ID });
		res.send(`Company ${ID} successfully deleted`);
	} catch (err) {
		res.send('error ', err.message);
	}
});

app.route('/api/v1/companies').get(async function (req, res) {
	try {
		const companies = await Company.find({});
		res.send({ companies });
	} catch (err) {
		res.send('error ', err.message);
	}
});

app.route('/api/v1/companies/:id').patch(async function (req, res) {
	try {
		const { id } = req.params;
		console.log('req.params', req.params);
		const { companyName } = req.body;
		const updatedCompany = await Company.findOneAndUpdate({ _id: id }, { name: companyName }, { new: true });
		res.send(updatedCompany);
	} catch (err) {
		res.send('error: ', err.message);
	}
});

app.route('/api/v1/users').get(async function (req, res) {
	try {
		const users = await User.find({});

		res.send(users);
	} catch (err) {
		res.send('error: ', err.message);
	}
});

app.route('/api/v1/users/:userId').patch(async function (req, res) {
	try {
		const { userId } = req.params;
		const { newJob } = req.body;

		const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $push: { jobs: newJob } }, { new: true });

		res.send(updatedUser);
	} catch (err) {
		res.send('error: ', err.message);
	}
});

app.listen(process.env.PORT || 3001, function () {
	console.log('Server started on port 3001.');
});
