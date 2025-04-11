// importação da biblioteca do Row(linha)Data(dados)packet(Pacote). Guardar todos os dados que retorna da consulta select.
// O comando ResultSetHeader é utilizado para executar as consultas de modificação das tabelas.
import { RowDataPacket, ResultSetHeader } from "mysql2";
// importação a conexão(connect) com o banco de dados para fazer a consulta nas tabelas do banco.
import connect from "../databese";

// A interface faz uma descrição da estrutura de dados da tabela Usuário.
export interface User extends RowDataPacket {
    id: number;
    name: string;
    email: string;
}

/**
Exporta a função getAllUsers(pegarTodosOSUsuarios) do banco de dados.
está função é do tipo ascíncrona e, portanto, aguardar um processesamento interno  
 */

//Essa linha faz uma consulta no banco para pegar todos os usuários da tabela users, espera a resposta (await) e guarda os resultados (as linhas) na rows.
export async function getAllUsers(): Promise<User[]> {
    const [rows] = await connect.query<User[]>('SELECT * FROM users', []);
    return rows;
}

/*A função do ResultSetHeader é fornecer informações sobre a execução de comandos SQL que não retornam dados, como:INSERT, UPDATE, DELETE, REPLACE
Comandos DDL (CREATE TABLE, ALTER, etc.)
Ou seja, o ResultSetHeader não contém dados da tabela, mas detalhes sobre o que aconteceu com o banco de dados após a execução.
*/

// Função para criar um novo usuário
// Aguarda o usuário a ser cadastrado. estamos usando a função como async...await
/*
Para cadastrar um Usuário será necessário passar o usuário por parâmetro e, ele será gerenciado pelo seu ID.
*/
export async function createUser(user: Omit<User, 'id'>): Promise<ResultSetHeader> {
    try {
        /*
        vamos usar o comando INSERT para cadastrar o usuário no banco de dados e o await irá esperar pelo cadastro completo do usuário.
        Na consulta do INSERT está sendo passada por 2 parâmentros com o simbolo de ?.
        Consultas parametrizadas evitam a injeção de SQL
        */
        const [result] = await connect.execute<ResultSetHeader>(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [user.name, user.email]
        );
        return result;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}
// Função para atualizar um usuário existente
export async function updateUser(id: number, user: Omit<User, 'id'>): Promise<ResultSetHeader> {
    try {
        /*
        Vamos usar o UPDATE para atualizar os dados de um usuário (nome e e-mail) no banco de dados, baseado no id dele.
        */
        const [result] = await connect.execute<ResultSetHeader>(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [user.name, user.email, id]
        );
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
}
// Função para deletar um usuário
export async function deleteUser(id: number): Promise<ResultSetHeader> {
    try {
        /*
        A função DELETE serve para remover um usuário do banco de dados, usando o seu id.
        */
        const [result] = await connect.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
}