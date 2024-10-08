<template>
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <h3>{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h3>
        <form @submit.prevent="handleAddProduct">
          <label for="name">Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            :class="{ 'input-error': errors.name }"
          />
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
  
          <br />
          <label for="image">Image</label>
          <input
            v-model="image"
            type="text"
            id="image"
            :class="{ 'input-error': errors.image }"
          />
          <span v-if="errors.image" class="error-message">{{ errors.image }}</span>
  
          <br />
          <label for="price">Price</label>
          <input
            v-model.number="price"
            type="number"
            id="price"
            :class="{ 'input-error': errors.price }"
          />
          <span v-if="errors.price" class="error-message">{{ errors.price }}</span>
  
          <br />
          <label for="quantity">Quantity</label>
          <input
            v-model.number="quantity"
            type="number"
            id="quantity"
            :class="{ 'input-error': errors.quantity }"
          />
          <span v-if="errors.quantity" class="error-message">{{ errors.quantity }}</span>
  
          <br />
          <div class="buttons">
            <button type="button" @click="$emit('close')">Close</button>
            <button type="submit">{{ isEditing ? 'Update' : 'Add' }}</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, defineProps, watch } from "vue";
  
  const props = defineProps({
    products: {
      type: Array,
      required: true,
    },
    editProduct: {
      type: Object,
      default: () => ({}),
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  });
  
  
const emit = defineEmits();
const name = ref(props.isEditing ? props.editProduct.name : "");
const image = ref(props.isEditing ? props.editProduct.image : "");
const price = ref(props.isEditing ? props.editProduct.price : 0);
const quantity = ref(props.isEditing ? props.editProduct.quantity : 0);
const errors = ref({});


  watch(() => props.isEditing, (newValue) => {
  if (newValue) {
    name.value = props.editProduct.name;
    image.value = props.editProduct.image;
    price.value = props.editProduct.price;
    quantity.value = props.editProduct.quantity;
  }
});
  
  const handleAddProduct = () => {
    errors.value = {};  
  
    // Validate 
    if (!name.value) {
      errors.value.name = "This field is required.";
    }
    if (!image.value) {
      errors.value.image = "This field is required.";
    }
    if (props.products.some(product => product.name === name.value && !props.isEditing)) {
      errors.value.name = "Name already exists.";
    }
    if (price.value < 10000) {
      errors.value.price = "Minimum price is 10,000 đ.";
    }
    if (quantity.value < 1 || quantity.value > 100) {
      errors.value.quantity = "Quantity must be between 1 and 100.";
    }
  
    if (Object.keys(errors.value).length) {
      return;
    }
  
    const newProduct = {
      name: name.value,
      image: image.value,
      price: price.value,
      quantity: quantity.value,
    };
  
    if (props.isEditing) {
      emit("update-product", { index: props.editProductIndex, product: newProduct });
    } else {
      emit("add-product", newProduct);
    }
  
    // Reset form
    name.value = "";
    image.value = "";
    price.value = 0;
    quantity.value = 0;
  
    emit("close");
  };
  </script>
  

  
  
     
  
  <style scoped>
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
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 15px;
    font-weight: bold;
    color: #333;
  }
  
  input {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s;
  }
  
  input:focus {
    border-color: #007bff;  
    outline: none; 
  }
  
  .input-error {
    border-color: red;  
  }
  
  .error-message {
    color: red; 
    font-size: 12px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  button[type='button'] {
    background-color: #6c757d; 
    color: white;
  }
  
  button[type='button']:hover {
    background-color: #5a6268; 
  }
  
  button[type='submit'] {
    background-color: #007bff; 
    color: white;
  }
  
  button[type='submit']:hover {
    background-color: #0056b3;  
  }
  </style>
  