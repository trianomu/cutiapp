"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employee_service_1 = require("./employee.service");
describe('EmployeeService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [employee_service_1.EmployeeService],
        }).compile();
        service = module.get(employee_service_1.EmployeeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=employee.service.spec.js.map