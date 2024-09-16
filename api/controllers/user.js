import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM musicas";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO musicas(`musica`, `banda`, `tom`, `categoria`, `Cifra`) VALUES(?)";

  const values = [
    req.body.musica,
    req.body.banda,
    req.body.tom,
    req.body.categoria,
    req.body.cifra,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Música adicionada com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE musicas SET `musica` = ?, `banda` = ?, `tom` = ?, `categoria` = ?, `cifra` = ? WHERE `id` = ?";

  const values = [
    req.body.musica,
    req.body.banda,
    req.body.tom,
    req.body.categoria,
    req.body.cifra,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Música atualizada com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM musicas WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Música deletada com sucesso.");
  });
};
