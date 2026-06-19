import express from "express";
import supabase from "../supabase.js";

const router = express.Router();

router.post("/", async (req, res) => {

    const {
        usuario_id,
        valor_total,
        itens
    } = req.body;

    const { data: pedido, error } =
        await supabase
            .from("pedidos")
            .insert({
                usuario_id,
                valor_total,
                status: "PENDENTE"
            })
            .select()
            .single();

    if (error)
        return res.status(400).json(error);

    const itensPedido = itens.map(item => ({
        pedido_id: pedido.id,
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco: item.preco
    }));

    await supabase
        .from("pedido_itens")
        .insert(itensPedido);

    for (const item of itens) {

        const { data: produto } =
            await supabase
                .from("produtos")
                .select("estoque")
                .eq("id", item.produto_id)
                .single();

        await supabase
            .from("produtos")
            .update({
                estoque:
                    produto.estoque - item.quantidade
            })
            .eq("id", item.produto_id);
    }

    await supabase
        .from("carrinho")
        .delete()
        .eq("usuario_id", usuario_id);

    res.json({
        sucesso: true,
        pedido
    });
});

router.get("/:usuario", async (req, res) => {

    const { data, error } =
        await supabase
            .from("pedidos")
            .select(`
                *,
                pedido_itens(*)
            `)
            .eq(
                "usuario_id",
                req.params.usuario
            );

    if (error)
        return res.status(400).json(error);

    res.json(data);
});

export default router;