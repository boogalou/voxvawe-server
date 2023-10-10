import { Body, Controller, Get, Injectable, Patch, Query, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { ContactService } from "./contact.service";
import { AuthGuard } from "../user/guard/auth.guard";


@Injectable()
@UseGuards(AuthGuard)
@Controller()
export class ContactController {


  constructor(
    private readonly contactService: ContactService
  ) {
  }

  @Patch("add-contact")
  @UseGuards(AuthGuard)
  async addContact(@Body("accountId") accountId: string, @Req() req: Request, @Res() res: Response): Promise<void> {
    const token = req.headers.authorization;
    const contacts = await this.contactService.addContact(accountId, token);
    res.send(contacts);
    return;
  }

  @Patch("delete-contact")
  @UseGuards(AuthGuard)
  async deleteContact(@Body("accountId") accountId: string, @Req() req: Request, @Res() res: Response): Promise<void> {
    const token = req.headers.authorization;
    const contacts = await this.contactService.deleteContact(accountId, token);
    res.send(contacts);
    return;
  }

  @Get("contacts")
  @UseGuards(AuthGuard)
  async getContacts(@Req() req: Request, @Res() res: Response): Promise<void> {
    const token = req.headers.authorization;
    const result = await this.contactService.getContacts(token);
    res.send(result);
    return;
  }

  @Get("search")
  @UseGuards(AuthGuard)
  async search(@Query("searchTerm") searchTerm: string, @Res() res: Response): Promise<void> {
    const result = await this.contactService.search(searchTerm);
    res.json(result);
    return;
  }

}