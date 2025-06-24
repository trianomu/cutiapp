import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    validateAdmin(email: string, password: string): Promise<{
        access_token: string;
        admin: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            gender: import(".prisma/client").$Enums.Gender;
            birthDate: Date;
        };
    }>;
}
