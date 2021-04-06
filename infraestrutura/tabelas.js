class Tabelas {
    init(conexao){
        this.conexao = (conexao)

        this.criarAtendimentos()
    }

    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS pedidos ( id int auto_increment primary key, cliente varchar (50)not null,sabor varchar (50) not null, quantidade int not null, tamanho char(4) not null);'
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro) 
            } else {
                console.log('Tabela foi criada')

            }
        })
    }
}

module.exports = new Tabelas