import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request as Req } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { AuditService } from '../audit/audit.service';

const COOKIE_NAME = 'pf_access_token';
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private auditService: AuditService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response, @Request() req: Req) {
    const result = await this.authService.register(dto);
    res.cookie(COOKIE_NAME, result.token, COOKIE_OPTS);
    this.auditService.log({
      userId: result.user.id,
      userEmail: result.user.email,
      action: 'REGISTER',
      entity: 'User',
      entityId: result.user.id,
      ip: req.ip,
    });
    return { user: result.user };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response, @Request() req: Req) {
    const result = await this.authService.login(dto);
    res.cookie(COOKIE_NAME, result.token, COOKIE_OPTS);
    this.auditService.log({
      userId: result.user.id,
      userEmail: result.user.email,
      action: 'LOGIN',
      entity: 'User',
      entityId: result.user.id,
      ip: req.ip,
    });
    return { user: result.user };
  }

  @Get('me')
  me(@Request() req: { user: unknown }) {
    return req.user;
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(COOKIE_NAME, { path: '/' });
    return { message: 'Sessão encerrada' };
  }
}
