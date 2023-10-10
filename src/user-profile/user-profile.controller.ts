import { Body, Controller, Get, Injectable, Param, Post, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../user/guard/auth.guard";
import { UserProfileDto } from "./dto/user-profile.dto";
import { UserProfileService } from "./user-profile.service";
import { Response } from "express";


@Injectable()
@UseGuards(AuthGuard)
@Controller("profile")
export class UserProfileController {


  constructor(
    private readonly userProfileService: UserProfileService
  ) {
  }

  @Post("edit/:id")
  async editProfile(@Param("id") id: string, @Body() userProfileDto: UserProfileDto, @Res() res: Response) {
    const response = await this.userProfileService.editProfile(id, userProfileDto);
    res.send(response);
    return;
  }


  @Get("/id:")
  async getProfile() {
  }
}
