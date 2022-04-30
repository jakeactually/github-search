import { useMemo } from "react";

export const emptyBike = {
    model: '',
    color: 'Red',
    location: '',
    reservations: [],
};

export const emptyUser = {
    mail: '',
    role: 'User',
    password: '',
    reservations: [],
};

export const loadUser = () => {
    const token = localStorage.getItem('token');

    if (token) {
        return JSON.parse(window.atob(token.split('.')[1]));
    } else {
        return null;
    }
};
