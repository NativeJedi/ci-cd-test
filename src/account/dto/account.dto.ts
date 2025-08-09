import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Account } from '../entities/account.entity';
import { IsEmail, IsOptional, IsString } from 'class-validator';

class CreateAccountDto extends OmitType(Account, ['id', 'balance'] as const) {
  @IsString()
  @IsOptional()
  balance?: string;

  @IsEmail()
  email: string;
}

class UpdateAccountDto extends PartialType(CreateAccountDto) {}

export { CreateAccountDto, UpdateAccountDto };
