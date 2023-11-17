import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "./BaseUrl";
import styled from "styled-components";
import { useFormik } from "formik";
import { validationSchemaForm } from "../utils/helpers/validate";
import { Button } from "@mui/material";

const AddEdit = () => {
  const [data, setData] = useState([]);

  const initialState = {
    name: "",
    email: "",
    contact: "",
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        const loadedData = [];

        for (const key in responseData) {
          loadedData.push({
            id: key,
            name: responseData[key].name,
            email: responseData[key].email,
            contact: responseData[key].contact,
          });
        }
        setData(loadedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const { id } = useParams();

  async function updateContact({ id, data }) {
    try {
      const response = await fetch(`${BASE_URL}/${id}.json`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      toast.success("Contact Updated Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (values, { resetForm }) => {
    if (!values.name || !values.email || !values.contact) {
      toast.error("Please provide a value in each input field");
    } else {
      if (id) {
        updateContact({ id, data: { ...values } });
      } else {
        try {
          const response = await fetch(`${BASE_URL}.json`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (!response.ok) {
            throw new Error("Failed to save data");
          }
          toast.success("Contact Added Successfully");
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      }
    }
    resetForm();
  };

  const { handleChange, errors, handleBlur, values, setValues, handleSubmit } =
    useFormik({
      validateOnChange: false,
      onSubmit,
      validationSchema: validationSchemaForm,
      initialValues: initialState,
    });

  const getById = async () => {
    const res = await fetch(`${BASE_URL}/${id}.json`);
    const data = await res.json();
    setValues({ name: data.name, email: data.email, contact: data.contact });
  };

  useEffect(() => {
    if (id) {
      getById();
    }
  }, [id]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <StyledInput
        type="text"
        id="name"
        name="name"
        placeholder="Your Name..."
        value={values.name}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <StyledValidate>{errors.name}</StyledValidate>

      <label htmlFor="email">Email</label>
      <StyledInput
        type="email"
        id="email"
        name="email"
        placeholder="Your Email..."
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <StyledValidate>{errors.email}</StyledValidate>

      <label htmlFor="contact">Contact</label>
      <StyledInput
        type="number"
        id="contact"
        name="contact"
        placeholder="Your Contact..."
        value={values.contact}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <StyledValidate>{errors.contact}</StyledValidate>

      {/* <StyledSaveBtn
        type="submit"
        value={id ? "Update" : "Save"}
        // onClick={value === "Update" ? () => updateContact(id) : ""}
      /> */}
      <Button variant="contained" type="submit">
        {id ? "Update" : "Save"}
      </Button>
    </StyledForm>
  );
};

export default AddEdit;

const StyledForm = styled.form`
  margin: auto;
  padding: 15px;
  max-width: 400px;
  align-content: center;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const StyledInput = styled.input`
  margin: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledValidate = styled.p`
  color: red;
`;
