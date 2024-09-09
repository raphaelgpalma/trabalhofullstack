const exp = require('constants');
const {Person} = require('../models');

exports.createPerson = async (req, res) => {
    try {
        const {name, cpf, phone} = req.body;

        const newPerson = await Person.create({name, cpf, phone});

        return res.status(201).json(newPerson);
    } catch (error) {        
        return res.status(500).json({error: error.message});
    }
};

exports.getPersons = async (req, res) => {
    try {
        const persons = await Person.findAll();

        return res.status(200).json(persons);
    } catch (error) {
        return res.status(500).json({error: 'Erro ao buscar lista de cadastros', details: error.message});
    }
}

exports.getPersonById = async (req, res) => {
    try {
        const {id} = req.params;

        const person = await Person.findByPk(id);

        if (!person) {
            return res.status(404).json({error: 'Cadastro não encontrada'});
        }

        return res.status(200).json(person);
    } catch (error) {
        return res.status(500).json({error: 'Erro ao buscar cadastro', details: error.message});
    }
}

exports.updatePerson = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, cpf, phone} = req.body;

        const person = await Person.findByPk(id);

        if (!person) {
            return res.status(404).json({error: 'Cadastro não encontrada'});
        }

        person.name = name;
        person.cpf = cpf;
        person.phone = phone;

        await person.save();

        return res.status(200).json(person);
    } catch (error) {
        return res.status(500).json({error: 'Erro ao atualizar cadastro de pessoa', details: error.message});
    }
}

exports.deletePerson = async (req, res) => {
    try {
        const {id} = req.params;

        const person = await Person.findByPk(id);

        if (!person) {
            return res.status(404).json({error: 'Cadastro não encontrada'});
        }

        await person.destroy();

        return res.status(200).json({message: 'Cadastro excluído com sucesso'});
    } catch (error) {
        return res.status(500).json({error: 'Erro ao excluir cadastro de pessoa', details: error.message});
    }
}