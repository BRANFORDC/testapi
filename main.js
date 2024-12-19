const express = require('express');

const app = express();
const port = 3000;

// Definición de rutas
app.get('/api/users', (req, res) => {
  res.send('Usuarios');
});

app.get('/api/products', (req, res) => {
  res.send('Productos');
});

app.post('/api/orders', (req, res) => {
  res.send('Orden creada');
});

// Ruta para la interfaz de usuario
app.get('/', (req, res) => {
  const routes = app._router.stack
    .filter(r => r.route) // Filtrar las rutas que tienen un objeto 'route'
    .map(r => ({
      method: Object.keys(r.route.methods).join(', '),
      path: r.route.path,
    }));

  const routesHtml = routes.map(route => 
    `<div class="card" onclick="navigateTo('${route.path}')">${route.path}</div>`
  ).join('');

  const htmlResponse = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Routes</title>
      <style>
          body {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-image: url('https://wallpapers.com/images/high/4k-anime-space-eqnphigffs8khisj.webp');
              background-size: cover;
              color: white;
              text-align: center;
          }
          h1 {
              font-size: 2.5em;
              margin: 20px 0 10px 0;
          }
          p {
              font-size: 1.2em;
              margin-bottom: 20px;
          }
          .carousel {
              display: flex;
              overflow-x: auto;
              max-width: 80%;
              scroll-snap-type: x mandatory;
              scroll-behavior: smooth;
          }
          .card {
              min-width: 200px;
              min-height: 100px;
              margin: 0 10px;
              background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco semi-transparente */
              border: 1px solid #ccc;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 20px;
              scroll-snap-align: start;
              cursor: pointer;
              transition: background 0.3s;
          }
          .card:hover {
              background-color: rgba(255, 255, 255, 1); /* Fondo blanco completamente opaco al hover */
          }
      </style>
  </head>
  <body>
      <h1>Bienvenido a nuestra API</h1>
      <p>Selecciona una ruta para comenzar:</p>
      <div class="carousel">
          ${routesHtml}
      </div>

      <script>
          function navigateTo(path) {
              window.location.href = path;
          }
      </script>
  </body>
  </html>
  `;

  res.send(htmlResponse);
});

// Iniciar el servidor https://replit.com/@brandfom333/GoldenrodSnarlingOpen64
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
