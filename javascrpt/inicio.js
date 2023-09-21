const carrito = {
    productos: [],
    agregarProducto: function(nombre, precio) {
      this.productos.push({ nombre, precio });
      this.guardarCarritoEnLocalStorage();
      this.mostrarCarrito();
    },
    eliminarProducto: function(index) {
      this.productos.splice(index, 1);
      this.guardarCarritoEnLocalStorage();
      this.mostrarCarrito();
    },
    calcularTotal: function() {
      return this.productos.reduce((total, producto) => total + producto.precio, 0);
    },
    mostrarCarrito: function() {
      const listaProductos = document.getElementById('lista-productos');
      const total = document.getElementById('total');
  
      listaProductos.innerHTML = '';
      this.productos.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => this.eliminarProducto(index);
        li.appendChild(botonEliminar);
        listaProductos.appendChild(li);
      });
  
      total.textContent = this.calcularTotal().toFixed(2);
    },
    guardarCarritoEnLocalStorage: function() {
      localStorage.setItem('carrito', JSON.stringify(this.productos));
    },
    cargarCarritoDesdeLocalStorage: function() {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.productos = JSON.parse(carritoGuardado);
        this.mostrarCarrito();
      }
    },
  };
  
  function agregarProducto(nombre, precio) {
    carrito.agregarProducto(nombre, precio);
  }
  
  carrito.cargarCarritoDesdeLocalStorage();