# RiseUp Social Network API

Una API REST robusta y escalable para una red social moderna, desarrollada con tecnologías de última generación como **Fastify**, **TypeScript** y **PostgreSQL**. Esta solución empresarial proporciona todas las funcionalidades esenciales para construir una plataforma social completa.

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/-Fastify-000000?style=flat-square&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![TypeORM](https://img.shields.io/badge/-TypeORM-FE0902?style=flat-square&logo=typeorm&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white)

## Características Principales

- **Autenticación Segura**: Sistema JWT completo con registro, inicio de sesión y tokens de refresco
- **Gestión de Usuarios**: Perfiles personalizables, búsqueda avanzada y sistema de roles
- **Contenido Social**: Publicaciones con imágenes, texto formateado y hashtags
- **Interacción Social**: Comentarios anidados, likes, y sistema de notificaciones
- **Conexiones entre Usuarios**: Sistema de seguidores y conexiones bidireccionales
- **Seguridad Avanzada**: Protección contra ataques comunes (XSS, CSRF, inyección SQL)
- **Rendimiento Optimizado**: Endpoints paginados y cacheados para respuestas rápidas
- **Métricas y Análisis**: Seguimiento de interacciones de usuarios y contenido popular
- **Documentación Completa**: API totalmente documentada con Swagger/OpenAPI 3.0
- **Testing Exhaustivo**: Cobertura de pruebas con casos de borde y escenarios reales

## Casos de Uso Empresariales

| Industria | Caso de Uso | Beneficio |
|-----------|-------------|-----------|
| **Educación** | Plataforma de comunicación entre estudiantes y profesores | Mejora la colaboración académica y el intercambio de recursos |
| **Empresas** | Red social interna para empleados | Fomenta la cultura organizacional y el intercambio de conocimientos |
| **Salud** | Comunidad para pacientes con condiciones similares | Proporciona apoyo entre pares y recursos educativos |
| **E-commerce** | Plataforma social para reseñas y recomendaciones de productos | Aumenta la confianza del cliente y las conversiones |
| **Eventos** | Red para asistentes a conferencias y eventos | Facilita networking y maximiza el valor de los eventos |

## Stack Tecnológico

### Backend
- **Runtime**: Node.js ≥20.12.2
- **Framework**: Fastify (alto rendimiento, bajo overhead)
- **Lenguaje**: TypeScript (desarrollo seguro y tipado)
- **ORM**: TypeORM (mapeo objeto-relacional)
- **Base de Datos**: PostgreSQL (relacional, transaccional)

### Infraestructura
- **Contenerización**: Docker (despliegue consistente)
- **Versionado**: Git (control de versiones distribuido)
- **CI/CD**: Preparado para integración con sistemas CI/CD

### Seguridad
- **Autenticación**: JWT (JSON Web Tokens)
- **Protección**: Helmet (cabeceras HTTP seguras)
- **Limitación de tasa**: Rate limiting para prevenir ataques de fuerza bruta
- **Validación**: Validación de entrada en todas las rutas

### Calidad
- **Testing**: Jest + Supertest (unitarias, integración, E2E)
- **Linting**: ESLint (calidad de código)
- **Documentación**: Swagger/OpenAPI 3.0

## Requisitos Previos

- Node.js ≥20.12.2
- Docker y Docker Compose (para PostgreSQL containerizado)
- Git

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/riseup-social-network-api
cd riseup-social-network-api
```

### 2. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Editar `.env` con la configuración adecuada:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=social_network

# JWT
JWT_SECRET=your-secure-secret-key
JWT_EXPIRATION=1d
JWT_REFRESH_EXPIRATION=7d

# Servidor
PORT=3000
NODE_ENV=development
```

### 3. Iniciar la Base de Datos

```bash
npm run db:up
```

Este comando levanta un contenedor PostgreSQL configurado para la aplicación.

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Ejecutar Migraciones y Datos Iniciales

```bash
npm run db:migration  # Estructura de la base de datos
npm run db:seed       # Datos de prueba (opcional)
```

## Ejecución

### Desarrollo

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000` con recarga automática.

### Producción

```bash
npm run build
npm start
```

## Documentación API

La documentación interactiva de la API está disponible en:

```
http://localhost:3000/documentation
```

Esta interfaz permite probar todos los endpoints directamente desde el navegador.

## Testing

```bash
# Ejecutar todas las pruebas
npm test

# Con cobertura
npm run coverage
```

## Roadmap

- [ ] Soporte para subida de archivos multimedia
- [ ] Implementación de WebSockets para notificaciones en tiempo real
- [ ] Integración con servicios de autenticación externos (OAuth)
- [ ] Búsqueda avanzada con Elasticsearch
- [ ] Analíticas y reportes avanzados

## Licencia

MIT

---

Desarrollado por Sebastian Barroso | 2024