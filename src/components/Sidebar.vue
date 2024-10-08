<template>
    <div class="sidebar">
      <ul>
        <li>
          <router-link to="/admin" class="link" active-class="active-link">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/admin/manager-category" class="link" active-class="active-link">Manager Category</router-link>
        </li>
        <li>
          <router-link to="/admin/manager-product" class="link" active-class="active-link">Manager Product</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .sidebar {
    background-color: #333;
    width: 200px;
    padding: 20px;
    height: 100vh;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar li {
    margin-bottom: 20px;
  }
  
  .link {
    color: #fff;
    text-decoration: none;
    padding: 10px;
    display: block;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .link:hover {
    background-color: #444;
    color: #ccc;
  }
  
  .active-link {
    background-color: #555;
    color: #fff;
  }
  
  .active-link:hover {
    background-color: #666;
  }
  
  </style>
  