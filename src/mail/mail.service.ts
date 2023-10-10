import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  async sendActivationMail(email: string, activationLink: string): Promise<void> {
    await this.mailerService.sendMail({
      from: 'box.test.dev@gmail.com',
      to: email,
      subject: `confirm your email on ${this.configService.get('CLIENT_URL')}`,
      text: 'follow the link to activate your account',
      html:
        ` <div>
           <h2>Activate your account</h2>
           <a href=${this.configService.get('API_URL')}/api/activate/${activationLink}>Перейти для потдверждения</a>
         </div>
        `
    });
  }
}
