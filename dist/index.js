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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const zod_1 = __importDefault(require("zod"));
const db_1 = require("./db");
const inputSchema = zod_1.default.object({
    a: zod_1.default.number(),
    b: zod_1.default.number(),
});
exports.app.post("/sum", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedBody = inputSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(411).json({
            success: false,
            message: "Invalid Inputs",
        });
    }
    const answer = parsedBody.data.a - parsedBody.data.b;
    const response = yield db_1.prismaClient.sum.create({
        data: {
            a: parsedBody.data.a,
            b: parsedBody.data.b,
            result: answer
        }
    });
    // console.log(result);
    return res.status(200).json({
        sucess: true,
        message: "",
        answer,
        a: response.a,
        b: response.b,
        id: response.id
    });
}));
