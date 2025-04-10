// importação da biblioteca do Row(linha)Data(dados)packet(Pacote). Guardar todos os dados que retorna da consulta select
import { RowDataPacket } from "mysql2";
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
