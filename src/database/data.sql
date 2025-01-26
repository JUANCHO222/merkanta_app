-- Tabla far_Compra
CREATE TABLE far_compra (
    id_compra INT IDENTITY PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_compra DATETIME NOT NULL,
    total_compra DECIMAL(10, 2) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (id_usuario) REFERENCES far_usuario(id_usuario)
);

-- Tabla far_Direccion de Usuario
CREATE TABLE far_direccion_usuario (
    id_direccion_usuario INT IDENTITY PRIMARY KEY,
    calle VARCHAR(255) NOT NULL,
    numero_exterior VARCHAR(10) NULL,
    numero_interior VARCHAR(10) NULL,
    colonia_localidad VARCHAR(255) NOT NULL,
    municipio_alcaldia VARCHAR(255) NOT NULL,
    codigo_postal INT NOT NULL,
    ciudad_pueblo VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    pais VARCHAR(255) NOT NULL,
    referencia VARCHAR(255) NOT NULL,
    latitud DECIMAL(9, 6) NOT NULL,
    longitud DECIMAL(9, 6) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    status BIT NOT NULL
);

-- Tabla far_Envio
CREATE TABLE far_envio (
    id_envio INT IDENTITY PRIMARY KEY,
    fecha_envio DATETIME NOT NULL,
    id_compra INT NOT NULL,
    id_direccion INT NOT NULL,
    estado_envio BIT NOT NULL,
    metodo_envio VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_compra) REFERENCES far_compra(id_compra),
    FOREIGN KEY (id_direccion) REFERENCES far_direccion_usuario(id_direccion_usuario)
);

-- Tabla far_Producto
CREATE TABLE far_producto (
    id_producto INT IDENTITY PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    status BIT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES far_categoria(id_categoria)
);

-- Tabla far_Categoria
CREATE TABLE far_producto_categoria (
    id_categoria INT IDENTITY PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    imagen_url VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE()
);

-- Tabla far_Producto Imagen
CREATE TABLE far_producto_imagen (
    id_producto_imagen INT IDENTITY PRIMARY KEY,
    id_producto INT NOT NULL,
    url_imagen VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    orden INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES far_producto(id_producto)
);

-- Tabla far_Usuario
CREATE TABLE far_usuario (
    id_usuario INT IDENTITY PRIMARY KEY,
    id_tipo_usuario INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    status BIT NOT NULL,
    FOREIGN KEY (id_tipo_usuario) REFERENCES far_tipo_usuari(id_tipo_usuario)
);

-- Tabla far_Tipo de Usuario
CREATE TABLE far_usuario_tipo (
    id_tipo_usuario INT IDENTITY PRIMARY KEY,
    tipo_usuario VARCHAR(255) NOT NULL
);

-- Tabla far_Detalle de Compra
CREATE TABLE far_detalle_compra (
    id_detalle_compra INT IDENTITY PRIMARY KEY,
    id_producto INT NOT NULL,
    id_compra INT NOT NULL,
    cantidad INT NOT NULL,
    precio_producto DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    status BIT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES far_producto(id_producto),
    FOREIGN KEY (id_compra) REFERENCES far_compra(id_compra)
);

-- Tabla far_Detalle de Direccion
CREATE TABLE far_detalle_direccion (
    id_detalle_direccion INT IDENTITY PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_direccion_usuario INT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    status BIT NOT NULL,
    es_predeterminada BIT NOT NULL DEFAULT 0, -- Campo para dirección predeterminada
    FOREIGN KEY (id_direccion_usuario) REFERENCES far_direccion_usuario(id_direccion_usuario),
    FOREIGN KEY (id_usuario) REFERENCES far_usuario(id_usuario),
    CONSTRAINT UC_DireccionPredeterminada UNIQUE (id_usuario, es_predeterminada) -- Único por usuario
);

