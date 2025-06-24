"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const leave_controller_1 = require("./leave.controller");
const leave_service_1 = require("./leave.service");
describe('LeaveController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [leave_controller_1.LeaveController],
            providers: [
                {
                    provide: leave_service_1.LeaveService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();
        controller = module.get(leave_controller_1.LeaveController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=leave.controller.spec.js.map