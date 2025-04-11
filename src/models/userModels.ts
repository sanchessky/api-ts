// importação da biblioteca do Row(linha)Data(dados)packet(Pacote). Guardar todos os dados que retorna da consulta select
import { RowDataPacket, ResultSetHeader } from "mysql2";
// importação a conexão(connect) com o banco de dados para fazer a consulta nas tabelas do banco
import connect from "../databese";

// A interface faz uma descrição da estrutura de dados da tabela Usuário
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
Ou seja, o ResultSetHeader não contém dados da tabela, mas detalhes sobre o que aconteceu com o banco de dados após a execução da query.
*/

// Função para criar um novo usuário
export async function createUser(user: Omit<User, 'id'>): Promise<ResultSetHeader> {
    try {
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