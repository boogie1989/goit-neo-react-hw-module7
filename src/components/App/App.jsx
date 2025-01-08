import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contactsApi";
import { selectFilteredContacts, selectContactsLoading, selectContactsError } from "../../redux/contactsSlice";
import css from "./App.module.css";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

const App = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectFilteredContacts);
	const isLoading = useSelector(selectContactsLoading);
	const error = useSelector(selectContactsError);

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	return (
		<div className={css.container}>
			<h1 className={css.title}>Phonebook</h1>
			<ContactForm />
			<SearchBox />
			{isLoading && <p>Loading contacts...</p>}
			{error && <p>Error: {error}</p>}
			<ContactList contacts={contacts} />
		</div>
	);
};

export default App;
