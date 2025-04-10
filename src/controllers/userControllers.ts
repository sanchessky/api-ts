/*
O controlador de dados lida com as requisições do usuário e, também faz as resposta ao usuário.
Portanto, iremos importas as bibliotecas:
Request e Response do Fremework Express
*/
import { Request, Response } from "express";

/*
Importar a função que tras todos os User
*/
import { getAllUsers } from "../models/userModels";
/*

*/
export async function getUsers(req: Request, res: Response): Promise<void> {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ er: `Erro ao tentar buscar os usuários -> ${error}` })
    }
}