"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const vitest_1 = require("vitest");
const __mocks__1 = require("../__mocks__");
vitest_1.vi.mock('../db', () => {
    return {
        prismaClient: {
            sum: {
                create: vitest_1.vi.fn(),
            }
        }
    };
});
(0, vitest_1.describe)("testing sum endpoint", () => {
    (0, vitest_1.it)("testing positive numbers", () => __awaiter(void 0, void 0, void 0, function* () {
        __mocks__1.prismaClient.sum.create.mockResolvedValue({
            id: 1,
            a: 5,
            b: 10,
            result: 15
        });
        const res = yield (0, supertest_1.default)(index_1.app).post("/sum").send({
            a: 5,
            b: 10
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.answer).toBe(15);
    }));
    (0, vitest_1.it)("testing negative numbers", () => __awaiter(void 0, void 0, void 0, function* () {
        __mocks__1.prismaClient.sum.create.mockResolvedValue({
            id: 1,
            a: 5,
            b: 10,
            result: 15
        });
        const res = yield (0, supertest_1.default)(index_1.app).post("/sum").send({
            a: -5,
            b: -10
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.answer).toBe(-15);
    }));
    (0, vitest_1.it)("testing For Bad Inputs", () => __awaiter(void 0, void 0, void 0, function* () {
        __mocks__1.prismaClient.sum.create.mockResolvedValue({
            id: 1,
            a: 5,
            b: 10,
            result: 15
        });
        const res = yield (0, supertest_1.default)(index_1.app).post("/sum").send({
            a: "kunal",
            b: 'a'
        });
        (0, vitest_1.expect)(res.statusCode).toBe(411);
        (0, vitest_1.expect)(res.body.message).toBe("Invalid Inputs");
    }));
});
