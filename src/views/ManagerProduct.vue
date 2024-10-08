<template>
    <div class="manager-product">
      <div class="container-header">
        <h2>Manager Product</h2>
        <button class="addProduct" @click="openAddModal">Add new product</button>
        <input type="text" placeholder="Tìm kiếm sản phẩm" v-model="searchProduct" ref="myinput">
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="index">
            <td>{{ index + 1 }}</td>
            <td><img :src="product.image" :alt="product.name" /></td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }} đ</td>
            <td>{{ product.quantity }}</td>
            <td>
              <button class="edit-btn" @click="openEditModal(index)">Edit</button>
              &nbsp;
              <button class="delete-btn" @click="confirmDelete(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <AddProduct
            :products="products"
            @close="closeModal"
            @add-product="addProduct"
            @update-product="updateProduct" 
            :edit-product="editProductData"
            :is-editing="isEditing"
          />
        </div>
      </div>
  
      <div v-if="showConfirmDeleteModal" class="modal-overlay" @click="closeConfirmDeleteModal">
        <div class="modal-content" @click.stop>
          <h3>Xác nhận:</h3>
          <p>Bạn có chắc muốn xóa sản phẩm này</p>
          <div class="buttons">
            <button class="delete-btn" @click="deleteProduct(currentIndex)">Delete</button>
            <button class="cancel-btn" @click="closeConfirmDeleteModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import AddProduct from "./AddProduct.vue";

const products = ref(JSON.parse(localStorage.getItem("products")) || []);
const showModal = ref(false);
const showConfirmDeleteModal = ref(false);
const currentIndex = ref(null);
const editProductData = ref({});
const isEditing = ref(false);
const searchProduct = ref("");
const myinput = ref(null);

const filteredProducts = computed(() => {
  if (!searchProduct.value) return products.value;
  return products.value.filter(product =>
    product.name.toLowerCase().includes(searchProduct.value.toLowerCase())
  );
});

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
  editProductData.value = {};
};

const closeConfirmDeleteModal = () => {
  showConfirmDeleteModal.value = false;
};

const addProduct = (newProduct) => {
  products.value.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products.value));
  closeModal();
};

const updateProduct = ({ index, product }) => {
  products.value[index] = product;
  localStorage.setItem("products", JSON.stringify(products.value));
  closeModal();
};

const confirmDelete = (index) => {
  currentIndex.value = index;
  showConfirmDeleteModal.value = true;
};

const deleteProduct = (index) => {
  products.value.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products.value));
  closeConfirmDeleteModal();
};

const openAddModal = () => {
  showModal.value = true;
  isEditing.value = false;
  editProductData.value = {};
};

const openEditModal = (index) => {
  editProductData.value = { ...products.value[index] };
  currentIndex.value = index;
  showModal.value = true;
  isEditing.value = true;
};

// Focus vào input khi component được mount
onMounted(() => {
  nextTick(() => {
    if (myinput.value) {
      myinput.value.focus();
    }
  });
});
</script>

  

  
  
  <style scoped>
  .manager-product {
    padding: 20px;
  }
  .container-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .addProduct {
    height: 30px;
    padding: 5px 15px;
    background-color: blue;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .addProduct:hover {
    background-color: rgb(10, 10, 187);
  }
  
  h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead {
    background-color: #f4f4f4;
  }
  
  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
  }
  
  img {
    width: 50px;
    height: 50px;
  }
  
  .edit-btn {
    background-color: #4caf50;
    color: white;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  .cancel-btn{
    background-color: #8b8b8b;
    color: white;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .edit-btn:hover,
  .delete-btn:hover {
    opacity: 0.8;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    width: 400px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  