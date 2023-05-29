const mysqlConnection = require('../DataBases/cnxDash.js');
const sqlConnection = require('../DataBases/cnxHgi');

class PedidosService {

  async consultarDetallePedidos(id) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query("CALL SP_ConsultarDetallePedido(?)", [id], (err, rows, fields) => {
        //console.log(rows)
        if (!err) {
          resolve(rows[0]);
        } else {
          reject(err);
        }
        // mysqlConnection.end();
      });
    });
  }

  async consultarDetallePedidosTerminal(id) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query("CALL SP_ConsultarDetallePedidoTerminal(?)", [id], (err, rows, fields) => {
        //console.log(rows)
        if (!err) {
          resolve(rows[0]);
        } else {
          reject(err);
        }
        // mysqlConnection.end();
      });
    });
  }

  async consultarPedidosEnProcesoVendedor(id) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query("select * from tblpedidosTerminal where stridvendedor = (?) and IntEstado = 1  order by intidpedido desc", [id], (err, rows, fields) => {
        //console.log(rows)
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
        // mysqlConnection.end();
      });
    });
  }

  async ActualizarObservacionEncabezado(data) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`update tblpedidosTerminal set strObservacion = '${data.strObservacion}' where intidpedido = ${data.intidpedido}`, (err, rows, fields) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
        // mysqlConnection.end();
      });
    });
  }

  async ActualizarCamposProducto(data) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`update tbldetallepedidosterminal set intcantidad = ${data.intCantidad} ,strObservacion ='${data.strObservacion}', strColor = '${data.strColor}', strtalla ='${data.strTalla}'where intidpedido = ${data.intIdPedido} and stridproducto = '${data.strIdProducto}'`, (err, rows, fields) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
        //mysqlConnection.end();
      });
    });
  }


 

  async EliminarPedidoTerminal(id) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(`update tblpedidosTerminal set intEstado = 5 where intIdPedido = ${id}`, (err, rows, fields) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
        //mysqlConnection.end();
      })
    })
  }




  // async EliminarDetallePedido(data) {
  //   return new Promise((resolve, reject) => {
  //     mysqlConnection.query(`delete from tbldetallepedidosterminal 
  //     where intidpedido = ${data.intIdPedido} and stridproducto = '${data.strIdProducto}'`,
  //       (err, rows, fields) => {
  //         if (!err) {
  //           console.log(err)
  //           resolve();
  //         } else {
  //           reject(err);
  //         }
  //         //mysqlConnection.end();
  //       });
  //   });
  // }

  async EliminarDetallePedido(data){
    return new Promise((resolve, reject) =>{
      mysqlConnection.query(`delete from tbldetallepedidosterminal where intidpedido = ${data.intIdPedido} and stridproducto = '${data.strIdProducto}'`, (err, rows, fields ) =>{
        if (!err) {
          mysqlConnection.query(`select intvalortotal as total  from tblpedidosTerminal where intIdPedido =${data.intIdPedido}`,(err, rows, fields) =>{
          let intvalortotal = rows[0].total;
          let valorTotal = intvalortotal - data.intPrecio;
          console.log(valorTotal)
          mysqlConnection.query(`update tblpedidosTerminal set intValorTotal = ${valorTotal} where intIdPedido = ${data.intIdPedido}`, (err, rows, fields) );
          resolve();
          });
        } else {
          reject(err);
        }
      });
    });
  }





  //original hasta el 26/05
  // async EliminarDetallePedido(data) {
  //   return new Promise((resolve, reject) => {
  //     console.log(data)
  //     const qryValorTotal = `select intvalortotal as total  from tblpedidosTerminal where intIdPedido =${data.intIdPedido} `;
    
  //     mysqlConnection.query(qryValorTotal, (err, rows, fields) => {
  //       if (!err) {
  //         let intvalortotal = rows[0].total;
  //         console.log(intvalortotal)
  //         const qryPrecioProducto = `select intPrecioProducto as PrecioProducto from tbldetallepedidosterminal where intidpedido = ${data.intIdPedido} and stridproducto = '${data.strIdProducto}'`;
  //         mysqlConnection.query(qryPrecioProducto, (err, rows, fields) => {
  //           if (!err) {
  //             let PrecioProducto = rows[0].PrecioProducto;
  //             console.log(PrecioProducto)
  //             let valorTotal = intvalortotal - PrecioProducto;
  //             mysqlConnection.query(`update tblpedidosTerminal set intValorTotal = ${valorTotal} where intIdPedido = ${data.intIdPedido}`, (err, rows, fields) => {
  //               if (!err) {
  //                 const qryEliminarProducto = `delete from tbldetallepedidosterminal 
  //                 where intidpedido = ${data.intIdPedido} and stridproducto = '${data.strIdProducto}'`;
  //                 mysqlConnection.query(qryEliminarProducto, (err, rows, fields) => {
  //                   if (!err) {

  //                   } else {
  //                     reject(err)
  //                   }
  //                 });
  //               } else {
  //                 reject(err)
  //               }
  //             });
  //           } else {
  //             reject(err)
  //           }
  //         });
  //         resolve()
  //       } else {
  //         reject(err)
  //       }
  //     });
  //   });
  // }

  // async EliminarDetallePedidoTerminal(data) {
  //   return new Promise((resolve, reject) => {
  //     // let strIdCliente = detalle.strIdCliente;
  //     // let strIdVendedor = detalle.strIdVendedor;
  //     mysqlConnection.query(`select intvalortotal as total  from tblpedidosTerminal where intIdPedido ='${data.intIdPedido}' `, (err, rows, fields) => {
  //       if (!err) {
  //         let intvalortotal = rows[0].total;
  //         console.log(intvalortotal)
  //         let intPrecioProducto = 0;
  //         intPrecioProducto= detalle.intCantidad * detalle.intPrecio;
  //         let valorTotal = intvalortotal + intPrecioProducto;
  //         // let intIdPedido = JSON.parse(JSON.stringify(rows[0].intNroPedido));
  //         const qryVrTotal = `update tblpedidosTerminal set intvalortotal = ${valorTotal} where intIdPedido = ${detalle.intIdPedido} `;
  //         mysqlConnection.query(qryVrTotal, (err, rows, fields));
  //         const query = "CALL SP_GuardarDetallePedidoTerminal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  //         mysqlConnection.query(query, [detalle.intIdPedido, detalle.strIdProducto, detalle.strDecripcion, detalle.intCantidad, detalle.strUnidadMedida, detalle.strObservacion, detalle.intPrecio,intPrecioProducto, detalle.strTalla, detalle.strColor], (err, rows, fields) => {
  //           if (!err) {
  //             resolve();
  //           } else {
  //             reject(err);
  //           }
  //         });
  //       } else {
  //         reject(err)
  //       }
  //       //mysqlConnection.end();
  //     });
  //   });
  // }




  async ConsultarEncabezadoPedidosVendedor(id) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query("select * from tblpedidosTerminal where intidpedido = (?)", [id], (err, rows, fields) => {
        //console.log(rows)
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
        //mysqlConnection.end();
      });
    });
  }

  async consultarPedidosVendedor(id) {
    return new Promise((resolve, reject) => {
      mysqlConnection.query("select * from tblpedidos where stridvendedor = (?) and IntEstado = 4  order by intidpedido desc limit 10", [id], (err, rows, fields) => {
        console.log(rows)
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
        //mysqlConnection.end();
      });
    });
  }
  // guarda encabezado antes de enviar el pedido
  async GuardarEncabezadoPedidoTerminal(encab) {
    return new Promise((resolve, reject) => {
      const query = "CALL SP_GuardarEncabezadoPedidoTerminal(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      mysqlConnection.query(query, [encab.strIdVendedor, encab.strNombVendedor, encab.strIdCliente, encab.strNombCliente, encab.strCiudadCliente, encab.intValorTotal, encab.dtFechaFinalizacion, encab.strObservacion, encab.strCorreoClienteAct, encab.strTelefonoClienteAct, encab.strCelularClienteAct, encab.strCiudadClienteAct, encab.strIdDependencia, encab.strNombreDependencia], (err, rows, fields) => {
        if (!err) {
          const resultado = JSON.parse(JSON.stringify(rows[0][0]));
          const nropedido = resultado.strMensaje;
          console.log(nropedido);
          resolve(nropedido);
        } else {
          reject(err);
        }
        //mysqlConnection.end();
      });
    });
  }
  /* version 1 que consulta el id pedido  NOMBRE GuardarDetallePedidoCONSULTANDOIDPEDIDO
   async GuardarDetallePedido(detalle) {  
     return new Promise((resolve, reject) => {
       let strIdCliente = detalle.strIdCliente;
       let strIdVendedor = detalle.strIdVendedor;
       mysqlConnection.query(`select max(intIdPedido) as 'intNroPedido', intvalortotal  from tblpedidosTerminal where stridvendedor ='${strIdVendedor}' and stridcliente = '${strIdCliente}'`,(err,rows, fields) =>{
         if (!err) {
          
           let intvalortotal =  JSON.parse(JSON.stringify(rows[0].intvalortotal));
            console.log(intvalortotal)
           let valorTotal = intvalortotal+detalle.intPrecio;
           let intIdPedido = JSON.parse(JSON.stringify(rows[0].intNroPedido));
           const qryVrTotal = `update tblpedidosTerminal set intvalortotal = ${valorTotal} where intIdPedido = ${intIdPedido} `;
           mysqlConnection.query(qryVrTotal,(err, rows, fields));
           const query = "CALL SP_GuardarDetallePedidoTerminal(?, ?, ?, ?, ?, ?, ?, ?, ?)";
              mysqlConnection.query(query, [intIdPedido, detalle.strIdProducto, detalle.strDecripcion, detalle.intCantidad, detalle.   strUnidadMedida, detalle.strObservacion, detalle.intPrecio, detalle.strTalla,detalle.strColor], (err, rows, fields) => {
              
               if (!err) {                
                  resolve();
               } else {
                  reject(err);
               }
            });
         } else {
           reject(err)
         }
       });     
    });
  }*/

  // async GuardarDetallePedido(detalle) {  version 2
  //   return new Promise((resolve, reject) => {
  //     let intvalortotal = JSON.parse(JSON.stringify(rows[0].intvalortotal));
  //     console.log(intvalortotal)
  //     let valorTotal = intvalortotal + detalle.intPrecio;
  //     let intIdPedido = JSON.parse(JSON.stringify(rows[0].intNroPedido));
  //     const qryVrTotal = `update tblpedidosTerminal set intvalortotal = ${valorTotal} where intIdPedido = ${intIdPedido} `;
  //     mysqlConnection.query(qryVrTotal, (err, rows, fields) => {
  //       if (!err) {
  //         const query = "CALL SP_GuardarDetallePedidoTerminal(?, ?, ?, ?, ?, ?, ?, ?, ?)";
  //         mysqlConnection.query(query, [detalle.intIdPedido, detalle.strIdProducto, detalle.strDecripcion, detalle.intCantidad, detalle.strUnidadMedida, detalle.strObservacion, detalle.intPrecio, detalle.strTalla, detalle.strColor], (err, rows, fields) => {
  //           if (!err) {
  //             resolve();
  //           } else {
  //             reject(err);
  //           }
  //         });
  //       } else {
  //         reject(err)
  //       }
  //     });
  //   });
  // }
  async GuardarDetallePedidoTerminal(detalle) {
    return new Promise((resolve, reject) => {
      // let strIdCliente = detalle.strIdCliente;
      // let strIdVendedor = detalle.strIdVendedor;
      mysqlConnection.query(`select intvalortotal as total  from tblpedidosTerminal where intIdPedido ='${detalle.intIdPedido}' `, (err, rows, fields) => {
        if (!err) {
          let intvalortotal = rows[0].total;
          console.log(intvalortotal)
          let intPrecioProducto = 0;
          intPrecioProducto = detalle.intCantidad * detalle.intPrecio;
          let valorTotal = intvalortotal + intPrecioProducto;
          // let intIdPedido = JSON.parse(JSON.stringify(rows[0].intNroPedido));
          const qryVrTotal = `update tblpedidosTerminal set intvalortotal = ${valorTotal} where intIdPedido = ${detalle.intIdPedido} `;
          mysqlConnection.query(qryVrTotal, (err, rows, fields));
          const query = "CALL SP_GuardarDetallePedidoTerminal(?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)";
          mysqlConnection.query(query, [detalle.intIdPedido, detalle.strIdProducto, detalle.strDecripcion, detalle.intCantidad, detalle.strUnidadMedida, detalle.strObservacion, detalle.intPrecio, intPrecioProducto, detalle.strTalla, detalle.strColor,detalle.strRutaImg], (err, rows, fields) => {
            if (!err) {
              resolve();
            } else {
              reject(err);
            }
          });
        } else {
          reject(err)
        }
        //mysqlConnection.end();
      });
    });
  }

  async crearPedidos(intIdPedido, strIdProducto, strDecripcion, intCantidad, strUnidadMedida, strObservacion, intPrecio, intPrecioProducto, strTalla, strCol) {
    return new Promise((resolve, reject) => {
      const query = `SET @intIdPedido = ?;
                          SET @strIdProducto = ?;
                          SET @strDecripcion = ?;
                          SET @intCantidad = ?;
                          SET @strUnidadMedida = ?;
                          SET @strObservacion = ?;
                          SET @intPrecio = ?;
                          SET @intPrecioProducto = ?;
                          SET @strTalla = ?;
                          SET @strColor = ?;
                          CALL SP_GuardarDetallePedido(SET @intIdPedido, 
                          SET @strIdProducto, 
                          SET @strDecripcion, 
                          SET @intCantidad, 
                          SET @strUnidadMedida, 
                          SET @strObservacion, 
                          SET @intPrecio, 
                          SET @intPrecioProducto, 
                          SET @strTalla, 
                          SET @strColor);`;

      mysqlConnection.query(query, [intIdPedido, strIdProducto, strDecripcion, intCantidad, strUnidadMedida, strObservacion, intPrecio, intPrecioProducto, strTalla, strCol], (err, rows, fields) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });

  }

  async enviarPedido(pedido) {
    console.log("desde SERVIVE --------", pedido)
    return new Promise((resolve, reject) => {
      const encabezado = pedido.encabezado;
      const detalle = pedido.detalle;
      console.log(encabezado)
      const query = "CALL SP_GuardarEncabezadoPedido(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      const detquery = "CALL SP_GuardarDetallePedido(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      mysqlConnection.query(query, [encabezado.strIdVendedor, encabezado.strNombVendedor, encabezado.strIdPedidoVendedor, encabezado.strIdCliente, encabezado.strNombCliente, encabezado.strCiudadCliente, encabezado.intValorTotal, encabezado.dtFechaFinalizacion, encabezado.intTipo, encabezado.intTipoPedido, encabezado.intCompania, encabezado.strObservacion, encabezado.strCorreoClienteAct, encabezado.strTelefonoClienteAct, encabezado.strCelularClienteAct, encabezado.strCiudadClienteAct, encabezado.strIdDependencia, encabezado.strNombreDependencia, encabezado.blEspera], (err, rows, fields) => {
        if (!err) {
          const resultado = JSON.parse(JSON.stringify(rows[0][0]));
          const nropedido = resultado.strMensaje;

          detalle.forEach(det => {
            mysqlConnection.query(detquery, [nropedido, det.strIdProducto, det.strDecripcion, det.intCantidad, det.strUnidadMedida, det.strObservacion, det.intPrecio, det.intPrecioProducto, det.strTalla, det.strCol], (err, rows, fields) => {
              if (!err) {
                resolve();
              } else {
                reject(err);
              }

            })
          })
          //   detalle.forEach( det =>{  mysqlConnection.query(detquery,[nropedido, det.strIdProducto, det.strDecripcion, det.intCantidad, det.strUnidadMedida, det.strObservacion, det.intPrecio, det.intPrecioProducto, det.strTalla, det.strCol], (err, rows, fields) => {
          //     if (!err) {
          //       resolve();
          //       } else {
          //         reject(err);
          //       }
          //   }

          // })
          resolve(rows);
        } else {
          reject(err);
        }
        //mysqlConnection.end();
      });
    });
  }

}

module.exports = PedidosService;


const CalcularTotal = (IntIdPedido) =>{
  mysqlConnection.query("select intPrecio, intCantidad from tbldetallePedidosTerminal where intIdPedido = ?",[IntIdPedido],(err,fields,rows)=>{
    let ArrProductos = rows
    let totalPrecio = 0
    for(const item of ArrProductos){
      totalPrecio += item.IntPrecio
    }
    
    "update tblPedidosTerminal set intValorTotal = totalPrecio where intIdpedido = ?",[IntIdPedido]
  })
}

// const mysql = require('mysql');

// function guardarPedido(encabezado, detalles) {
//   const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'tu_usuario',
//     password: 'tu_contraseña',
//     database: 'tu_base_de_datos'
//   });

//   connection.connect();

//   // Guardar el encabezado del pedido
//   const encabezadoQuery = `CALL SP_GuardarEncabezadoPedido('${encabezado.cliente}', '${encabezado.direccion}', '${encabezado.telefono}', '${encabezado.ciudad}', '${encabezado.vendedor}', '${encabezado.fecha}', ${encabezado.descuento}, '${encabezado.observaciones}', '${encabezado.email}', '${encabezado.nit}', '${encabezado.documento}')`;
//   connection.query(encabezadoQuery, (error, results) => {
//     if (error) {
//       console.error(error);
//       connection.end();
//       return;
//     }

//     // Obtener el número de pedido generado
//     const numPedido = results[0][0].idPedido;

//     // Guardar los detalles del pedido
//     detalles.forEach(detalle => {
//       const detalleQuery = `CALL SP_GuardarDetallePedido(${numPedido}, '${detalle.producto}', '${detalle.descripcion}', ${detalle.cantidad}, '${detalle.unidad}', '${detalle.observaciones}', ${detalle.precioUnitario}, ${detalle.total}, '${detalle.lote}', '${detalle.fechaVencimiento}')`;
//       connection.query(detalleQuery, (error, results) => {
//         if (error) {
//           console.error(error);
//           connection.end();
//           return;
//         }
//       });
//     });

//     // Cerrar la conexión a la base de datos
//     connection.end();
//   });
// }
