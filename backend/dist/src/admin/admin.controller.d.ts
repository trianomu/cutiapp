import { JwtPayload } from 'src/auth/jwt-payload.interface';
export declare class AdminController {
    getProfile(user: JwtPayload): {
        message: string;
        user: JwtPayload;
    };
}
