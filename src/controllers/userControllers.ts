/*
O controlador de dados lida com as requisições do usuário e, também faz as resposta ao usuário.
Portanto, iremos importas as bibliotecas:
Request e Response do Fremework Express
*/
import { Request, Response } from "express";

/*
Importar a função que tras todos os Usuários, createUser, updateUseR, deleteUser, User
*/
import { getAllUsers, createUser, updateUser, deleteUser, User } from "../models/userModels";
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
// CREATE
/*
A função CREATE cadastra novos usuários partir dos dados enviados pelo frontend. Serão passadas via request
*/
export async function create(req: Request, res: Response): Promise<void> {
    try {
        //a constante user, guarda o usuário enviado pelo frontend e passao método createUser
        const user: Omit<User, "id"> = req.body
        const rs = await createUser(user);
        res.status(201).json(`Cadastro realizado -> ${rs}`);
    }
    catch (err) {
        res.status(500).json(`Erro ao tentar cadastrar ${err}`);
    }
}
//UPDATE
export async function update(req: Request, res: Response): Promise<void> {
    try {
        const user: Omit<User, "id"> = req.body
        const rs = await updateUser(parseInt(req.params.id), user)
        res.status(201).json(`Atualizado -> ${rs}`);
    }
    catch (err) {
        res.status(500).json(`Erro ao tentar cadastrar ${err}`);
    }
}
//DELETE
export async function deleta(req: Request, res: Response): Promise<void> {
    try {
        const rs = await deleteUser(parseInt(req.params.id))
        res.status(201).json(`Atualizado -> ${rs}`);
    }
    catch (err) {
        res.status(500).json(`Erro ao tentar cadastrar ${err}`);
    }
}
