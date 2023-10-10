import { Controller, Inject, Injectable, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { VkService } from "../vk/vk.service";
import { AuthGuard } from "../user/guard/auth.guard";


@Injectable()
@UseGuards(AuthGuard)
@Controller("upload")
export class UploadController {

  constructor(
    private readonly vkService: VkService
  ) {
  }

  @Post("image")
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ) {
    if (file.mimetype.includes("image")) {
      const response = await this.vkService.uploadImage(file);
      res.send(response);
    }
  };

  @Post("voice")
  @UseInterceptors(FileInterceptor("file"))
  async uploadVoice(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ) {
    const response = await this.vkService.uploadVoice(file);
    res.send(response);
  };

}
