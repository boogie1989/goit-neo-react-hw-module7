import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const phoneRegExp = /^(?!-)(\d+[-]?)*\d{1,}$(?<!-)$/;

const ContactSchema = Yup.object({
	name: Yup.string().required("Required").min(3, "Too short!").max(50, "Too long!"),
	number: Yup.string()
		.required("Required")
		.matches(phoneRegExp, "Phone number is not valid!")
		.min(3, "Too short!")
		.max(50, "Too long!"),
});

const ContactForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = (values, { resetForm }) => {
		dispatch(addContact(values));
		resetForm();
	};

	return (
		<Formik initialValues={{ name: "", number: "" }} validationSchema={ContactSchema} onSubmit={handleSubmit}>
			<Form className={css.form}>
				<label className={css.label}>
					Name
					<Field className={css.input} type="text" name="name" />
					<ErrorMessage name="name" component="div" className={css.error} />
				</label>
				<label className={css.label}>
					Number
					<Field className={css.input} type="text" name="number" />
					<ErrorMessage name="number" component="div" className={css.error} />
				</label>
				<button className={css.button} type="submit">
					Add contact
				</button>
			</Form>
		</Formik>
	);
};

export default ContactForm;
