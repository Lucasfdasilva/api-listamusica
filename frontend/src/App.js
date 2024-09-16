import GlobalStyle from "./styles/global";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 10px solid #bbb;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8700");
      setUsers(res.data.sort((a, b) => (a.musica > b.musica ? 1 : -1)));
      setFilteredUsers(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getCategories = () => {
    const uniqueCategories = [...new Set(users.map(user => user.categoria))];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  useEffect(() => {
    getCategories();
  }, [users]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredUsers(users.filter(user => user.categoria === selectedCategory));
    } else {
      setFilteredUsers(users);
    }
  }, [selectedCategory, users]);

  return (
    <>
      <Container>
        <Title>Músicas Grupo de Louvor</Title>
        <FilterContainer>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </Select>
        </FilterContainer>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={filteredUsers} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle /> 
    </>
  );
}

export default App;
