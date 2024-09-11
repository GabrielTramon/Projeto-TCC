import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  deleteDoc,
  getDocs,
  updateDoc, // Importando função para atualizar documentos
} from "firebase/firestore";
import { useEffect, useState } from "react";
import style from "../CrudProduto/styles.module.css";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCEli15SSz40ZzsWWY3orYRcxx8I9qxIXw",
  authDomain: "agroshop-tramontin-c28cc.firebaseapp.com",
  projectId: "agroshop-tramontin-c28cc",
  storageBucket: "agroshop-tramontin-c28cc.appspot.com",
  messagingSenderId: "550256230785",
  appId: "1:550256230785:web:fa4e1d693f4a7f7b0fe880",
});

export const CrudProduto = () => {
  const [Produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [activeClientId, setActiveClientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProductId, setEditingProductId] = useState(null); // Estado para armazenar o ID do produto em edição
  const [editFormData, setEditFormData] = useState({}); // Dados do formulário de edição

  const db = getFirestore(firebaseApp);
  const ProdutosCollectionRef = collection(db, "Produtos");

  useEffect(() => {
    const getProdutos = async () => {
      const data = await getDocs(ProdutosCollectionRef);
      const sortedClients = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProdutos(sortedClients);
      setFilteredProdutos(sortedClients);
    };
    getProdutos();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = Produtos.filter((client) =>
      client.nome.toLowerCase().includes(term)
    );
    setFilteredProdutos(filtered);
  };

  const toggleClientDetails = (id) => {
    setActiveClientId(activeClientId === id ? null : id);
  };

  async function deleteUser(id) {
    try {
      const userDoc = doc(db, "Produtos", id);
      await deleteDoc(userDoc);
      alert("Usuário deletado com sucesso!");
      setProdutos(Produtos.filter((user) => user.id !== id));
      setFilteredProdutos(filteredProdutos.filter((user) => user.id !== id));
    } catch (e) {
      console.error("Erro ao deletar usuário: ", e);
      alert("Erro ao deletar usuário: " + e.message);
    }
  }

  const startEditUser = (user) => {
    setEditingProductId(user.id); // Define o ID do produto que está sendo editado
    setEditFormData(user); // Preenche o formulário com os dados do produto atual
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdits = async (e) => {
    e.preventDefault();
    try {
      const userDoc = doc(db, "Produtos", editingProductId);
      await updateDoc(userDoc, editFormData);
      alert("Produto atualizado com sucesso!");
      // Atualiza a lista de produtos com os dados modificados
      const updatedProdutos = Produtos.map((prod) =>
        prod.id === editingProductId ? { ...editFormData, id: editingProductId } : prod
      );
      setProdutos(updatedProdutos);
      setFilteredProdutos(updatedProdutos);
      setEditingProductId(null); // Sai do modo de edição
    } catch (e) {
      console.error("Erro ao atualizar produto: ", e);
      alert("Erro ao atualizar produto: " + e.message);
    }
  };

  return (
    <div className={style.container}>
      <input
        className={style.searchInput}
        type="text"
        placeholder="Pesquisar por nome..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul className={style.clientList}>
        {filteredProdutos.map((user) => (
          <li
            key={user.id}
            className={`${style.clientItem} ${
              activeClientId === user.id ? style.active : ""
            }`}
            onClick={() => toggleClientDetails(user.id)}
          >
            {user.foto && (
              <div>
                <img
                  src={user.foto}
                  alt="Imagem do Produto"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            )}
            <div className={style.clientDetails}>
              <p>Nome: {user.nome}</p>
              <p>Codigo: {user.codigo}</p>
              <p>Descrição: {user.descrição}</p>
              <p>Marca: {user.marca}</p>
              <p>Quantidade: {user.quantidade}</p>
              <p>Categoria: {user.categoria}</p>
              <button
                className={style.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteUser(user.id);
                }}
              >
                Deletar
              </button>
              <button
                className={style.editButton}
                onClick={(e) => {
                  e.stopPropagation();
                  startEditUser(user);
                }}
              >
                Editar
              </button>

              {/* Formulário de edição inline, só aparece para o produto em edição */}
              {editingProductId === user.id && (
                <form className={style.editForm} onSubmit={saveEdits}>
                  <h3>Editando Produto: {user.nome}</h3>
                  <label>
                    Nome:
                    <input
                      type="text"
                      name="nome"
                      value={editFormData.nome}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Codigo:
                    <input
                      type="text"
                      name="codigo"
                      value={editFormData.codigo}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Descrição:
                    <input
                      type="text"
                      name="descrição"
                      value={editFormData.descrição}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Marca:
                    <input
                      type="text"
                      name="marca"
                      value={editFormData.marca}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Quantidade:
                    <input
                      type="number"
                      name="quantidade"
                      value={editFormData.quantidade}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Categoria:
                    <input
                      type="text"
                      name="categoria"
                      value={editFormData.categoria}
                      onChange={handleEditChange}
                    />
                  </label>
                  <button type="submit">Salvar Alterações</button>
                  <button
                    type="button"
                    onClick={() => setEditingProductId(null)} // Cancelar edição
                  >
                    Cancelar
                  </button>
                </form>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
