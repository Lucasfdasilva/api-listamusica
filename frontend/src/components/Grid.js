import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit, FaMusic } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    // Exibe uma caixa de diálogo para confirmar a exclusão
    const confirmDelete = window.confirm("Tem certeza que deseja apagar esta música?");
  
    // Se o usuário confirmar, procede com a exclusão
    if (confirmDelete) {
      await axios
        .delete("http://localhost:8700/" + id)
        .then(({ data }) => {
          const newArray = users.filter((user) => user.id !== id);
          setUsers(newArray);
          toast.success(data);
        })
        .catch(({ data }) => toast.error(data));
  
      setOnEdit(null);
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Música</Th>
          <Th>Banda</Th>
          <Th onlyWeb>Tom</Th>
          <Th>Categoria</Th>
          <Th>Cifra</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="15%">{item.musica}</Td>
            <Td width="15%">{item.banda}</Td>
            <Td width="5%" onlyWeb>{item.tom}</Td>
            <Td width="10%">{item.categoria}</Td>
            <Td width="5%">
              <a href={item.cifra} target="_blank" rel="noopener noreferrer">
                <FaMusic />
              </a>
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
