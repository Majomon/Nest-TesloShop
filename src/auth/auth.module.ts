import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        // console.log('JWT_SECRET:', process.env.JWT_SECRET);

        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '2h' },
        };
      },
    }),
    /*    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }), */
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
