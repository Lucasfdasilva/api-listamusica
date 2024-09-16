import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
  justify-content: center;

`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.musica.value = onEdit.musica;
      user.banda.value = onEdit.banda;
      user.tom.value = onEdit.tom;
      user.categoria.value = onEdit.categoria;
      user.cifra.value = onEdit.cifra;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.musica.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8700/" + onEdit.id, {
          musica: user.musica.value,
          banda: user.banda.value,
          tom: user.tom.value,
          categoria: user.categoria.value,
          cifra: user.cifra.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8700", {
          musica: user.musica.value,
          banda: user.banda.value,
          tom: user.tom.value,
          categoria: user.categoria.value,
          cifra: user.cifra.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.musica.value = "";
    user.banda.value = "";
    user.tom.value = "";
    user.categoria.value = "";
    user.cifra.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Música</Label>
        <Input name="musica" />
      </InputArea>
      <InputArea>
        <Label>Banda</Label>
        <Input name="banda" />
      </InputArea>
      <InputArea>
        <Label>Tom</Label>
        <Input name="tom" />
      </InputArea>
      <InputArea>
        <Label>Categoria</Label>
        <Input name="categoria" />
      </InputArea>
      <InputArea>
        <Label>Cifra</Label>
        <Input name="cifra" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
