import { Module } from "@nestjs/common";
import { VkService } from "./vk.service";


@Module({
  imports: [],
  providers: [VkService],
  exports: [VkService]
})
export class VkModule {

}