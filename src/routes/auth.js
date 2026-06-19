import express from "express";
import supabase from "../supabase.js";

const router = express.Router();

router.post("/cadastro", async (req, res) => {

    const { email, password } = req.body;

    const { data, error } =
        await supabase.auth.signUp({
            email,
            password
        });

    if (error)
        return res.status(400).json(error);

    res.json(data);
});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password
        });

    if (error)
        return res.status(400).json(error);

    res.json(data);
});

export default router;