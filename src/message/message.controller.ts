import { Body, Controller, Get, Injectable, Param, Patch, Query, Req, Res, UseGuards } from "@nestjs/common";
import { MessageService } from "./message.service";
import { Response, Request } from "express";
import { AuthGuard } from "../user/guard/auth.guard";


@Injectable()
@UseGuards(AuthGuard)
@Controller("messages/")
export class MessageController {


  constructor(
    private readonly messageService: MessageService
  ) {
  }

  @Get("message/:id")
  async getOneMessage(@Param("id") id: string) {

  }

  @Get("latest")
  async getLatestMessages(
    @Req() req: Request,
    @Query("chatId") chatId: number,
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Res() res: Response) {
    const token = req.headers.authorization
    const latestMessages = await this.messageService.getLatestMessages(chatId, page, limit, token);
    res.send(latestMessages);
    return;
  }

  @Get("history")
  async getMessageHistory(@Query("start") start: number, @Query("end") end: number) {
    // Возвращает историю сообщений в заданном диапазоне
  }

  @Patch("message/edit/:id")
  async editMessage(@Body("id") id: string) {
  }
}