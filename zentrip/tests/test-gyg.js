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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var undici_1 = require("undici");
// Configura tus credenciales aquí
var GYG_USERNAME = 'zentrip'; // Reemplázalo con tu username
var GYG_PASSWORD = '4392d51687c605b11df5c2a9f0acb5ec'; // Reemplázalo con tu contraseña real
var AUTH = Buffer.from("".concat(GYG_USERNAME, ":").concat(GYG_PASSWORD)).toString('base64');
// Endpoint base para el sandbox
var BASE_URL = 'https://supplier-api.getyourguide.com/sandbox';
console.log('--- Verificando Credenciales y Configuración ---');
console.log('GYG_USERNAME:', GYG_USERNAME);
console.log('GYG_PASSWORD:', GYG_PASSWORD ? '********' : 'No configurada');
console.log('Endpoint Base:', BASE_URL);
function testNotifyAvailability() {
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, payload, response, responseText, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n--- Iniciando Prueba: Notify Availability Update ---');
                    endpoint = "".concat(BASE_URL, "/notify-availability-update");
                    payload = {
                        product_id: "12345", // Producto ficticio
                        availability: {
                            date: "2025-01-30",
                            time: "09:00:00",
                            vacancies: 10,
                        },
                    };
                    console.log('Payload:', JSON.stringify(payload, null, 2));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, undici_1.fetch)(endpoint, {
                            method: 'POST',
                            headers: {
                                Authorization: "Basic ".concat(AUTH),
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(payload),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 3:
                    responseText = _a.sent();
                    console.log('Respuesta Notify Availability:', responseText);
                    if (!response.ok) {
                        throw new Error("Error en el test Notify Availability: ".concat(response.status, " - ").concat(responseText));
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error en Notify Availability:', error_1.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function testCreateDeal() {
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, payload, response, responseText, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n--- Iniciando Prueba: Create Deal ---');
                    endpoint = "".concat(BASE_URL, "/deals");
                    payload = {
                        deal_name: "Test Deal",
                        discount: 10,
                        valid_from: "2025-01-30T00:00:00Z",
                        valid_to: "2025-02-15T23:59:59Z",
                    };
                    console.log('Payload:', JSON.stringify(payload, null, 2));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, undici_1.fetch)(endpoint, {
                            method: 'POST',
                            headers: {
                                Authorization: "Basic ".concat(AUTH),
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(payload),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 3:
                    responseText = _a.sent();
                    console.log('Respuesta Create Deal:', responseText);
                    if (!response.ok) {
                        throw new Error("Error en el test Create Deal: ".concat(response.status, " - ").concat(responseText));
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error en Create Deal:', error_2.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('\n--- Iniciando Pruebas de GetYourGuide ---');
                return [4 /*yield*/, testNotifyAvailability()];
            case 1:
                _a.sent();
                return [4 /*yield*/, testCreateDeal()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
