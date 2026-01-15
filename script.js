// User Management
class UserManager {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    register(name, email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already exists' };
        }
        
        const newUser = { id: Date.now(), name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true, user: newUser };
    }

    login(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
            return { success: true, user };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = '../index.html';
    }
}

// Trip Management
class TripManager {
    constructor() {
        this.trips = JSON.parse(localStorage.getItem('trips')) || [];
    }

    createTrip(tripData) {
        const trip = {
            id: Date.now(),
            ...tripData,
            expenses: [],
            createdAt: new Date().toISOString()
        };
        this.trips.push(trip);
        localStorage.setItem('trips', JSON.stringify(this.trips));
        return trip;
    }

    getTrips() {
        return this.trips;
    }

    getTrip(id) {
        return this.trips.find(trip => trip.id === parseInt(id));
    }

    addExpense(tripId, expense) {
        const trip = this.getTrip(tripId);
        if (trip) {
            expense.id = Date.now();
            expense.date = new Date().toISOString();
            trip.expenses.push(expense);
            localStorage.setItem('trips', JSON.stringify(this.trips));
            return expense;
        }
        return null;
    }
}

// Initialize managers
const userManager = new UserManager();
const tripManager = new TripManager();

// Utility Functions
function checkAuth() {
    if (!userManager.currentUser) {
        window.location.href = '../index.html';
    }
}

function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}