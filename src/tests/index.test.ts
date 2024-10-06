import request  from "supertest";
import { app } from "../index";
import {describe, it, expect, vi} from "vitest";
import { prismaClient } from "../__mocks__";

vi.mock('../db', () => {

    return {
        prismaClient : {
            sum : {
                create : vi.fn(),
            }
        }
    }
});

describe("testing sum endpoint", () => {

    it("testing positive numbers", async() => {

        prismaClient.sum.create.mockResolvedValue({
            id : 1,
            a : 5, 
            b : 10,
            result : 15
        });

        const res = await request(app).post("/sum").send({
            a : 5,
            b : 10
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(15);
    })

    it("testing negative numbers", async() => {

        prismaClient.sum.create.mockResolvedValue({
            id : 1,
            a : 5, 
            b : 10,
            result : 15
        });

        const res = await request(app).post("/sum").send({
            a : -5,
            b : -10
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(-15);
    })

    it("testing For Bad Inputs", async() => {

        prismaClient.sum.create.mockResolvedValue({
            id : 1,
            a : 5, 
            b : 10,
            result : 15
        });
        
        const res = await request(app).post("/sum").send({
            a : "kunal",
            b : 'a'
        })

        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Invalid Inputs");
    })

})


