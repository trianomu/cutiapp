"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const leave_service_1 = require("./leave.service");
describe('LeaveService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [leave_service_1.LeaveService],
        }).compile();
        service = module.get(leave_service_1.LeaveService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=leave.service.spec.js.map