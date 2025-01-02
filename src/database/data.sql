-- Tabla Categoria
CREATE TABLE categoria (
    id_categoria INT IDENTITY PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Tabla Tipo de Usuario
CREATE TABLE tipo_usuario (
    id_tipo_usuario INT IDENTITY PRIMARY KEY,
    tipo_usuario VARCHAR(255) NOT NULL
);

-- Tabla Direccion de Usuario
CREATE TABLE direccion_usuario (
    id_direccion_usuario INT IDENTITY PRIMARY KEY,
    calle VARCHAR(255) NOT NULL,
    numero_exterior INT NOT NULL,
    numero_interior INT NOT NULL,
    colonia_localidad VARCHAR(255) NOT NULL,
    municipio_alcaldia VARCHAR(255) NOT NULL,
    codigo_postal INT NOT NULL,
    ciudad_pueblo VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    pais VARCHAR(255) NOT NULL,
    referencia VARCHAR(255) NOT NULL,
    fecha_hora DATETIME NOT NULL,
    status BIT NOT NULL
);

-- Tabla Producto
CREATE TABLE producto (
    id_producto INT IDENTITY PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    url_imagen VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    status BIT NOT NULL,
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

-- Tabla Usuario
CREATE TABLE usuario (
    id_usuario INT IDENTITY PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL,
    status BIT NOT NULL,
    id_tipo_usuario INT NOT NULL,
    FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario)
);

-- Tabla Compra
CREATE TABLE compra (
    id_compra INT IDENTITY PRIMARY KEY,
    fecha_compra DATETIME NOT NULL,
    total_compra DECIMAL(10, 2) NOT NULL,
    fecha_hora DATETIME NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabla Envio
CREATE TABLE envio (
    id_envio INT IDENTITY PRIMARY KEY,
    fecha_envio DATETIME NOT NULL,
    estado_envio BIT NOT NULL,
    metodo_envio VARCHAR(255) NOT NULL,
    id_compra INT NOT NULL,
    id_direccion INT NOT NULL,
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra),
    FOREIGN KEY (id_direccion) REFERENCES direccion_usuario(id_direccion_usuario)
);

-- Tabla Detalle de Compra
CREATE TABLE detalle_compra (
    id_detalle_compra INT IDENTITY PRIMARY KEY,
    cantidad INT NOT NULL,
    precio_producto DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    fecha_hora DATETIME NOT NULL,
    status BIT NOT NULL,
    id_producto INT NOT NULL,
    id_compra INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
);

-- Tabla Detalle de Direccion
CREATE TABLE detalle_direccion (
    id_detalle_direccion INT IDENTITY PRIMARY KEY,
    fecha_hora DATETIME NOT NULL,
    status BIT NOT NULL,
    id_usuario INT NOT NULL,
    id_direccion_usuario INT NOT NULL,
    FOREIGN KEY (id_direccion_usuario) REFERENCES direccion_usuario(id_direccion_usuario),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
