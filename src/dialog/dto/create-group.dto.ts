export class CreateGroupDto {
   readonly accountIds: string[]
   readonly creator: number;
   readonly groupName: string;
   readonly files: string;
}