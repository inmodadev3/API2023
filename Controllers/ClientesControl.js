const Clientes = require("../Models/Clientes");
const sqlConnection = require('../DataBases/cnxHgi');
/* const clientesControllers = {
    getClientesByID : async (req,res) =>{
        const {id} = req.params;
        console.log(req)
        try {
            const clientes = await Clientes.getById(id);
            res.json(clientes);
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'error al obtener cliente'});
        }
    }
} */

const clientesControllers = {}

clientesControllers.getClientesByID = async(req,res) =>{
    const {id} = req.params
    
    await sqlConnection.request().query(`select * from TblTerceros where StrIdTercero = '${id}' `,(err,result) =>{
      if(err){
          console.log(err)
          return
      }
      console.log(result.recordset[0])
      res.json({data:result.recordset[0]})
  });
        
        
    
}

module.exports = clientesControllers;



/*

const Cliente = require('../models/cliente');

const clienteController = {
  getClientes: async (req, res) => {
    try {
      const clientes = await Cliente.getAll();
      res.json(clientes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener clientes' });
    }
  },
  getClienteById: async (req, res) => {
    const id = req.params.id;
    try {
      const cliente = await Cliente.getById(id);
      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener cliente' });
    }
  },
  createCliente: async (req, res) => {
    const cliente = req.body;
    try {
      const newClienteId = await Cliente.create(cliente);
      res.status(201).json({ id: newClienteId, message: 'Cliente creado correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al crear cliente' });
    }
  },
  updateCliente: async (req, res) => {
    const id = req.params.id;
    const cliente = req.body;
    try {
      const success = await Cliente.update(id, cliente);
      if (success) {
        res.json({ message: 'Cliente actualizado correctamente' });
      } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al actualizar cliente' });
    }
  },
  deleteCliente: async (req, res) => {
    const id = req.params.id;
    try {
      const success = await Cliente.delete(id);
      if (success) {
        res.json({ message: 'Cliente eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al eliminar cliente' });
    }
  }
};

module.exports = clienteController;*/
