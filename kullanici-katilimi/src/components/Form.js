import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

export default function Form(props) {
  const { user } = props;
  console.log(props);
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [err, setErr] = useState({
    Name: "",
    email: "",
    password: "",
    terms: "",
  });

  const formDataSchema = Yup.object().shape({
    Name: Yup.string().required("Lutfen isminizi giriniz"),
    email: Yup.string()
      .email("Lutfen gecerli bir mail adresi giriniz")
      .required("Lutfen mail adresinizi giriniz"),
    password: Yup.string()
      .required("Lutfen sifrenizi giriniz")
      .min(6, "Lutfen en az 6 karakterden olusan sifrenizi giriniz"),
    terms: Yup.boolean().oneOf(
      [true],
      "Lutfen kullanim sartlarini kabul ediniz"
    ),
  });
  const handleChange = (e) => {
    Yup.reach(formDataSchema, e.target.name)
      .validate(e.target.value)
      .then(setErr({ ...err, [e.target.name]: "" }))
      .catch((err) => {
        setErr({
          ...formErrorData,
          [e.target.name]: err.errors[0],
        });
      });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTerms = (e) => {
    Yup.reach(formDataSchema, e.target.name)
      .validate(e.target.checked)
      .then(setFormErrorData({ ...err, [e.target.name]: "" }))
      .catch((err) => {
        setErra({
          ...err,
          [e.target.name]: err.errors[0],
        });
      });
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => user(response.data));
  };
}
