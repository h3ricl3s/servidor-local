import type { Request, Response } from "express";
import { orcamentoModel } from "../models/orcamento.model.js";
import { EstadoProposta, type orcamentoDBType, type PrestadorType, type propostaDBType, type ResponseType } from "../utils/types.js";
import { PrestacaoServicoController } from "./prestacao.servico.controller.js";
import { PropostaModel } from "../models/proposta.model.js";
import { PrestadorModel } from "../models/prestador.model.js";
import { PrestacaoServicoModel } from "../models/servico.models.js";
import { PrestacaoModel } from "../models/prestacao.servico.model.js";
import { id } from "date-fns/locale";

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const newOrcamento: orcamentoDBType = req.body;

        if (!newOrcamento) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const createOrcamentoResponse: orcamentoDBType | null = await orcamentoModel.create(newOrcamento);

        if (createOrcamentoResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<orcamentoDBType> = {
            status: "sucess",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        };
        return res.status(200).json(response);

    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentoResponse: orcamentoDBType[] | null = await orcamentoModel.getAll();

        if (!getAllOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            });
        }

        const response: ResponseType<orcamentoDBType[]> = {
            status: "sucess",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentoResponse
        };
        return res.status(200).json(response);
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

        const getOrcamentoResponse: orcamentoDBType | null = await orcamentoModel.get(id as string);

        if (!getOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            };
            return res.status(404).json(response);
        }

        const response: ResponseType<orcamentoDBType> = {
            status: "sucess",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoResponse
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedOrcamento: orcamentoDBType = req.body;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            };
            return res.status(400).json(response);
        }

        if (!updatedOrcamento) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null,
            };
            return res.status(400).json(response);
        }

        const updateOrcamentoResponse: orcamentoDBType | null = await orcamentoModel.update(id as string, updatedOrcamento);

        if (!updateOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<orcamentoDBType> = {
            status: "sucess",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse,
        };
        return res.status(200).json(response);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            };
            return res.status(400).json(response);
        }

        const deleteOrcamentoResponse = await orcamentoModel.delete(id as string);

        if (!deleteOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<orcamentoDBType> = {
            status: "sucess",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse,
        };
        return res.status(200).json(response);
    }
};



//calcular budget
async function calcularBudget(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
        const response: ResponseType<null> = {
            status: "error",
            message: "ID obrigatorio",
            data: null
        }
        return res.status(400).json(response);
    }


    //logic based on the following
    //accepted propostal bring id_prestador which has urgency tax,minimun for discount percentage according to types 
    //proposal has preco_hora and estimated hours accoprding to utils/types.ts


    //trhen calculate the budget

    //to fetch proposal  we need to fetch prestacao _servico first
    const prestacaoServico = await PrestacaoServicoModel.getByIdOrcamento(id as string)

    if (!prestacaoServico) {
        const response: ResponseType<null> = {
            status: "error",
            message: "Prestacao de servico nao encontrada",
            data: null
        };
        return res.status(404).json(response);
    }

    // FETCH ALL PROPOSTAL
    const propostals = await PropostaModel.getByPrestacaoServico(String(prestacaoServico.id))

    if (!propostals) {
        const response: ResponseType<null> = {
            status: "error",
            message: "Propostas nao encontradas",
            data: null
        };
        return res.status(404).json(response);
    }


    //filter accepted proposal
    const acceptedProposta: propostaDBType | undefined = propostals.find((proposta) => proposta.estado === EstadoProposta.ACEITE)

    if (!acceptedProposta) {
        const response: ResponseType<null> = {
            status: "error",
            message: "Ainda nenhuma proposta foi aceita",
            data: null
        };
        return res.status(404).json(response);
    }

    const precoHora = acceptedProposta.preco_hora;
    const horasEstimadas = acceptedProposta.horas_estimadas;

    //fetch prestador to get urgency tax minimum discount and discount percentage based on attrs in utils/types.ts
    const prestador = await PrestadorModel.get(acceptedProposta.id_prestador as string)

    if (!prestador) {
        const response: ResponseType<null> = {
            status: "error",
            message: "Prestador nao encontrado",
            data: null
        };
        return res.status(404).json(response);
    }

    const taxaUrgencia = prestador.taxa_urgencia;
    const minimunDiscount = prestador.minimo_desconto;
    const discountPercentage = prestador.percentagem_desconto;

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
        const response: ResponseType<null> = {
            status: "error",
            message: "Erro ao calcular orcamento",
            data: null
        };
        return res.status(400).json(response);
    }

    const response: ResponseType<orcamentoDBType> = {
        status: "sucess",
        message: "orcamento calculado e atualizado com sucesso",
        data: updatedOrcamentoResponse
    };
    return res.status(200).json(response);

}

