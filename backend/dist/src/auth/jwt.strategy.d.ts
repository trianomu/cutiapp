import { Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        gender: string;
        birthDate: string;
    }>;
}
export {};
