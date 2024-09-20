import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRootBeer } from "../../store/slices/drinkSlice/apis";
import {
  AddButton,
  ModalContainer,
  ModalBackdrop,
  FormContainer,
  FormInput,
  FormLabel,
  FormButton,
  CloseButton,
} from "./styled";

const CreateRootBeer = ({ onFormSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRootBeer(formData));
    setShowForm(false);
    onFormSubmit();
  };

  return (
    <div>
      <AddButton onClick={() => setShowForm(!showForm)}>
        + Add Root Beer
      </AddButton>

      {showForm && (
        <ModalBackdrop onClick={() => setShowForm(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowForm(false)}>
              &times;
            </CloseButton>
            <form onSubmit={handleSubmit}>
              <FormContainer>
                <div>
                  <FormLabel>Name</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <FormLabel>Description</FormLabel>
                  <FormInput
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <FormButton type="submit">Create</FormButton>
              </FormContainer>
            </form>
          </ModalContainer>
        </ModalBackdrop>
      )}
    </div>
  );
};

export default CreateRootBeer;
