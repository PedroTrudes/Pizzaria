const conexao = require('../infraestrutura/conexao')


class Atendimento {
    adiciona(atendimento, res) {
       
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacao = [{
            nome: 'nome',
            valido: clienteEhValido,
            mensagem: 'Cliente deve ter no minimo 5 caracter'
        }]

        const erros = validacao.filter(campo => !campo.valido)
        const existemErros = erros.length
        if(existemErros){
            res.status(400).json(erros)
        }else {
            const pedido = {...atendimento}

            const sql = 'INSERT INTO pedidos SET ?'
    
            conexao.query(sql, pedido, (erro, resultados) => {
                if(erro){
                   res.status(400).json(erro)
                }else {
                    res.status(201).json(resultados)
                }
            })
        }
     
    }
    lista(res){
        const sql= 'SELECT * FROM pedidos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    altera(id, valores, res){

        const sql = 'UPDATE pedidos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })

    }

    deleta(id, res){
        const sql = 'DELETE FROM pedidos WHERE id = ?'

        conexao.query(sql, id,  (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(id)
            }
        })
    }
    buscaPorId(id, res){
        const sql = `SELECT * FROM pedidos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) =>{
        const atendimento = resultados[0]
          if(erro){
            res.status(400).json(erro)
          }else{
            res.status(200).json(atendimento)
          }  
        })

    }

}

module.exports = new Atendimento