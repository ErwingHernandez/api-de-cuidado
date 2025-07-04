const Usuario = require("../models/Usuarios");

// Obtener todos los registros de usuarios
const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.find()
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener control de usuario" });
    }
};

const getIdUsuario = async (req, res) => {
    try{
        const usuario = await Usuario.findById(req.params.id)
        res.json(usuario);

    }catch(err){
        res.status(500).json({ error: "Error al obtener los datos del usuario" });
    }

}

const postLoginUsuario = async (req, res) => {
    const { correo, contraseña } = req.body; // Obtener correo y contraseña del cuerpo de la solicitud

    try {
        // 1. Buscar el usuario por correo electrónico
        const usuario = await Usuario.findOne({ correo });

        // Si el usuario no existe
        if (!usuario) {
            // Mensaje genérico por seguridad básica (no decimos si el correo existe o no)
            return res.status(401).json({ error: "Credenciales inválidas." });
        }

        // 2. Comparar la contraseña proporcionada directamente con la contraseña almacenada en la BD
        // (¡Advertencia: esto asume que la contraseña en la BD está en texto plano!)
        if (contraseña !== usuario.contraseña) {
            return res.status(401).json({ error: "Credenciales inválidas." });
        }

        // 3. Si las credenciales son correctas, devolver la información del usuario (sin la contraseña)
        // Usamos '_doc' para obtener un objeto plano del documento de Mongoose
        const usuarioLogueado = { ...usuario._doc };
        delete usuarioLogueado.contraseña; // Eliminamos la propiedad de contraseña antes de enviarla al cliente

        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            usuario: usuarioLogueado // Envía el objeto de usuario sin la contraseña
        });

    } catch (err) {
        console.error("Error del servidor al iniciar sesión:", err); // Para depuración en el servidor
        res.status(500).json({ error: "Error del servidor al iniciar sesión." });
    }
};

// Crear nuevo usuario
const createUsuario = async (req, res) => {
    try {
        const { correo, /* otras propiedades del usuario */ } = req.body;

        // Verificar si el correo ya existe 
        const existingUser = await Usuario.findOne({ correo });

        if (existingUser) {
            // Si el correo ya existe, respondemos con 409 Conflict
            return res.status(409).json({ error: "El correo electrónico ya está registrado." });
        }
        // --------------------------------------------------------------------------------

        const nuevo = new Usuario(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (err) {
        console.error("Error al registrar usuario:", err);


        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: messages.join(', ') });
        }

        // Para cualquier otro error inesperado del servidor
        res.status(500).json({ error: "Error interno del servidor al registrar usuario." });
    }
};

// Actualizar usuario
const updateUsuario = async (req, res) => {
    try {
        const updated = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Error al actualizar registro de usuario" });
    }
};

// Eliminar usuario
const deleteUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Registro de software eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar registro de usuario" });
    }
};

module.exports = {
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    postLoginUsuario,
    getIdUsuario
};