import type { Request, Response } from "express";
import { orcamentoModel } from "../models/orcamento.model.js";
import { EstadoProposta, type orcamentoDBType, type PrestadorType, type propostaDBType } from "../utils/types.js";
import { PrestacaoServicoController } from "./prestacao.servico.controller.js";
import { PropostaModel } from "../models/proposta.model.js";
import { PrestadorModel } from "../models/prestador.model.js";
import { PrestacaoServicoModel } from "../models/prestacao.servico.models.js";
import { PrestacaoModel } from "../models/prestacao.model.js";
import { id } from "date-fns/locale";

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const newOrcamento: orcamentoDBType = req.body;

        if (!newOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            });
        }

        const createOrcamentoResponse = await orcamentoModel.create(newOrcamento);

        if (createOrcamentoResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        });
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentoResponse = await orcamentoModel.getAll();

        if (!getAllOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentoResponse
        });
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID de orcamento nao fornecido",
                data: null
            });
        }

        const getOrcamentoResponse = await orcamentoModel.get(id as string);

        if (!getOrcamentoResponse) {
            return res.status(404).json({
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoResponse
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedOrcamento: orcamentoDBType = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        if (!updatedOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null,
            });
        }

        const updateOrcamentoResponse = await orcamentoModel.update(id as string, updatedOrcamento);

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse,
        });
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        const deleteOrcamentoResponse = await orcamentoModel.delete(id as string);

        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse,
        });
    }
};



//calcular budget
async function calcularBudget(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID obrigatorio",
            data: null
        });
    }


//logic based on the following
//accepted propostal bring id_prestador which has urgency tax,minimun for discount percentage according to types 
//proposal has preco_hora and estimated hours accoprding to utils/types.ts


//trhen calculate the budget

//to fetch proposal  we need to fetch prestacao _servico first
const prestacaoServico = await PrestacaoServicoModel.getByIdOrcamento( id as string)

if (!prestacaoServico) {
    return res.status(404).json({
        status: "error",
        message: "Prestacao de servico nao encontrada",
        data: null
    });
}

// FETCH ALL PROPOSTAL
const propostals =await PropostaModel.getByPrestacaoServico(prestacaoServico.id as string)

if(!propostals){
    return res.status(404).json({
        status: "error",
        message: "Propostas nao encontradas",
        data: null
    });
}


//filter accepted proposal
const acceptedProposta: propostaDBType | undefined = propostals.find((proposta) => proposta.estado ===EstadoProposta.ACEITE)

if(!acceptedProposta){
    return res.status(404).json({
        status: "error",
        message: "Ainda nenhuma proposta foi aceita",
        data: null
    }); 
}

const precoHora = acceptedProposta.preco_hora;
const horasEstimadas = acceptedProposta.horas_estimadas;

//fetch prestador to get urgency tax minimum discount and discount percentage based on attrs in utils/types.ts
const prestador = await PrestadorModel.get(acceptedProposta.id_prestador)

if(!prestador){
    return res.status(404).json({
        status: "error",
        message: "Prestador nao encontrado",
        data: null
    });
}

const taxaUrgencia = prestador.taxaUrgencia;
const minimunDiscount = prestador.minimoDesconto;
const discountPercentage = prestador.percentagemDesconto;

//CALCULE THE BUDGE BASED ON UTILS/Types.ts
let subtotal = precoHora * horasEstimadas;

//if minimum discount is greater than discount percentage
if (subtotal > minimunDiscount) {
    subtotal = subtotal * (1 - discountPercentage)
}
if (prestacaoServico.urgente) {
    // add urgency tax
    subtotal = subtotal * (1 + taxaUrgencia);
}

const updatedOrcamentoResponse = await orcamentoModel.updateBudget(id as string, subtotal);

if (!updatedOrcamentoResponse) {
    return res.status(400).json({
        status: "error",
        message: "Erro ao calcular orcamento",
        data: null
    });
}

return res.status(200).json({
    status: "success",
    message: "orcamento calculado e atualizado com sucesso",
    data: updatedOrcamentoResponse
});
}
