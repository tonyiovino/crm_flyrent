import db from './db'

const state = {
	customers: [],
	loaded: false
}

const getters = {
	customers: state => state.customers,
	customersLoaded: state => state.loaded,
	customerById: state => id => {
		return state.customers.find(customer => customer.id === id)
	}
}

const mutations = {
	startLoading: state => {
		state.customers = []
		state.loaded = false
	},

	fail: state => {
		state.customers = []
		state.loaded = false
	},

	set_customers: (state, payload) => {
		state.customers = payload
		state.loaded = true
	},

	addTo_customers (state, payload) {
		state.customers.push(payload)
	},

	editFrom_customers: (state, payload) => {
		const index = state.customers.findIndex(customer => customer.id === payload.id)
		state.customers.splice(index, 1, payload)
	},
	
	deleteFrom_customers: (state, payload) => {
		state.customers = state.customers.filter(customer => customer.id !== payload)
	}
}

const actions = {
	loadCustomers: (context) => {
		db.loadData(context, 'customers')
	},

	addCustomer: (context, customer) => {
		return new Promise((resolve, reject) => {
			db.addItem(context, { collectionName: 'customers', item: customer })
			.then( data => resolve({ msg: 'Cliente aggiunto', ...data }) )
			.catch( err => reject(err) )
		})
	},

	deleteCustomer (context, customerId) {
		return new Promise((resolve, reject) => {
			db.deleteItem(context, { collectionName: 'customers', itemId: customerId })
			.then( data => resolve({ msg: 'Cliente rimosso', ...data }) )
			.catch( err => reject(err) )
		})
	},

	editCustomer: (context, { id, ...customer }) => {
		return new Promise((resolve, reject) => {
			db.editItem(context, { collectionName: 'customers', id, ...customer })
			.then( data => resolve({ msg: 'Cliente aggiornato', ...data }) )
			.catch( err => reject(err) )
		})
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}