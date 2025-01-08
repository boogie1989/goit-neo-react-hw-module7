import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
	baseURL: "https://677eebad94bde1c1252e023c.mockapi.io",
});

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
	try {
		const response = await api.get("/contacts");
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkAPI) => {
	try {
		const response = await api.post("/contacts", contact);
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
	try {
		await api.delete(`/contacts/${contactId}`);
		return contactId;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});
