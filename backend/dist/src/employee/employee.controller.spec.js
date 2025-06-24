"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employee_controller_1 = require("./employee.controller");
const employee_service_1 = require("./employee.service");
describe('EmployeeController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [employee_controller_1.EmployeeController],
            providers: [
                {
                    provide: employee_service_1.EmployeeService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                        findAllWithLeaves: jest.fn(),
                    },
                },
            ],
        }).compile();
        controller = module.get(employee_controller_1.EmployeeController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=employee.controller.spec.js.map