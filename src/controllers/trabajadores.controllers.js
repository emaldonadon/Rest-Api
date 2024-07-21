import { pool } from "../models/db.js";

export const getList = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM trabajadores')
    res.json(rows)
}
export const getId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM trabajadores WHERE id = ?", [id])
        if (rows.length === 0)
            return res.status(400).json({
                message: "Dato no encontrado",
            });
        return res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: "Error al encontrar el id"
        })
    }
}

export const postCreate = async (req, res) => {
    const { nombre, salario } = req.body;
    const [rows] = await pool.query("INSERT INTO trabajadores (nombre, salario) VALUES(?,?)", [nombre, salario])
    res.send({
        id: rows.insertId,
        nombre,
        salario
    })
}

export const update = async (req, res) => {
    const { id } = req.params;
    const { nombre, salario } = req.body;
    const [result] = await pool.query("UPDATE trabajadores SET nombre = IFNULL(?,nombre), salario = IFNULL(?,salario) WHERE id = ?", [nombre, salario, id])
    if (result.affectedRows === 0)
        return res.status(404).json({
            message: "Dato no encontrado"
        });
    const [rows] = await pool.query('SELECT * FROM trabajadores WHERE id = ?', [id])
    res.json(rows[0])
}

export const deleteTrabajador = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM trabajadores WHERE id = ?", [id])
        if (result.affectedRows === 0)
            return res.status(404).json({
                message: "Dato no encontrado"
            });
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar"
        })
    }
}