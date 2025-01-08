import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
	const filteredContacts = useSelector(selectFilteredContacts);

	return (
		<div className={css.contacts}>
			{filteredContacts.map((contact) => (
				<Contact key={contact.id} contact={contact} />
			))}
		</div>
	);
};

export default ContactList;
