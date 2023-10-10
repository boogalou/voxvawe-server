import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';

export const mailerConfig: MailerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<MailerOptions> => ({
    transport: {
      host: String(configService.get('SMTP_HOST')),
      port: Number(configService.get('SMTP_PORT')),
      auth: {
        user: String(configService.get('SMTP_USER')),
        pass: String(configService.get('SMTP_PASS')),
      },
    },
  }),
};
