import express, { Request, Response } from "express";
export const app = express();
app.use(express.json());
import z from "zod";
import { prismaClient } from "./db";


const inputSchema  = z.object({

    a : z.number(),
    b : z.number(),

})

app.post("/sum", async(req : any, res: any) => {

    const parsedBody = inputSchema.safeParse(req.body);

    if(!parsedBody.success) {

         return res.status(411).json({
            success : false,
            message : "Invalid Inputs",
        })
        
    }

    const answer = parsedBody.data.a - parsedBody.data.b;

    const response = await prismaClient.sum.create({
        data : {
            a : parsedBody.data.a,
            b : parsedBody.data.b,
            result : answer
        }
    });

    // console.log(result);

    return res.status(200).json({
        sucess : true,
        message : "",
        answer,
        a : response.a,
        b : response.b,
        id : response.id
    })

})
