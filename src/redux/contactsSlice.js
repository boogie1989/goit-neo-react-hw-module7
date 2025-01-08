import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsApi";

const contactsSlice = createSlice({
	name: "contacts",
	initialState: {
		items: [],
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchContacts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchContacts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addContact.pending, (state) => {
				state.loading = false;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.loading = false;
				state.items.push(action.payload);
			})
			.addCase(addContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteContact.pending, (state) => {
				state.loading = false;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.loading = false;
				state.items = state.items.filter((contact) => contact.id !== action.payload);
			})
			.addCase(deleteContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const selectContacts = (state) => state.contacts.items;
export const selectContactsLoading = (state) => state.contacts.loading;
export const selectContactsError = (state) => state.contacts.error;
export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector([selectContacts, selectNameFilter], (contacts, filter) => {
	return contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));
});

export default contactsSlice.reducer;
