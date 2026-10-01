import { useState } from "react";
import { submitContact } from "../lib/api/submitContact";
import { CONTACT_FIELD_NAMES, isFieldValid } from "../lib/validators/contactRules";

const EMPTY_VALUES = Object.fromEntries(CONTACT_FIELD_NAMES.map((name) => [name, ""]));

/*
  Contact form state. A field is checked on blur (when it has a value) and again on every input while it is
  in error; submit checks all fields, focuses the first wrong one, otherwise sends. A failed send keeps the
  values. status: "idle" | "sending" | "sent" | "error".
*/
export default function useContactForm() {
    const [values, setValues] = useState(EMPTY_VALUES);
    const [invalid, setInvalid] = useState({});
    const [status, setStatus] = useState("idle");
    const [firstName, setFirstName] = useState("");

    const markField = (name, value) => setInvalid((prev) => ({ ...prev, [name]: !isFieldValid(name, value) }));

    const onChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        if (invalid[name]) markField(name, value);
    };

    const onBlur = (event) => {
        const { name, value } = event.target;
        if (value) markField(name, value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (status === "sending") return;

        const nextInvalid = Object.fromEntries(CONTACT_FIELD_NAMES.map((name) => [name, !isFieldValid(name, values[name])]));
        setInvalid(nextInvalid);
        const firstWrong = CONTACT_FIELD_NAMES.find((name) => nextInvalid[name]);
        if (firstWrong) {
            event.currentTarget.elements.namedItem(firstWrong)?.focus();
            return;
        }

        setStatus("sending");
        try {
            await submitContact(values);
            setFirstName(values.name.trim().split(/\s+/)[0]);
            setStatus("sent");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return { values, invalid, status, firstName, onChange, onBlur, onSubmit };
}
