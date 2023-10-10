import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { VkModule } from "../vk/vk.module";

@Module({
  imports: [VkModule],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
