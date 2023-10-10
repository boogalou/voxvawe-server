import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthGuard } from "../user/guard/auth.guard";
import { DialogService } from "./dialog.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { AddMemberDto } from "./dto/add-member.dto";



@Controller('dialogs')
@UseGuards(AuthGuard)
export class DialogController {

  constructor(
    private readonly dialogService: DialogService,
  ) {
  }

  @Get()
  async getDialogs(@Req() req: Request,  @Res() res: Response) {
    const token = req.headers.authorization;
    const dialogs = await this.dialogService.getDialogs(token);
    res.send(dialogs);
    return;
  }

  @Post('create')
  async createGroup(@Body() createGroupDto: CreateGroupDto, @Res() res: Response) {
    const newGroup = await this.dialogService.createGroup(createGroupDto)
    res.send(newGroup);
    return;
  };

  @Post('add-member')
  async addMemberToGroup(@Body() addMemberDto: AddMemberDto[], @Res() res: Response) {
    const updatedGroup = this.dialogService.addMemberToGroup(addMemberDto);
    res.send(updatedGroup);
    return;
  }
}