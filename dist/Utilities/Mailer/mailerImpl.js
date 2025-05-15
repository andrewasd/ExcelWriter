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
exports.mailSenderImpl = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const checkvalidemailAddress_js_1 = require("../CredentialsReader/checkvalidemailAddress.js");
const workerLogger_js_1 = require("../workerLogger.js");
class mailSenderImpl {
    constructor(emailconfig) {
        this.emailconfig = emailconfig;
        if (!(0, checkvalidemailAddress_js_1.isvalidEmail)(this.emailconfig.username)) {
            (0, workerLogger_js_1.logEvent)(`not valid email ${this.emailconfig.username}`);
            throw new Error("not valid email");
        }
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                host: this.emailconfig.smtpServer,
                from: "CMDB BOT",
                port: 587, // or 465 for secure
                secure: false, // true for port 465
                subject: options.subject,
                auth: {
                    user: this.emailconfig.username,
                    pass: this.emailconfig.password,
                },
            });
            const mailOptions = {
                from: `"Sender Name" <${this.emailconfig.username}>`,
                to: options.recipients,
                subject: options.subject,
                text: options.text,
                attachments: options.filesPath
                    ? options.filesPath.map((file) => {
                        return {
                            filename: path_1.default.basename(file),
                        };
                    })
                    : undefined,
            };
            transporter
                .sendMail(mailOptions)
                .then((result) => console.log("Message sent:", result.messageId))
                .catch((error) => {
                throw new Error(JSON.stringify(error));
            });
        });
    }
}
exports.mailSenderImpl = mailSenderImpl;
//# sourceMappingURL=mailerImpl.js.map