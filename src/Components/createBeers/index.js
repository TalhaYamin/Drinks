import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRootBeer, uploadPicture } from "../../store/slices/drinkSlice/apis"; // Import uploadPicture
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
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(addRootBeer(formData));

      if (addRootBeer.fulfilled.match(resultAction)) {
        const { id: drinkId } = resultAction.payload;

        if (image) {
          const uploadData = { drinkId, image };
          await dispatch(uploadPicture(uploadData));
        }

        setShowForm(false);
        onFormSubmit();
      }
    } catch (error) {
      console.error("Failed to create root beer or upload image:", error);
    }
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
                <div>
                  <FormLabel>Upload Image</FormLabel>
                  <FormInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
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
